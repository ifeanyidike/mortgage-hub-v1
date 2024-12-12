"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { Drawer } from "@/app/dashboard-components";
import { useEffect, useRef, useState } from "react";
import { useResponsive, useViewport } from "@/hooks";
import { useDemo10Layout } from "..";
import { SidebarHeader, SidebarMenu, SidebarFooter } from ".";
import { getHeight } from "@/app/utils";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const desktopMode = useResponsive("up", "lg");
  // const { pathname, prevPathname } = usePathname();
  const pathname = usePathname();
  const [viewportHeight] = useViewport();
  const { mobileSidebarOpen, setMobileSidebarOpen } = useDemo10Layout();
  const [scrollableHeight, setScrollableHeight] = useState<number>(0);
  const scrollableOffset = 50;

  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  const renderContent = () => {
    return (
      <div className="flex-col fixed top-0 bottom-0 z-20 lg:flex items-stretch shrink-0 w-[--tw-sidebar-width] dark">
        <SidebarHeader ref={headerRef} />
        <SidebarMenu height={scrollableHeight} />
        <SidebarFooter ref={footerRef} />
      </div>
    );
  };

  useEffect(() => {
    if (headerRef.current && footerRef.current) {
      const headerHeight = getHeight(headerRef.current);
      const footerHeight = getHeight(footerRef.current);
      const availableHeight =
        viewportHeight - headerHeight - footerHeight - scrollableOffset;
      setScrollableHeight(availableHeight);
    } else {
      setScrollableHeight(viewportHeight);
    }
  }, [viewportHeight]);

  // useEffect(() => {
  //   if (!desktopMode && prevPathname !== pathname) {
  //     handleMobileSidebarClose();
  //   }
  // }, [desktopMode, pathname, prevPathname]);

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
        classes={{ paper: "dark" }}
      >
        {renderContent()}
      </Drawer>
    );
  }
};

export { Sidebar };
