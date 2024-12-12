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

import { AccountHistoryContent } from ".";
// import { useLayout } from "@/providers";

const AccountHistoryPage = () => {
  // const { currentLayout } = useLayout();

  return (
    <Fragment>
      <PageNavbar />

      {/* {currentLayout?.name === "demo1-layout" && ( */}
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
              Billing
            </a>
          </ToolbarActions>
        </Toolbar>
      </Container>
      {/* )} */}

      <Container>
        <AccountHistoryContent />
      </Container>
    </Fragment>
  );
};

export { AccountHistoryPage };