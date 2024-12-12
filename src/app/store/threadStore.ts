import { Messages } from "@/types/db";
import { makeAutoObservable } from "mobx";

export type Profile = { id: string; name: string; picture: string };
class ThreadStore {
  constructor() {
    makeAutoObservable(this);
  }
  public isLoading = true;
  public threads = new Map<
    string,
    {
      messages: Messages[];
      isLoading: boolean;
    }
  >();
  public friend_id: string | null = null;
  public profileCache = new Map<string, Profile>();

  public setActiveThread(friendId: string) {
    this.friend_id = friendId;
  }

  public cacheThreadData(id: string, profile: Profile, active_state: boolean) {
    if (!threadStore.threads.has(id)) {
      threadStore.threads.set(id, {
        messages: [],
        isLoading: false,
      });
    }
    threadStore.profileCache.set(id, profile);
    if (active_state && !threadStore.friend_id) {
      this.setActiveThread(id);
    }
  }
}
export const threadStore = new ThreadStore();
