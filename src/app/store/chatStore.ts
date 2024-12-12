import supabaseSubscriptions from "@/server/supabase-subscriptions";
import { Messages } from "@/types/db";
import { CustomSessionUser } from "@/types/general";
import { makeAutoObservable, runInAction } from "mobx";
import { getSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";
import {
  RealtimeChannel,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";
import { threadStore } from "./threadStore";
import { debounce } from "lodash";

class ChatStore {
  private dbTable = "messages" as const;
  subscription: RealtimeChannel | null = null;
  readMessageIds = new Set();
  // public initPromise: Promise<void>;
  // public friend_id: string | null = null;

  constructor() {
    makeAutoObservable(this);
    // this.initPromise = this.subscribe();
  }

  private async getUser() {
    const session = await getSession();
    const user = session?.user;
    return user as CustomSessionUser;
  }

  // private async fetchFriendsProfile(friend_id: string) {
  //   if (threadStore.profileCache.has(friend_id)) {
  //     return threadStore.profileCache.get(friend_id);
  //   }

  //   const { data, error } = await supabase
  //     .from("users")
  //     .select("id, name, picture")
  //     .eq("id", friend_id)
  //     .single();

  //   if (error) {
  //     console.error("Error fetching friend profile", friend_id);
  //     return null;
  //   }

  //   const profile = { id: data.id, name: data.name, picture: data.picture };
  //   threadStore.profileCache.set(friend_id, profile);
  //   return profile;
  // }

  // private async enrichedMessage(user: CustomSessionUser, message: Messages) {
  //   // const friendsProfile = message.
  //   const friend_id = this.getFriendId(
  //     user?.id!,
  //     message.sender_id,
  //     message.receiver_id
  //   );
  //   const friend_profile = await this.fetchFriendsProfile(friend_id);
  //   const user_profile = {
  //     id: user?.id!,
  //     picture: user.picture,
  //     name: user.name!,
  //   };

  //   return {
  //     ...message,
  //     sender: message.sender_id === friend_id ? friend_profile! : user_profile!,
  //     receiver:
  //       message.receiver_id === friend_id ? friend_profile! : user_profile!,
  //   };
  // }

  private async addMessageWithProfiles(
    user: CustomSessionUser,
    message: Messages
  ) {
    if (message.sender_id !== user.id && message.receiver_id !== user.id) {
      return;
    }
    // const enrichedMessage = await this.enrichedMessage(user, message);
    const friend_id = this.getFriendId(
      user?.id!,
      message.sender_id,
      message.receiver_id
    );
    if (!threadStore.threads.has(friend_id)) {
      threadStore.threads.set(friend_id, { messages: [], isLoading: false });
    }
    if (!threadStore.friend_id) threadStore.friend_id = friend_id;

    threadStore.threads.get(friend_id)?.messages.push(message);
  }

  public async fetchMessages(user_id: string, cb?: () => void) {
    const friend_id = threadStore.friend_id!;
    if (!threadStore.threads.has(friend_id)) {
      threadStore.threads.set(friend_id, { messages: [], isLoading: true });
    }

    const { data: messages } = await supabase
      .from("messages")
      .select(
        `
        id,
        content,
        sent_at,
        sender_id,
        receiver_id,
        is_read,
        sender:sender_id(
          id,
          name,
          picture
        ),
        receiver:receiver_id(
          id,
          name,
          picture
        )
        `
      )
      .or(
        `and(sender_id.eq.${user_id},receiver_id.eq.${friend_id}),and(sender_id.eq.${friend_id},receiver_id.eq.${user_id})`
      )
      .order("sent_at", { ascending: true });
    const message = messages?.find(
      (message) =>
        message.sender_id === friend_id || message.receiver_id === friend_id
    );

    const profile =
      message?.sender_id === friend_id ? message.sender : message?.receiver;

    if (profile?.length && !threadStore.profileCache.has(profile[0].id)) {
      threadStore.profileCache.set(friend_id, profile[0]);
    }

    runInAction(() => {
      threadStore.threads.set(friend_id, {
        messages: messages
          ? messages.map((message) => ({
              ...message,
              sender: message.sender[0],
              receiver: message.receiver[0],
            }))
          : [],
        isLoading: false,
      });
      cb && cb();
    });
  }

  public async sendMessage(user_id: string, content: string) {
    const { data, error } = await supabase.from("messages").insert({
      sender_id: user_id,
      receiver_id: threadStore.friend_id,
      content,
    });
    console.log("data", data, error);
  }

  public async markAsRead() {
    const friend_id = threadStore.friend_id!;
    const user = await this.getUser();
    const user_id = user?.id;
    const { error } = await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("receiver_id", user_id)
      .eq("sender_id", friend_id)
      .eq("is_read", false);

    if (!error) {
      runInAction(() => {
        // const chat = this.threads[friend_id];
        if (threadStore.threads.has(friend_id)) {
          threadStore.threads.get(friend_id)?.messages.map((msg) => {
            if (msg.receiver_id === user_id) {
              return { ...msg, is_read: true };
            }
            return msg;
          });
          // chat.messages = chat.messages.map((msg) => {
          //   if (msg.receiver_id === user_id) {
          //     return { ...msg, is_read: true };
          //   }
          //   return msg;
          // });
        }
      });
    }
  }

  markMessageAsRead(messageId: string) {
    this.readMessageIds.add(messageId);
    this.debouncedSyncReadMessages();
  }

  debouncedSyncReadMessages = debounce(async () => {
    if (this.readMessageIds.size > 0) {
      const messageIds = Array.from(this.readMessageIds);
      const { error } = await supabase
        .from("messages")
        .update({ is_read: true })
        .in("id", messageIds)
        .eq("is_read", false);
      threadStore.threads
        .get(threadStore.friend_id!)
        ?.messages.map((m) => ({ ...m, is_read: true }));
      if (!error) {
        this.readMessageIds.clear(); // Clear after successful sync
      } else {
        console.error("Failed to sync read messages:", error.message);
      }
    }
  }, 5000);

  private getFriendId(user_id: string, sender_id: string, receiver_id: string) {
    if (user_id === sender_id) return receiver_id;
    return sender_id;
  }

  public initializeSubscription(user: CustomSessionUser) {
    console.log("subscribing");

    return supabase
      .channel(`public:${this.dbTable}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: this.dbTable },
        (payload: RealtimePostgresChangesPayload<any>) => {
          console.log("payload", payload);
          runInAction(() => {
            this.addMessageWithProfiles(
              user,
              payload.new as unknown as Messages
            );
          });
        }
      )
      .subscribe((status) => console.log("Chat subscription status", status));
  }
}

export const chatStore = new ChatStore();
