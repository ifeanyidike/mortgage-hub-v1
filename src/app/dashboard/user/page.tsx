import React from "react";
import AccountPage from "./components/account";
import { auth } from "@/auth";
import Overview from "./components/Overview";
import { regularUserProfile } from "@/server/user_profile";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const profileData = await regularUserProfile.getOne(session?.user?.id!);
  return (
    <>
      <Overview profileData={profileData} />
    </>
  );
};

export default Page;
