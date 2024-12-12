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

import { AccountDeviceManagementContent } from ".";
import { useLayout } from "@/providers";

const AccountDeviceManagementPage = () => {
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
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-sm text-gray-600">
                    Authorized Devices for Report Access
                  </span>
                  <span className="size-0.75 bg-gray-600 rounded-full"></span>
                  <a href="#" className="font-semibold btn btn-link link">
                    Unlink All Devices
                  </a>
                </div>
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <a href="#" className="btn btn-sm btn-light">
                Security Overview
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <AccountDeviceManagementContent />
      </Container>
    </Fragment>
  );
};

export { AccountDeviceManagementPage };
