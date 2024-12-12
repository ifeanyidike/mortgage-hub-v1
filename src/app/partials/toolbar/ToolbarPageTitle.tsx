"use client";
import { useMenuCurrentItem } from "@/app/dashboard-components/menu";
import { useMenus } from "@/providers";

import { IToolbarPageTitleProps } from "./types";
import { usePathname } from "next/navigation";

const ToolbarPageTitle = ({ text }: IToolbarPageTitleProps) => {
  const pathname = usePathname();
  const { getMenuConfig } = useMenus();
  const menuConfig = getMenuConfig("primary");
  const menuItem = useMenuCurrentItem(pathname, menuConfig);

  return (
    <h1 className="text-xl font-medium leading-none text-gray-900">
      {text ?? menuItem?.title}
    </h1>
  );
};

export { ToolbarPageTitle };
