import { Fragment } from "react";
import { useMenuBreadcrumbs } from "@/app/dashboard-components";
import Link from "next/link";
import { useMenus } from "@/providers";
import { usePathname } from "next/navigation";

const ToolbarBreadcrumbs = () => {
  const { getMenuConfig } = useMenus();
  const pathname = usePathname();
  const items = useMenuBreadcrumbs(pathname, getMenuConfig("primary"));

  return (
    <div className="flex items-center gap-1 text-2sm">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.path ? (
            <Link href={item.path} className="text-gray-700 hover:text-primary">
              {item.title}
            </Link>
          ) : (
            <span
              className={
                index === items.length - 1 ? "text-gray-900" : "text-gray-700"
              }
            >
              {item.title}
            </span>
          )}
          {index !== items.length - 1 && (
            <span className="text-gray-400 text-sm">/</span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export { ToolbarBreadcrumbs };
