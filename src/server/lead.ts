import { TDataGridRequestParams } from "@/app/dashboard-components";
import { downPaymentSources, propertyTypes } from "@/app/utils";
import DB from "@/lib/db";
import { sql } from "kysely";

class Lead extends DB {
  constructor() {
    super();
  }
  public async fetchLeadsWithUserInfo() {
    try {
      // Fetch the first 100 leads with is_sold = false, along with user info
      const rawData = await this.db
        .selectFrom("leads")
        .innerJoin("users", "leads.user_id", "users.id")
        .select([
          "leads.id",
          "leads.user_id",
          "leads.property_price",
          "leads.down_payment",
          "leads.property_type",
          "leads.down_payment_source",
          "leads.property_address",
          "leads.is_sold",
          "leads.created_at",
          "users.id as user_id",
          "users.name as user_name",
          "users.picture as user_picture",
        ])
        .where("leads.is_sold", "=", false)
        .limit(500)
        .orderBy("leads.created_at", "asc")
        .execute();

      // Map rawData into the desired structure
      const leads = rawData.map((row) => ({
        id: row.id,
        property_price: row.property_price!,
        user_id: row.user_id,
        down_payment: row.down_payment!,
        property_type: row.property_type!,
        down_payment_source: row.down_payment_source!,
        property_address: row.property_address!,
        is_sold: row.is_sold!,
        created_at: row.created_at as unknown as Date,
        user: {
          id: row.user_id,
          name: row.user_name!,
          picture: row.user_picture!,
        },
      }));

      // Fetch the total number of leads with is_sold = false
      const totalCount = await this.db
        .selectFrom("leads")
        .select(sql<number>`COUNT(*)`.as("count"))
        .where("is_sold", "=", false)
        .executeTakeFirstOrThrow();

      return {
        leads,
        totalCount: totalCount.count,
      };
    } catch (error) {
      console.error("Error fetching leads with user info:", error);
      throw error;
    }
  }

  public async fetchUserList(username: string) {
    const data = await this.db
      .selectFrom("leads")
      .innerJoin("users", "leads.user_id", "users.id")
      .select([sql`DISTINCT users.name`.as("name"), "users.picture as picture"])
      //@ts-expect-error sql error
      .where(sql`LOWER(users.name) LIKE ${`%${username.toLowerCase()}%`}`)
      .limit(5)
      .execute();

    return data.map((entry: any) => ({
      label: entry.name, // The user's name
      value: entry.name, // The user's username
    }));
  }

  public async fetchLeads(params: TDataGridRequestParams) {
    const { pageIndex, pageSize, sorting, filters } = params;

    // Start building the base query
    let query = this.db
      .selectFrom("leads")
      .innerJoin("users", "leads.user_id", "users.id")
      .select([
        "leads.id",
        "leads.user_id",
        "leads.down_payment_source",
        "leads.down_payment",
        "leads.property_price",
        "leads.property_type",
        "leads.property_address",
        "leads.is_sold",
        "leads.created_at",
        "users.id as user_id",
        "users.name as user_name",
        "users.picture as user_picture",
      ])
      .where("leads.is_sold", "=", false);

    console.log("filters", filters);

    // Apply filters
    if (filters && filters.length > 0) {
      filters.forEach(({ id, value }) => {
        if (id === "user" && value) {
          if (Array.isArray(value)) {
            // If `value` is an array, use an `IN` condition
            query = query.where(
              //@ts-expect-error no error message
              sql`LOWER(users.name) IN (${sql.join(
                value.map((v) => sql`${v.toLowerCase()}`),
                sql`,`
              )})`
            );
          } else {
            // If `value` is a string, use a `LIKE` condition
            query = query.where(
              //@ts-expect-error no error message
              sql`LOWER(users.name) LIKE ${`%${value.toLowerCase()}%`}`
            );
          }
        } else if (id === "property_price" || id === "down_payment") {
          // Handle range filter for numeric values
          if (Array.isArray(value) && value.length === 2) {
            query = query.where(
              //@ts-expect-error no error message
              sql`${sql.ref(id)} BETWEEN ${sql.lit(value[0])} AND ${sql.lit(
                value[1]
              )}`
            );
          }
        } else if (value !== undefined && value !== null) {
          // Apply standard filters
          if (Array.isArray(value)) {
            query = query.where(
              sql`${sql.ref(id)}`,
              "in",
              sql`(${value.map((v) => sql.lit(v))})`
            );
          } else {
            query = query.where(sql`${sql.ref(id)}`, "ilike", `%${value}%`);
          }
        }
      });
    }

    console.log("query", query);

    // Apply sorting
    if (sorting && sorting.length > 0) {
      sorting.forEach(({ id, desc }) => {
        if (id === "user") {
          query = query.orderBy("users.name", desc ? "desc" : "asc");
        } else {
          query = query.orderBy(sql.ref(id), desc ? "desc" : "asc");
        }
      });
    } else {
      query = query.orderBy("leads.created_at", "desc");
    }

    // Apply pagination
    query = query.limit(pageSize).offset(pageIndex * pageSize);

    // Fetch the data
    const leads = await query.execute();

    // Total count query (reuse filter logic for consistency)
    const totalCountQuery = this.db
      .selectFrom("leads")
      .select(sql`COUNT(*)`.as("count"))
      .innerJoin("users", "leads.user_id", "users.id")
      .where("leads.is_sold", "=", false);

    if (filters && filters.length > 0) {
      filters.forEach(({ id, value }) => {
        if (id === "user" && value) {
          if (Array.isArray(value)) {
            totalCountQuery.where(
              //@ts-expect-error no error message
              sql`LOWER(users.name) IN (${sql.join(
                value.map((v) => `%${v.toLowerCase()}%`),
                sql`,`
              )})`
            );
          } else {
            totalCountQuery.where(
              //@ts-expect-error no error message
              sql`LOWER(users.name) LIKE ${`%${String(value).toLowerCase()}%`}`
            );
          }
        } else if (id === "property_price" || id === "down_payment") {
          // Handle range filter for numeric values in totalCountQuery
          if (Array.isArray(value) && value.length === 2) {
            totalCountQuery.where(
              //@ts-expect-error no error message
              sql`${sql.ref(id)} BETWEEN ${sql.lit(value[0])} AND ${sql.lit(
                value[1]
              )}`
            );
          }
        } else if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            totalCountQuery.where(
              sql`${sql.ref(id)}`,
              "in",
              sql`(${value.map((v) => sql.lit(v))})`
            );
          } else {
            totalCountQuery.where(sql`${sql.ref(id)}`, "ilike", `%${value}%`);
          }
        }
      });
    }

    const totalCountResult = await totalCountQuery.executeTakeFirst();
    const totalCount = totalCountResult?.count ?? 0;

    // Fetch max property_price and down_payment
    const maxValuesQuery = this.db
      .selectFrom("leads")
      .select([
        sql`MAX(property_price)`.as("max_property_price"),
        sql`MAX(down_payment)`.as("max_down_payment"),
      ])
      .where("leads.is_sold", "=", false);

    const maxValuesResult = await maxValuesQuery.executeTakeFirst();

    const maxPropertyPrice = maxValuesResult?.max_property_price ?? 0;
    const maxDownPayment = maxValuesResult?.max_down_payment ?? 0;

    return {
      data: leads.map((lead) => ({
        ...lead,
        property_price: Number(lead.property_price).toLocaleString("en-US", {
          style: "currency",
          currency: "CAD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        down_payment: Number(lead.down_payment).toLocaleString("en-US", {
          style: "currency",
          currency: "CAD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        down_payment_source: lead.down_payment_source
          ? downPaymentSources[
              lead.down_payment_source as keyof typeof downPaymentSources
            ]
          : lead.down_payment_source,

        property_type: lead.property_type
          ? propertyTypes[lead.property_type as keyof typeof propertyTypes]
          : lead.property_type,
        user: {
          id: lead.user_id,
          name: lead.user_name,
          picture: lead.user_picture,
        },
      })),
      totalCount,
      maxPropertyPrice,
      maxDownPayment,
    };
  }

  public async fetchSingleLeadWithFewUserInfo(leadId: string) {
    try {
      // Fetch the first 100 leads with is_sold = false, along with user info
      return await this.db
        .selectFrom("leads")
        .innerJoin("users", "leads.user_id", "users.id")
        .selectAll("leads")
        .select([
          "users.id as user_id",
          "users.name as user_name",
          "users.picture as user_picture",
        ])
        .where("leads.id", "=", leadId)
        .where("is_sold", "=", false)
        .executeTakeFirst();

      // Map rawData into the desired structure
    } catch (error) {
      console.error("Error fetching leads with user info:", error);
      throw error;
    }
  }
}

export const lead = new Lead();
