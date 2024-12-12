import { supabase } from "@/lib/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

class SupabaseSubscription {
  public listenToEvents<T extends "messages" | "leads">(
    table: T,
    event: "INSERT" | "UPDATE" | "DELETE",
    cb: (
      payload: RealtimePostgresChangesPayload<{
        [key: string]: any;
      }>
    ) => void
  ) {
    const subscription = supabase
      .channel(`public:${table}`)
      .on(
        //@ts-expect-error This should be fine. There's no error
        "postgres_changes",
        { event, schema: "public", table },
        (payload: RealtimePostgresChangesPayload<any>) => {
          console.log("New user added:", payload.new);
          cb(payload.new);
        }
      )
      .subscribe();
    return subscription;
  }
}

export default new SupabaseSubscription();
