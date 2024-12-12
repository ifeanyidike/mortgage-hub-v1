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

import { AccountIntegrationsContent } from ".";
import { useLayout } from "@/providers";

const AccountIntegrationsPage = () => {
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
                Enhance Workflows with Advanced Integrations.
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <a href="#" className="btn btn-sm btn-light">
                Add New Integration
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <AccountIntegrationsContent />
      </Container>
    </Fragment>
  );
};

export { AccountIntegrationsPage };
