import { ReactNode } from "react";
import { useMenus } from "@/providers";
import { useMenuCurrentItem } from "@/app/dashboard-components";

import { ToolbarBreadcrumbs } from ".";
import { usePathname } from "next/navigation";

export interface IToolbarHeadingProps {
  title?: string | ReactNode;
  description?: string | ReactNode;
}

const ToolbarHeading = ({ title = "" }: IToolbarHeadingProps) => {
  const { getMenuConfig } = useMenus();
  const pathname = usePathname();
  const currentMenuItem = useMenuCurrentItem(
    pathname,
    getMenuConfig("primary")
  );

  return (
    <div className="flex items-center flex-wrap gap-1 lg:gap-5">
      <h1 className="font-medium text-lg text-gray-900">
        {title || currentMenuItem?.title}
      </h1>
      <div className="flex items-center gap-1 text-sm font-normal">
        <ToolbarBreadcrumbs />
      </div>
    </div>
  );
};

export { ToolbarHeading };
