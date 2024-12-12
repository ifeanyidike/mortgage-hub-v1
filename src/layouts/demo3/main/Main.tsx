"use client";
import { Fragment } from "react";
import { useMenuCurrentItem } from "@/app/dashboard-components/menu";
import { useMenus } from "@/providers";
import { KeenIcon } from "@/app/dashboard-components";
import Link from "next/link";
import {
  Header,
  Navbar,
  Sidebar,
  Footer,
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from "..";
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
      <div className="flex grow">
        <Header />

        <div className="flex flex-col lg:flex-row grow pt-[--tw-header-height]">
          <Sidebar />

          <Navbar />

          <div className="flex grow rounded-b-xl bg-[--tw-content-bg] dark:bg-[--tw-content-bg-dark] border-x border-b border-gray-400 dark:border-gray-200 lg:mt-[--tw-navbar-height] mx-5 lg:ms-[--tw-sidebar-width] mb-5">
            <div className="flex flex-col grow lg:scrollable-y lg:[scrollbar-width:auto] lg:light:[--tw-scrollbar-thumb-color:var(--tw-content-scrollbar-color)] pt-7 lg:[&_.container-fluid]:pe-4">
              <main className="grow" role="content">
                {pathname !== "/" && (
                  <Toolbar>
                    <ToolbarHeading />
                    <ToolbarActions>
                      <Link
                        href={"/account/home/get-started"}
                        className="btn btn-sm btn-light"
                      >
                        <KeenIcon icon="exit-down" className="!text-base" />
                        Export
                      </Link>
                    </ToolbarActions>
                  </Toolbar>
                )}
                {/* <Outlet /> */}
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { Main };