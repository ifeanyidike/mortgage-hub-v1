"use client";
import { Container } from "@/app/dashboard-components/container";
import { useLayout, useMenus } from "@/providers";
import { NavbarMenu } from "@/app/partials/menu/NavbarMenu";
import { Navbar } from "@/app/partials/navbar";
import { MENU_MEGA, MENU_SIDEBAR } from "@/config";

const PageNavbar = () => {
  const { getMenuConfig } = useMenus();
  const menuConfig = getMenuConfig("primary");
  const accountMenuConfig = MENU_SIDEBAR?.["3"]?.children;
  if (accountMenuConfig) {
    return (
      <Navbar>
        <Container>
          <NavbarMenu items={accountMenuConfig} />
        </Container>
      </Navbar>
    );
  } else {
    return <></>;
  }
};

export { PageNavbar };
