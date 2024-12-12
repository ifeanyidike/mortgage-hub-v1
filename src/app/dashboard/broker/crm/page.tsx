import React from "react";
import CRM from "../../components/crm/CRM";
import broker from "@/server/broker";
import { auth } from "@/auth";
import Main from "../../components/crm/Main";

const Page = async () => {
  const session = await auth();
  const profileData = await broker.getBrokerByUserId(session?.user?.id!);
  return (
    <div>
      <Main profileData={profileData} role="broker" />
    </div>
  );
};

export default Page;
