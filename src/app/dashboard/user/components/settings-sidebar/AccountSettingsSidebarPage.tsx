"use client";
import { Fragment, useEffect } from "react";
import { Container } from "@/app/dashboard-components/container";
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from "@/app/partials/toolbar";
import { PageNavbar } from "@/app/pages/account";

import { AccountSettingsSidebarContent } from ".";
import { Demo1Layout } from "@/app/dashboard/page-layout";
import { Skeleton } from "antd";
import { regularUserStore } from "@/app/store/regularUserStore";
import { observer } from "mobx-react-lite";
import { UserData } from "@/types/general";
import { runInAction } from "mobx";

type Props = {
  profileData: UserData | undefined;
};
const UserAccountSettingsSidebarPage = observer((props: Props) => {
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
            <AccountSettingsSidebarContent />
          </Container>
        </>
      )}
    </Demo1Layout>
  );
});

export { UserAccountSettingsSidebarPage };
