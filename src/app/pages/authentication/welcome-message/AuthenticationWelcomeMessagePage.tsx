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
import { ModalWelcomeMessage } from "@/app/partials/modals/welcome-message";
import { AccountGetStartedContent } from "@/app/pages/account/home/get-started";
import { useSession } from "next-auth/react";
import { CustomSessionUser } from "@/types/general";

const AuthenticationWelcomeMessagePage = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(true);
  const handleClose = () => {
    setProfileModalOpen(false);
  };

  const { data: session } = useSession();
  const user = session?.user as CustomSessionUser;

  return (
    <Fragment>
      <PageNavbar />

      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle />
            <ToolbarDescription>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-gray-800 font-medium">
                  {user?.name || "Ifeanyi Dike"}
                </span>
                <a
                  href="mailto:jaytatum@ktstudio.com"
                  className="text-gray-700 hover:text-primary"
                >
                  {user?.email}
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
        <ModalWelcomeMessage open={profileModalOpen} onClose={handleClose} />
      </Container>
    </Fragment>
  );
};

export { AuthenticationWelcomeMessagePage };
