import React, { forwardRef, Fragment } from "react";
import Link from "next/link";
import { useDemo1Layout } from "..";
import { toAbsoluteUrl } from "@/app/utils";
import { SidebarToggle } from ".";
import Image from "next/image";
import AppLogo from "@/app/assets/logo3.png";
import { observer } from "mobx-react-lite";

const SidebarHeader = observer(
  forwardRef<HTMLDivElement, any>((props, ref) => {
    const { layout } = useDemo1Layout();

    const lightLogo = () => (
      <Fragment>
        <Link href="/" className="dark:hidden">
          <img
            src={toAbsoluteUrl("/media/app/default-logo.svg")}
            className="default-logo min-h-[22px] max-w-none"
          />
          <img
            src={toAbsoluteUrl("/media/app/mini-logo.svg")}
            className="small-logo min-h-[22px] max-w-none"
          />
        </Link>
        <Link href="/" className="hidden dark:block">
          <img
            src={toAbsoluteUrl("/media/app/default-logo-dark.svg")}
            className="default-logo min-h-[22px] max-w-none"
          />
          <img
            src={toAbsoluteUrl("/media/app/mini-logo.svg")}
            className="small-logo min-h-[22px] max-w-none"
          />
        </Link>
      </Fragment>
    );

    const darkLogo = () => (
      <Link href="/">
        <img
          src={toAbsoluteUrl("/media/app/default-logo-dark.svg")}
          className="default-logo min-h-[22px] max-w-none"
        />
        <img
          src={toAbsoluteUrl("/media/app/mini-logo.svg")}
          className="small-logo min-h-[22px] max-w-none"
        />
      </Link>
    );

    const appLogo = () => (
      <Link href="/">
        <Image src={AppLogo} alt="" className="default-logo max-w-20 " />
        <Image src={AppLogo} alt="" className="small-logo max-w-12" />
      </Link>
    );

    return (
      <div
        ref={ref}
        className="sidebar-header hidden lg:flex items-center relative justify-between px-1 lg:px-6 shrink-0 "
      >
        {/* {layout.options.sidebar.theme === "dark" ? lightLogo() : darkLogo()} */}
        {appLogo()}
        <SidebarToggle />
      </div>
    );
  })
);

export { SidebarHeader };
