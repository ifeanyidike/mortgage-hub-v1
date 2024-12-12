"use client";
import { Fragment, useState } from "react";
import Link from "next/link";

import { Container } from "@/app/dashboard-components/container";
import {
  Toolbar,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from "@/app/partials/toolbar";
import { PageNavbar } from "@/app/pages/account";

import { ModalAccountDeactivated } from "@/app/partials/modals/account-deactivated";
import { AccountGetStartedContent } from "@/app/pages/account/home/get-started";

const AuthenticationAccountDeactivatedPage = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(true);
  const handleClose = () => {
    setProfileModalOpen(false);
  };

  return (
    <Fragment>
      <PageNavbar />

      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle />
            <ToolbarDescription>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-gray-800 font-medium">Jayson Tatum</span>
                <a
                  href="mailto:jaytatum@ktstudio.com"
                  className="text-gray-700 hover:text-primary"
                >
                  jaytatum@ktstudio.com
                </a>
                <span className="size-0.75 bg-gray-600 rounded-full"></span>
                <Link
                  href="/account/members/team-info"
                  className="font-semibold btn btn-link link"
                >
                  Personal Info
                </Link>
              </div>
            </ToolbarDescription>
          </ToolbarHeading>
        </Toolbar>
      </Container>

      <Container>
        <AccountGetStartedContent />
        <ModalAccountDeactivated
          open={profileModalOpen}
          onClose={handleClose}
        />
      </Container>
    </Fragment>
  );
};

export { AuthenticationAccountDeactivatedPage };
