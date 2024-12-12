import { Fragment } from "react";

import { Container } from "@/app/dashboard-components/container";
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from "@/app/partials/toolbar";
import { PageNavbar } from "@/app/pages/account";

import { AccountNotificationsContent } from ".";
import { useLayout } from "@/providers";

const AccountNotificationsPage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      <PageNavbar />

      {currentLayout?.name === "demo1-layout" && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                Central Hub for Personal Customization
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <a href="#" className="btn btn-sm btn-light">
                Privacy Settings
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <AccountNotificationsContent />
      </Container>
    </Fragment>
  );
};

export { AccountNotificationsPage };
