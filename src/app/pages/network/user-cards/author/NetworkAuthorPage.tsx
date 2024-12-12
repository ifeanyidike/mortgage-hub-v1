import { Fragment } from "react";

import { Container } from "@/app/dashboard-components/container";
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from "@/app/partials/toolbar";

import { NetworkAuthorContent } from ".";
import { useLayout } from "@/providers";

const NetworkAuthorPage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
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
                Upload CSV
              </a>
              <a href="#" className="btn btn-sm btn-primary">
                Add User
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <NetworkAuthorContent />
      </Container>
    </Fragment>
  );
};

export { NetworkAuthorPage };
