import { Fragment } from "react";

import { Container } from "@/app/dashboard-components/container";
import { KeenIcon } from "@/app/dashboard-components";
import { toAbsoluteUrl } from "@/app/utils/Assets";

import { UserProfileHero } from "@/app/partials/heros";
import { Navbar, NavbarActions, NavbarDropdown } from "@/app/partials/navbar";
import { PageMenu } from "@/app/pages/public-profile";

import { CampaignsContent } from ".";

const CampaignsCardPage = () => {
  const image = (
    <img
      src={toAbsoluteUrl("/media/avatars/300-1.png")}
      className="rounded-full border-3 border-success size-[100px] shrink-0"
    />
  );

  return (
    <Fragment>
      <UserProfileHero
        name="Jenny Klabber"
        image={image}
        info={[
          { label: "KeenThemes", icon: "abstract" },
          { label: "SF, Bay Area", icon: "geolocation" },
          { email: "jenny@kteam.com", icon: "sms" },
        ]}
      />

      <Container>
        <Navbar>
          <PageMenu />

          <NavbarActions>
            <button type="button" className="btn btn-sm btn-primary">
              <KeenIcon icon="users" /> Connect
            </button>
            <button className="btn btn-sm btn-icon btn-light">
              <KeenIcon icon="messages" />
            </button>
            <NavbarDropdown />
          </NavbarActions>
        </Navbar>
      </Container>

      <Container>
        <CampaignsContent mode="card" />
      </Container>
    </Fragment>
  );
};

export { CampaignsCardPage };
