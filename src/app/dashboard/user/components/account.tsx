"use client";

import { Container } from "@/app/dashboard-components/container";
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from "@/app/partials/toolbar";
import { PageNavbar } from "@/app/pages/account";

import { Demo1Layout } from "../../page-layout";
import { UserAccountSettingsEnterpriseContent } from "./UserAccountSettingsEnterpriseContent";
import { observer } from "mobx-react-lite";
import { UserData } from "@/types/general";
import { useEffect, useState } from "react";
import { runInAction } from "mobx";
import { regularUserStore } from "@/app/store/regularUserStore";
import { Skeleton } from "antd";

type Props = {
  profileData: UserData | undefined;
};
const AccountPage = observer((props: Props) => {
  useEffect(() => {
    if (props.profileData) {
      runInAction(() => (regularUserStore.user_profile = props.profileData));
    }
  }, []);
  return (
    <Demo1Layout>
      {/* <PageNavbar /> */}

      {!regularUserStore.user_profile ? (
        <Skeleton />
      ) : (
        <>
          <Container>
            {/* <Toolbar>
              <ToolbarHeading>
                <ToolbarPageTitle />
                <ToolbarDescription>
                  Tailored Tools for Business Scalability
                </ToolbarDescription>
              </ToolbarHeading>
              <ToolbarActions>
                <a href="#" className="btn btn-sm btn-light">
                  Public Profile
                </a>
                <a href="#" className="btn btn-sm btn-primary">
                  My profile
                </a>
              </ToolbarActions>
            </Toolbar> */}
          </Container>

          <Container>
            <UserAccountSettingsEnterpriseContent />
          </Container>
        </>
      )}
    </Demo1Layout>
  );
});

export default AccountPage;
