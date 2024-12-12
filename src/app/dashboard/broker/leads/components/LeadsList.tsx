"use client";
import { Fragment, useEffect, useRef } from "react";
import { Container } from "@/app/dashboard-components/container";
import { supabase } from "@/lib/supabase";
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from "@/app/partials/toolbar";

import { Demo1Layout } from "@/app/dashboard/page-layout";
import { Skeleton } from "antd";
import { regularUserStore } from "@/app/store/regularUserStore";
import { observer } from "mobx-react-lite";
import { UserData } from "@/types/general";
import { runInAction } from "mobx";
import LeadsTable from "./LeadsTable";
import { LeadDataMore, leadStore } from "@/app/store/leadStore";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { MiscHelp } from "@/app/partials/misc";

// type Props = {
//   //   profileData: UserData | undefined;
//   leads: LeadDataMore[];
//   totalCount: number;
// };
const LeadsList = observer(() => {
  const initRef = useRef<boolean>(false);
  // useEffect(() => {
  //   if (props.leads) {
  //     runInAction(() => (leadStore.leads = props.leads));
  //   }

  //   if (props.totalCount) {
  //     runInAction(() => (leadStore.lead_count = props.totalCount));
  //   }
  // }, []);

  //   useEffect(() => {
  //     const subscription = leadStore.initializeSubscription();
  //     console.log("subscription", subscription);
  //     return () => {
  //       supabase.removeChannel(subscription);
  //       //   if (leadStore.subscription) {
  //       //     // chatStore.subscription.unsubscribe();
  //       //     supabase.removeChannel(leadStore.subscription);
  //       //     leadStore.subscription = null;
  //       //   }
  //     };
  //   }, []);
  return (
    <Demo1Layout>
      {/* <PageNavbar /> */}
      {/* {!leadStore.leads ? (
        <Skeleton />
      ) : ( */}
      <>
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                Intuitive Access to In-Depth Customization
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <a href="#" className="btn btn-sm btn-light">
                Public Profile
              </a>
              <a href="#" className="btn btn-sm btn-primary">
                Get Started
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>

        <Container>
          <div className="mt-10">
            <LeadsTable />
          </div>
          <div className="mt-12">
            <MiscHelp />
          </div>
        </Container>
      </>
      {/* )} */}
    </Demo1Layout>
  );
});

export default LeadsList;
