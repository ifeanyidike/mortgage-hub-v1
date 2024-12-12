import React, { Fragment, useEffect } from "react";

import { useMenuCurrentItem } from "@/app/dashboard-components/menu";
import { Footer, Header, Sidebar, useDemo1Layout } from "..";
import { useMenus } from "@/providers";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { observer } from "mobx-react-lite";
import { pageStore } from "@/app/store/pageStore";

const Main = observer(({ children }: { children: React.ReactNode }) => {
  // const { layout } = useDemo1Layout();
  const { layout } = pageStore;
  const pathname = usePathname();
  const { getMenuConfig } = useMenus();
  const menuConfig = getMenuConfig("primary");
  const menuItem = useMenuCurrentItem(pathname, menuConfig);

  useEffect(() => {
    const bodyClass = document.body.classList;

    // Add a class to the body element
    bodyClass.add("demo1");

    if (layout.sidebar.fixed) bodyClass.add("sidebar-fixed");
    if (layout.sidebar.collapse) bodyClass.add("sidebar-collapse");
    if (layout.header.fixed) bodyClass.add("header-fixed");

    // Remove the class when the component is unmounted
    return () => {
      bodyClass.remove("demo1");
      bodyClass.remove("sidebar-fixed");
      bodyClass.remove("sidebar-collapse");
      bodyClass.remove("header-fixed");
    };
  }, [layout]);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add("layout-initialized");
    }, 1000); // 1000 milliseconds

    // Remove the class when the component is unmounted
    return () => {
      document.body.classList.remove("layout-initialized");
      clearTimeout(timer);
    };
  }, []);

  return (
    <Fragment>
      <Head>
        <title>{menuItem?.title}</title>
      </Head>

      <Sidebar />

      <div className="wrapper flex grow flex-col min-h-screen">
        <Header />

        <main className="grow content pt-5" role="content">
          {/* <Outlet /> */}
          {children}
        </main>

        <Footer />
      </div>
    </Fragment>
  );
});

export { Main };
