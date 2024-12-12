"use client";
import { useViewport } from "@/hooks";
import { useEffect, useState } from "react";
import { SidebarMenuDashboard, SidebarMenuDefault } from ".";
import { usePathname } from "next/navigation";

const SidebarSecondary = () => {
  const pathname = usePathname();
  const [viewportHeight] = useViewport();
  const offset = 0;
  const [scrollableHeight, setScrollableHeight] = useState<number>(0);

  useEffect(() => {
    const availableHeight = viewportHeight - offset;
    setScrollableHeight(availableHeight);
  }, [viewportHeight]);

  return (
    <div className="flex items-stretch grow shrink-0 justify-center ps-1.5 my-5 me-1.5">
      <div
        className="scrollable-y-auto grow"
        style={{
          ...(scrollableHeight > 0 && { height: `${scrollableHeight}px` }),
        }}
      >
        {pathname === "/" ? <SidebarMenuDashboard /> : <SidebarMenuDefault />}
      </div>
    </div>
  );
};

export { SidebarSecondary };
