import DB from "@/lib/db";

class Purchases extends DB {
  constructor() {
    super();
  }
  private rows = [
    "leads.id as lead_id",
    "leads.down_payment",
    "leads.property_price",
    "leads.down_payment_source",
    "leads.property_type",
    "leads.is_sold",
    "leads.created_at as leads_created_at",
    "leads.updated_at as leads_updated_at",
    "purchases.id as purchase_id",
    "purchases.amount_paid",
    "purchases.currency",
    "purchases.payment_method",
    "purchases.purchased_at",
    "purchases.lead_type",
    // "documents.name as document_name",
    // "documents.size as document_size",
    // "documents.description as document_description",
    // "documents.id as document_id",
    // "documents.type as document_type",
    // "documents.url as document_url",
    // "documents.created_at as document_uploaded_at",
    "users.email",
    "users.name",
    "users.phone",
    "users.picture",
    "users.dob",
    "users.created_at as user_created_at",
    "users.updated_at as user_updated_at",
  ];

  public async fetchPurchasesByUserId(user_id: string) {
    return await this.db
      .selectFrom("purchases")
      .innerJoin("leads", "leads.id", "purchases.lead_id")
      .innerJoin("users", "users.id", "leads.user_id")
      .innerJoin("user_profile", "user_profile.user_id", "users.id")
      .selectAll("user_profile")
      .select(this.rows as any)
      .where(
        "purchases.broker_id",
        "=",
        this.db
          .selectFrom("brokers")
          .select("brokers.id")
          .where("brokers.user_id", "=", user_id)
      )
      .execute();
  }

  // public async fetchPurchasesByUserId(user_id: string) {
  //   return await this.db
  //     .selectFrom("purchases")
  //     .innerJoin("leads", "leads.id", "purchases.lead_id")
  //     .innerJoin("users", "users.id", "leads.user_id")
  //     .innerJoin("user_profile", "user_profile.user_id", "users.id")
  //     .leftJoin(
  //       (eb) => eb
  //         .selectFrom("documents")
  //         .select([
  //           "documents.user_id",
  //           eb.fn.agg<string[]>('array_agg', ['documents']).as('user_documents')
  //         ])
  //         .groupBy("documents.user_id")
  //         .as("user_documents")
  //     , "user_documents.user_id", "users.id")
  //     .selectAll("user_profile")
  //     .select((eb) => [
  //       this.rows as any,
  //       eb.ref("user_documents.user_documents").as("documents")
  //     ])
  //     .where(
  //       "purchases.broker_id",
  //       "=",
  //       this.db
  //         .selectFrom("brokers")
  //         .select("brokers.id")
  //         .where("brokers.user_id", "=", user_id)
  //     )
  //     .execute();
  // }

  public async fetchDocuments(user_id: string) {
    return await this.db
      .selectFrom("documents")
      .selectAll()
      .where("user_id", "=", user_id)
      .orderBy("documents.created_at", "desc")
      .execute();
  }

  public async fetchPurchaseDataById(id: string) {
    const data = (await this.db
      .selectFrom("purchases")
      .innerJoin("leads", "leads.id", "purchases.lead_id")
      .innerJoin("users", "users.id", "leads.user_id")
      .innerJoin("user_profile", "user_profile.user_id", "users.id")
      .selectAll("user_profile")
      .select(this.rows as any)
      .where("purchases.id", "=", id)
      .executeTakeFirst()) as any;

    if (data) {
      data.documents = await this.fetchDocuments(data.user_id);
    }
    return data;
  }
  // public async fetchPurchaseDataById(id: string) {
  //   return await this.db
  //     .selectFrom("purchases")
  //     .innerJoin("leads", "leads.id", "purchases.lead_id")
  //     .innerJoin("users", "users.id", "leads.user_id")
  //     .innerJoin("user_profile", "user_profile.user_id", "users.id")
  //     .leftJoin("documents", "documents.user_id", "users.id")
  //     .selectAll("user_profile")
  //     .select(this.rows as any)
  //     .select((eb) => [
  //       eb
  //         .fn(
  //           "json_agg",
  //           eb.fn("json_build_object", [
  //             "documents.size",
  //             // "id as document_id",
  //             // eb.ref("documents.id"),
  //             // "name as document_name",
  //             // eb.fn("COALESCE", eb.ref("documents.name"), ""), // Default to empty string
  //             // "size",
  //             // eb.fn("COALESCE", eb.ref("documents.size"), 0), // Default to 0
  //             // "description",
  //             // eb.fn("COALESCE", eb.ref("documents.description"), ""), // Default to empty string
  //             // "type",
  //             // eb.fn("COALESCE", eb.ref("documents.type"), ""), // Default to empty string
  //             // "url",
  //             // eb.fn("COALESCE", eb.ref("documents.url"), ""), // Default to empty string
  //             // "created_at as document_uploaded_at",
  //             // eb.fn("COALESCE", eb.ref("documents.created_at"), "1970-01-01"), // Default to a fallback date
  //           ])
  //         )
  //         .as("documents"),
  //     ])
  //     .where("purchases.id", "=", id)
  //     .groupBy([
  //       "user_profile.id",
  //       "leads.id",
  //       "purchases.id",
  //       "users.email",
  //       "users.name",
  //       "users.phone",
  //       "users.picture",
  //       "users.dob",
  //       "users.created_at",
  //       "users.updated_at",
  //     ])
  //     .executeTakeFirst();
  // }

  // public async fetchPurchaseDataById(id: string) {
  //   return await this.db
  //     .selectFrom("purchases")
  //     .innerJoin("leads", "leads.id", "purchases.lead_id")
  //     .innerJoin("users", "users.id", "leads.user_id")
  //     .innerJoin("user_profile", "user_profile.user_id", "users.id")
  //     .leftJoin("documents", "documents.user_id", "users.id")
  //     .selectAll("user_profile")
  //     .select(this.rows as any)
  //     .select((eb) => [
  //       eb.fn.agg<unknown[]>("array_agg", ["documents"]).as("documents"),
  //     ])
  //     .where("purchases.id", "=", id)
  //     .groupBy([
  //       "user_profile.id",
  //       "leads.id",
  //       "purchases.id",
  //       "users.email",
  //       "users.name",
  //       "users.phone",
  //       "users.picture",
  //       "users.dob",
  //       "users.created_at",
  //       "users.updated_at",
  //     ])
  //     .executeTakeFirst();
  // }
}

export const purchases = new Purchases();
