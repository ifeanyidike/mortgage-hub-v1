"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";

import { KeenIcon } from "@/app/dashboard-components";

import { PurchaseData } from "@/types/general";
import { Card } from "./Card";
import { CardRow } from "./CardRow";

type Props = {
  data: PurchaseData[];
  toggleModalView: Dispatch<SetStateAction<PurchaseData | null>>;
};
const PurchaseListItems = (props: Props) => {
  const { toggleModalView } = props;

  const [activeView, setActiveView] = useState("cards");
  const getItem = (i: PurchaseData) => {
    return {
      id: i.purchase_id!,
      name: i.name!,
      job_title: i.job_title!,
      picture: i.picture!,
      property_type: i.property_type!,
      lead_type: i.lead_type!,
      email: i.email!,
      phone: i.phone!,
      location: i.location!,
      property_price: i.property_price!,
    };
  };

  const renderItem = (d: PurchaseData, index: number) => {
    const item = getItem(d);
    return <Card {...item} openModal={() => toggleModalView(d)} key={index} />;
  };

  const renderData = (data: PurchaseData, index: number) => {
    const item = getItem(data);
    return (
      <CardRow {...item} openModal={() => toggleModalView(data)} key={index} />
    );
  };

  return (
    <div className="flex flex-col props.data-stretch gap-5 lg:gap-7.5">
      <div className="flex flex-wrap props.data-center gap-5 justify-between">
        <h3 className="text-lg text-gray-800 font-semibold">
          {props.data.length} Leads
        </h3>

        <div className="btn-tabs" data-tabs="true">
          <a
            href="#"
            className={`btn btn-icon btn-sm ${
              activeView === "cards" ? "active" : ""
            }`}
            data-tab-toggle="#teams_cards"
            onClick={() => {
              setActiveView("cards");
            }}
          >
            <KeenIcon icon="category" />
          </a>
          <a
            href="#"
            className={`btn btn-icon btn-sm ${
              activeView === "list" ? "active" : ""
            }`}
            data-tab-toggle="#teams_list"
            onClick={() => {
              setActiveView("list");
            }}
          >
            <KeenIcon icon="row-horizontal" />
          </a>
        </div>
      </div>

      {activeView === "cards" && (
        <div id="teams_cards">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
            {props.data.map((item, index) => {
              return renderItem(item, index);
            })}
          </div>

          <div className="flex grow justify-center pt-5 lg:pt-7.5">
            <Link href="/dashboard/broker/leads" className="btn btn-link">
              Buy more leads
            </Link>
          </div>
        </div>
      )}

      {activeView === "list" && (
        <div id="teams_list">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            {props.data.map((item, index) => {
              return renderData(item, index);
            })}
          </div>

          <div className="flex grow justify-center pt-5 lg:pt-7.5">
            <Link href="/dashboard/broker/leads" className="btn btn-link">
              Buy more leads
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseListItems;
