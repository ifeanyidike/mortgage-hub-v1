"use client";
import { Container } from "@/app/dashboard-components";
import { Demo1Layout } from "@/app/dashboard/page-layout";
import React from "react";
import FullPageContent from "./FullPageContent";
import { PurchaseData } from "@/types/general";

type Props = {
  purchase_data: PurchaseData;
};
const SingleLeadInfo = (props: Props) => {
  return (
    <Demo1Layout>
      <Container>
        <FullPageContent data={props.purchase_data} />
      </Container>
    </Demo1Layout>
  );
};

export default SingleLeadInfo;
