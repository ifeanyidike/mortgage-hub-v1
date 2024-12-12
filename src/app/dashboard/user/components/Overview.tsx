"use client";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/app/dashboard-components/container";
import {
  Toolbar,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from "@/app/partials/toolbar";
import { PageNavbar } from "@/app/pages/account";
import { useSession } from "next-auth/react";
import { CustomSessionUser, UserData } from "@/types/general";
import { Demo1Layout } from "../../page-layout";
import { observer } from "mobx-react-lite";
import { regularUserStore } from "@/app/store/regularUserStore";
import { autorun, runInAction } from "mobx";
import { UserProfile } from "@/types/db";
import { AccountGetStartedContent } from "./AccountGetStartedContent";
import { ModalWelcomeMessage } from "./ModalWelcomMessage";

type Props = {
  profileData: UserData | undefined;
};
const Overview = observer((props: Props) => {
  const [profileModalOpen, setProfileModalOpen] = useState(true);
  const handleClose = () => {
    setProfileModalOpen(false);
  };

  useEffect(() => {
    if (props.profileData) {
      runInAction(() => (regularUserStore.user_profile = props.profileData));
    }
  }, []);

  const profile = props.profileData;

  const tools_selection = props.profileData?.tools_selection;
  return (
    <Demo1Layout>
      <PageNavbar />

      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle />
            <ToolbarDescription>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-gray-800 font-medium">
                  {profile?.name || "Ifeanyi Dike"}
                </span>
                <a
                  href={`mailto:${profile?.email}`}
                  className="text-gray-700 hover:text-primary"
                >
                  {profile?.email}
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
        {!tools_selection?.tools?.length && !tools_selection?.do_later && (
          <ModalWelcomeMessage open={profileModalOpen} onClose={handleClose} />
        )}
      </Container>
    </Demo1Layout>
  );
});

export default Overview;
