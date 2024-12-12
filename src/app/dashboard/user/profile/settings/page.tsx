import React from "react";
import { auth } from "@/auth";
import AccountPage from "@/app/dashboard/user/components/account";
import { regularUserProfile } from "@/server/user_profile";
import { UserAccountSettingsSidebarPage } from "../../components/settings-sidebar";

const Page = async () => {
  const session = await auth();
  const profileData = await regularUserProfile.getOne(session?.user?.id!);
  return (
    <>
      <UserAccountSettingsSidebarPage profileData={profileData} />
    </>
  );
};

export default Page;
