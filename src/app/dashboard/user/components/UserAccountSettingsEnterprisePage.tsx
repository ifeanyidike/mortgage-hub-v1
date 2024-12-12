"use client";
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

import { useLayout } from "@/providers";
import { UserAccountSettingsEnterpriseContent } from "./UserAccountSettingsEnterpriseContent";

const UserAccountSettingsEnterprisePage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      <PageNavbar />

      <Container>
        <Toolbar>
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
        </Toolbar>
      </Container>

      <Container>
        <UserAccountSettingsEnterpriseContent />
      </Container>
    </Fragment>
  );
};

export { UserAccountSettingsEnterprisePage };
