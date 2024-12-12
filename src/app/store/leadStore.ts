import { supabase } from "@/lib/supabase";
import { Leads } from "@/types/db";
import { Profile, threadStore } from "./threadStore";
import { makeAutoObservable, runInAction } from "mobx";
import {
  RealtimeChannel,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";
import supabaseSubscriptions from "@/server/supabase-subscriptions";
import { TDataGridRequestParams } from "../dashboard-components";
import { fetchAvailableLeads, fetchLeadUserList } from "@/actions/lead";

const PURCHASES_QUERY = `
  id,
  lead_id,
  broker_id,
  leads:lead_id (
    id,
    user:user_id (
      id,
      name,
      picture
    )
  ),
  brokers:broker_id (
    id,
    user:user_id (
      id,
      name,
      picture
    )
  )
`;

const LEAD_LIST_QUERY = `
  id,
  user_id,
  user:user_id (
    id,
    name,
    picture
  ),
  down_payment_source,
  down_payment,
  property_price,
  property_type,
  property_address,
  is_sold,
  created_at
`;

export type LeadDataType = {
  property_price: number;
  down_payment: number;
  down_payment_source: string;
  property_address: string;
  property_type: string;
};

export type LeadDataMore = {
  id: string;
  user_id: string;
  user: {
    id: string;
    name: string;
    picture: string;
  };
  property_price: number;
  down_payment: number;
  down_payment_source: string;
  property_address: string;
  property_type: string;
  is_sold: boolean;
  created_at: Date;
};

class LeadStore {
  constructor() {
    makeAutoObservable(this);
  }

  subscription: RealtimeChannel | null = null;
  public leads: LeadDataMore[] | null = null;
  public lead_count = 0;
  public new_data: LeadDataMore | null = null;
  public max_values: Record<"down_payment" | "property_price", number | null> =
    {
      down_payment: null,
      property_price: null,
    };

  public async createLead(user_id: string, input: LeadDataType) {
    const { data, error } = await supabase.from("leads").insert({
      user_id,
      ...input,
    });
    if (error) throw new Error(error.message);
    return { status: "success" };
  }

  public async getTotalAvailableLeadCount() {
    const { count, error } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("is_sold", false);

    if (error) {
      console.error("Error fetching count:", error.message);
      this.lead_count = 0;
    }

    this.lead_count = count || 0;
  }

  public async fetchAvailableLeads(page: number, limit: number) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from("leads")
      .select(LEAD_LIST_QUERY)
      .eq("is_sold", false)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw new Error(error.message);
    this.leads = data! as unknown as LeadDataMore[];
    return data;
  }

  public async fetchUserList(username: string): Promise<
    {
      label: string;
      value: string;
    }[]
  > {
    console.log("Fetching user:", username);
    return await fetchLeadUserList(username);

    // Query the leads table for users
    // const { data, error } = await supabase
    //   .from("leads")
    //   .select(
    //     `
    //     user_id,
    //     user:user_id (
    //       id,
    //       name,
    //       picture
    //     )
    //   `
    //   )
    //   .like("user.name", `%${username}%`)
    //   .limit(5);

    // if (error) {
    //   console.error("Error fetching users:", error.message);
    //   return [];
    // }
    // console.log("data", data);
    // // Transform the data into the expected format
    // return data.map((entry: any) => ({
    //   label: entry.user.name, // The user's name
    //   value: entry.user.name, // The user's username
    // }));
  }

  public async fetchLeads(params: TDataGridRequestParams) {
    const values = await fetchAvailableLeads(JSON.stringify(params));
    this.max_values.down_payment = Number(values.maxDownPayment) as number;
    this.max_values.property_price = Number(values.maxPropertyPrice) as number;
    leadStore.leads = values.data as unknown as LeadDataMore[];
    leadStore.lead_count = (values.totalCount as number) || 0;
    return values;
    // const { pageIndex, pageSize, sorting, filters } = params;
    // console.log("params", params);
    // console.log("fetching");
    // // Build base query
    // let query = supabase
    //   .from("leads") // Replace 'leads' with your actual table name
    //   .select(LEAD_LIST_QUERY, { count: "exact" }) // Fetch data and total count
    //   .eq("is_sold", false)
    //   .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1); // Apply pagination

    // // Apply sorting
    // if (sorting && sorting.length > 0) {
    //   sorting.forEach(({ id, desc }) => {
    //     if (id === "user") {
    //       // query = query.order("user.name", {
    //       //   ascending: !desc,
    //       //   foreignTable: "user",
    //       // });
    //     } else {
    //       query = query.order(id, { ascending: !desc });
    //     }
    //   });
    // } else {
    //   query = query.order("created_at", { ascending: false });
    // }

    // // Apply filters
    // if (filters && filters.length > 0) {
    //   filters.forEach(({ id, value }) => {
    //     if (value !== undefined && value !== null) {
    //       query = query.ilike(id, `%${value}%`); // Adjust filter logic as needed
    //     }
    //   });
    // }

    // // Execute query
    // const { data, count, error } = await query;
    // console.log("fetched");
    // console.log("data", data);
    // if (error) {
    //   console.error("Error fetching leads:", error);
    //   throw new Error("Failed to fetch leads");
    // }

    // leadStore.leads = data as unknown as LeadDataMore[];
    // leadStore.lead_count++;

    // return {
    //   data: data || [],
    //   totalCount: count || 0,
    // };
  }

  private async genericFetchLeadByUserId(user_id: string, query = "id") {
    const { data, error } = await supabase
      .from("leads")
      .select(query)
      .eq("user_id", user_id);

    if (error) {
      console.error("Error fetching leads for user:", error);
      return null;
    }
    return data;
  }

  private async genericFetchBrokerByUserId(user_id: string, query = "id") {
    const { data, error } = await supabase
      .from("brokers")
      .select(query)
      .eq("user_id", user_id);

    if (error) {
      console.error("Error fetching leads for user:", error);
      return null;
    }
    return data;
  }

  public async fetchPurchasedLeads(user_id: string, is_broker = false) {
    console.log("user_id", user_id, is_broker);
    if (is_broker) {
      const { data, error } = await supabase
        .from("purchases")
        .select(PURCHASES_QUERY)
        .in(
          "broker_id",
          (
            await this.genericFetchBrokerByUserId(user_id)
          )?.map((broker: any) => broker.id) || []
        );
      // .eq("broker_id", user_id);
      console.log("broker data from fetchPurchasedLeads", data);
      if (error) {
        console.error("Error fetching purchases for broker:", error);
        return null;
      }

      (data || []).forEach((d, index) => {
        const lead_user = (d.leads as any).user as any;
        threadStore.cacheThreadData(lead_user.id, lead_user, index === 0);
        // d.leads.forEach((lead) => {
        // });
      });

      return data;
    } else {
      const { data, error } = await supabase
        .from("purchases")
        .select(PURCHASES_QUERY)
        .in(
          "lead_id",
          (
            await this.genericFetchLeadByUserId(user_id)
          )?.map((lead: any) => lead.id) || []
        );

      if (error) {
        console.error("Error fetching purchases for user:", error);
        return null;
      }

      data.forEach((d, index) => {
        const broker = (d.brokers as any).user;
        threadStore.cacheThreadData(broker.id, broker, index === 0);
      });
      threadStore.isLoading = false;
      return data;
    }
  }

  public initializeSubscription() {
    console.log("subscribing");

    return supabase
      .channel(`public:leads`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        (payload: RealtimePostgresChangesPayload<any>) => {
          console.log("payload", payload);
          runInAction(async () => {
            if (!payload.new.is_sold) {
              let userProfile = threadStore.profileCache.get(
                payload.new.user_id
              );

              if (!userProfile) {
                const { data: user, error } = await supabase
                  .from("users")
                  .select("id, name, picture")
                  .eq("id", payload.new.user_id)
                  .single();

                if (user) {
                  userProfile = {
                    id: user.id,
                    name: user.name,
                    picture: user.picture,
                  };
                  threadStore.profileCache.set(
                    payload.new.user_id,
                    userProfile
                  );
                }
              }

              const new_lead = { ...payload.new, user: userProfile };

              leadStore.leads = [new_lead, ...(leadStore.leads || [])];
              leadStore.lead_count++;
              this.new_data = new_lead;
            }
          });
        }
      )
      .subscribe((status) => console.log("Lead subscription status", status));
  }
}

export const leadStore = new LeadStore();
