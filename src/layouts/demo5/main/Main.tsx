"use client";
import { Fragment } from "react";
import Link from "next/link";

import { useMenuCurrentItem } from "@/app/dashboard-components/menu";
import { useMenus } from "@/providers";

import { Header, Navbar, Footer } from "..";
import { Toolbar, ToolbarHeading, ToolbarActions } from "../toolbar";
import { Sidebar } from "../sidebar";
import { usePathname } from "next/navigation";

const Main = ({ children }: any) => {
  const pathname = usePathname();
  const { getMenuConfig } = useMenus();
  const menuConfig = getMenuConfig("primary");
  const menuItem = useMenuCurrentItem(pathname, menuConfig);

  return (
    <Fragment>
      {/* <Helmet>
        <title>{menuItem?.title}</title>
      </Helmet> */}
      <div className="flex grow flex-col [[data-sticky-header=on]_&]:pt-[--tw-header-height]">
        <Header />
        <Navbar />
        <div className="container-fixed w-full flex px-0 lg:ps-4">
          <Sidebar />

          <main className="flex flex-col grow">
            {!pathname.includes("/public-profile/") && (
              <Toolbar>
                <ToolbarHeading />
                <ToolbarActions>
                  <Link
                    href={"/public-profile/profiles/default"}
                    className="btn btn-light btn-sm"
                  >
                    View Profile
                  </Link>
                </ToolbarActions>
              </Toolbar>
            )}
            {children} {/* <Outlet /> */}
            <Footer />
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export { Main };
