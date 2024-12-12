import React from "react";
import CRM from "../../components/crm/CRM";
import { auth } from "@/auth";
import { regularUserProfile } from "@/server/user_profile";
import Main from "../../components/crm/Main";

const Page = async () => {
  const session = await auth();
  const profileData = await regularUserProfile.getOne(session?.user?.id!);
  return (
    <div>
      <Main profileData={profileData} role="user" />
    </div>
  );
};

export default Page;
