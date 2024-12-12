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

import { AccountCurrentSessionsContent } from ".";
import { useLayout } from "@/providers";

const AccountCurrentSessionsPage = () => {
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
                Authorized Devices for Report Access
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <Link
                to="/account/security/security-log"
                className="btn btn-sm btn-light"
              >
                Activity Log
              </Link>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <AccountCurrentSessionsContent />
      </Container>
    </Fragment>
  );
};

export { AccountCurrentSessionsPage };
