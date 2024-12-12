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

import { AccountCompanyProfileContent } from ".";
// import { useLayout } from "@/providers";

const AccountCompanyProfilePage = () => {
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
              Public Profile
            </a>
            <a href="#" className="btn btn-sm btn-primary">
              Billing
            </a>
          </ToolbarActions>
        </Toolbar>
      </Container>
      {/* )} */}

      <Container>
        <AccountCompanyProfileContent />
      </Container>
    </Fragment>
  );
};

export { AccountCompanyProfilePage };
