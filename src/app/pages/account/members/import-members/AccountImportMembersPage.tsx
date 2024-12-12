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

import { AccountImportMembersContent } from ".";
import { useLayout } from "@/providers";

const AccountImportMembersPage = () => {
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
                Overview of all team members and roles.
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <Link href="#" className="btn btn-sm btn-light">
                Go to Teams
              </Link>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <AccountImportMembersContent />
      </Container>
    </Fragment>
  );
};

export { AccountImportMembersPage };
