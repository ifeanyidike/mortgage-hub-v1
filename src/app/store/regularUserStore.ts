import { getOne } from "@/actions/regular_user";
import { UserProfile } from "@/types/db";
import { UserData } from "@/types/general";
import { makeAutoObservable } from "mobx";

class RegularUserStore {
  constructor() {
    makeAutoObservable(this);
  }

  public user_profile?: UserData;
  public async loadUserProfile(user_id: string) {
    const userProfile = await getOne(user_id);

    this.user_profile = userProfile;
  }
}

export const regularUserStore = new RegularUserStore();
