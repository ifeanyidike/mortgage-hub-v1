import { Fragment } from "react";
import { Container } from "@/app/dashboard-components/container";
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from "@/layouts/demo1/toolbar";
import { PageNavbar } from "@/app/pages/account";
import { AccountPlansContent } from ".";
import Link from "next/link";
// import { useLayout } from "@/providers";

const AccountPlansPage = () => {
  // const { currentLayout } = useLayout();

  return (
    <Fragment>
      <PageNavbar />

      {/* {currentLayout?.name === "demo1-layout" && ( */}
      <Container>
        <Toolbar>
          <ToolbarHeading
            title="Plans"
            description="Central Hub for Personal Customization"
          />
          <ToolbarActions>
            <Link href="#" className="btn btn-sm btn-light">
              View Billing
            </Link>
          </ToolbarActions>
        </Toolbar>
      </Container>
      {/* )} */}

      <Container>
        <AccountPlansContent />
      </Container>
    </Fragment>
  );
};
// @/app/dashboard-components
export { AccountPlansPage };
