import { auth } from "@/auth";
import { regularUserProfile } from "@/server/user_profile";
import React from "react";
import { LeadsPage } from "./components/Leads";

const Page = async () => {
  const session = await auth();
  const profileData = await regularUserProfile.getOne(session?.user?.id!);
  return (
    <>
      <LeadsPage profileData={profileData} />
    </>
  );
};

export default Page;
