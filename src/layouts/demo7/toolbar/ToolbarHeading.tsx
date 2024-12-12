import { ReactNode } from "react";
import { useMenus } from "@/providers";
import { useMenuCurrentItem } from "@/app/dashboard-components";
import { ToolbarBreadcrumbs } from "./ToolbarBreadcrumbs";
import { usePathname } from "next/navigation";

export interface IToolbarHeadingProps {
  title?: string | ReactNode;
}

const ToolbarHeading = ({ title = "" }: IToolbarHeadingProps) => {
  const { getMenuConfig } = useMenus();
  const pathname = usePathname();
  const currentMenuItem = useMenuCurrentItem(
    pathname,
    getMenuConfig("primary")
  );

  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-medium text-lg text-gray-900">
        {title || currentMenuItem?.title}
      </h1>
      <ToolbarBreadcrumbs />
    </div>
  );
};

export { ToolbarHeading };
