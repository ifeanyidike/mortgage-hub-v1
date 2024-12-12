"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { Drawer } from "@/app/dashboard-components";
import { useEffect, useRef, useState } from "react";
import { useResponsive, useViewport } from "@/hooks";
import { useDemo1Layout } from "..";
import { SidebarContent, SidebarHeader } from ".";
import clsx from "clsx";
import { getHeight } from "@/app/utils";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const selfRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrollableHeight, setScrollableHeight] = useState<number>(0);
  const scrollableOffset = 40;
  const [viewportHeight] = useViewport();
  const pathname = usePathname();

  useEffect(() => {
    if (headerRef.current) {
      const headerHeight = getHeight(headerRef.current);
      const availableHeight = viewportHeight - headerHeight - scrollableOffset;
      setScrollableHeight(availableHeight);
    } else {
      setScrollableHeight(viewportHeight);
    }
  }, [viewportHeight]);

  const desktopMode = useResponsive("up", "lg");
  const { mobileSidebarOpen, setSidebarMouseLeave, setMobileSidebarOpen } =
    useDemo1Layout();
  const { layout } = useDemo1Layout();
  const themeClass: string =
    layout.options.sidebar.theme === "dark" || pathname === "/dark-sidebar"
      ? "dark [&.dark]:bg-coal-600"
      : "dark:bg-coal-600";

  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  const handleMouseEnter = () => {
    setSidebarMouseLeave(false);
  };

  const handleMouseLeave = () => {
    setSidebarMouseLeave(true);
  };

  const renderContent = () => {
    return (
      <div
        ref={selfRef}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className={clsx(
          "sidebar bg-[#f0f0f0] border-e border-e-gray-300 dark:border-e-coal-300 fixed top-0 bottom-0 z-20 lg:flex flex-col items-stretch shrink-0",
          themeClass
        )}
      >
        {desktopMode && <SidebarHeader ref={headerRef} />}
        <SidebarContent {...(desktopMode && { height: scrollableHeight })} />
      </div>
    );
  };

  useEffect(() => {
    // Hide drawer on route chnage after menu link click
    if (!desktopMode) {
      handleMobileSidebarClose();
    }
  }, [desktopMode, pathname]);
  if (desktopMode) {
    return renderContent();
  } else {
    return (
      <Drawer
        open={mobileSidebarOpen}
        onClose={handleMobileSidebarClose}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {renderContent()}
      </Drawer>
    );
  }
};

export { Sidebar };
