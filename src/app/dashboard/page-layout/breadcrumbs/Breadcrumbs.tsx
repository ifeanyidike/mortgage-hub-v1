import clsx from "clsx";
import { Fragment } from "react";

import { KeenIcon } from "@/app/dashboard-components";
import {
  TMenuBreadcrumbs,
  useMenuBreadcrumbs,
} from "@/app/dashboard-components/menu";
import { useMenus } from "@/providers";
import { usePathname } from "next/navigation";
import { getMenuConfig } from "@/config";

const Breadcrumbs = () => {
  const pathname = usePathname();
  // const { getMenuConfig } = useMenus();
  // const menuConfig = getMenuConfig("primary");
  const menuConfig = getMenuConfig(pathname);
  console.log("menuConfig: ", menuConfig, pathname);
  const items = useMenuBreadcrumbs(pathname, menuConfig);
  console.log("items: ", items);

  const renderItems = (items: TMenuBreadcrumbs) => {
    return items.map((item, index) => {
      const last = index === items.length - 1;

      return (
        <Fragment key={`root-${index}`}>
          <span
            className={clsx(item.active ? "text-gray-700" : "text-gray-700")}
            key={`item-${index}`}
          >
            {item.title}
          </span>
          {!last && (
            <KeenIcon
              icon="right"
              className="text-gray-500 text-3xs"
              key={`separator-${index}`}
            />
          )}
        </Fragment>
      );
    });
  };

  const render = () => {
    return (
      <div className="flex [.header_&]:below-lg:hidden items-center gap-1.25 text-xs lg:text-sm font-medium mb-2.5 lg:mb-0">
        {items && renderItems(items)}
      </div>
    );
  };

  return render();
};

export { Breadcrumbs };
