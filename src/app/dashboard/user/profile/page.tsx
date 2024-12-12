import React from "react";
import { auth } from "@/auth";
import AccountPage from "@/app/dashboard/user/components/account";
import { regularUserProfile } from "@/server/user_profile";

const Page = async () => {
  const session = await auth();
  const profileData = await regularUserProfile.getOne(session?.user?.id!);
  return (
    <>
      <AccountPage profileData={profileData} />
    </>
  );
};

export default Page;
