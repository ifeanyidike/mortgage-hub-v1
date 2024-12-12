import { Fragment } from "react";
import Link from "next/link";

import { Container } from "@/app/dashboard-components/container";
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from "@/app/partials/toolbar";
import { PageNavbar } from "@/app/pages/account";

import { AccountOverviewContent } from ".";
import { useLayout } from "@/providers";

const AccountOverviewPage = () => {
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
              <Link
                to="/account/security/overview"
                className="btn btn-sm btn-light"
              >
                Security History
              </Link>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <AccountOverviewContent />
      </Container>
    </Fragment>
  );
};

export { AccountOverviewPage };
