"use client";
import { Container } from "@/app/dashboard-components";
import Empty from "@/app/dashboard/components/Empty";
import { Demo1Layout } from "@/app/dashboard/page-layout";
import { UserProfileHero } from "@/app/partials/heros";
import { BrokerData, PurchaseData, UserData } from "@/types/general";
import Link from "next/link";
import React, { useState } from "react";
import PurchaseListItems from "./PurchaseListItems";
import { ModalView } from "./ModalView";
import { MiscHelp } from "@/app/partials/misc";

type Props = {
  data: PurchaseData[];
  profileData: (BrokerData | UserData) | undefined;
};
const PurchaseList = (props: Props) => {
  const { data, profileData } = props;
  const [modalView, toggleModalView] = useState<PurchaseData | null>(null);

  const image = (
    <img
      src={profileData?.picture!}
      className="rounded-full border-3 border-success size-[100px] shrink-0"
    />
  );
  function renderEmpty() {
    return (
      <Empty
        homeLink="/dashboard/broker/overview"
        subheading="Purchase a lead to get started"
        content={
          <div className="flex items-center gap-1 justify-center">
            <p>You have not purchased a lead. Visit to the </p>
            <Link
              href="/dashboard/broker/leads"
              className="text-sm font-medium link"
            >
              lead purchase dashboard
            </Link>
            <p>to buy a lead</p>
          </div>
        }
      />
    );
  }
  return (
    <Demo1Layout>
      <Container>
        <UserProfileHero
          name={profileData?.name!}
          image={image}
          info={[
            { label: "KeenThemes", icon: "abstract" },
            {
              label: profileData?.location?.address! || "Address not set",
              icon: "geolocation",
            },
            { email: profileData?.email!, icon: "sms" },
          ]}
        />
        {!data.length ? (
          renderEmpty()
        ) : (
          <PurchaseListItems
            data={props.data}
            toggleModalView={toggleModalView}
          />
        )}

        <div className="mt-10">
          <MiscHelp />
        </div>
      </Container>

      <ModalView data={modalView} onClose={() => toggleModalView(null)} />
    </Demo1Layout>
  );
};

export default PurchaseList;
