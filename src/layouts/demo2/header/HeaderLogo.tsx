"use client";
import { KeenIcon } from "@/app/dashboard-components/keenicons";
import { toAbsoluteUrl } from "@/app/utils";
import {
  Menu,
  MenuArrow,
  MenuIcon,
  MenuItem,
  MenuLink,
  MenuSub,
  MenuTitle,
  MenuToggle,
} from "@/app/dashboard-components/menu";
import { MENU_ROOT } from "@/config";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const HeaderLogo = () => {
  const pathname = usePathname();
  const [selectedMenuItem, setSelectedMenuItem] = useState(MENU_ROOT[1]);

  useEffect(() => {
    MENU_ROOT.forEach((item: any) => {
      if (item.rootPath && pathname.includes(item.rootPath)) {
        setSelectedMenuItem(item);
      }
    });
  }, [pathname]);

  return (
    <div className="flex items-center gap-2 lg:gap-5 2xl:-ml-[60px]">
      <Link href="/" className="shrink-0">
        <img
          src={toAbsoluteUrl("/media/app/mini-logo-circle.svg")}
          className="dark:hidden min-h-[42px]"
          alt="logo"
        />
        <img
          src={toAbsoluteUrl("/media/app/mini-logo-circle-dark.svg")}
          className="hidden dark:inline-block min-h-[42px]"
          alt="logo"
        />
      </Link>

      <div className="flex items-center">
        <h3 className="text-gray-700 text-base hidden md:block">
          MetronicTeam
        </h3>
        <span className="text-sm text-gray-400 font-medium px-2.5 hidden md:inline">
          /
        </span>

        <Menu className="menu-default">
          <MenuItem
            toggle="dropdown"
            trigger="hover"
            dropdownProps={{
              placement: "bottom-start",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 10], // [skid, distance]
                  },
                },
              ],
            }}
          >
            <MenuToggle className="text-gray-900 font-medium">
              {selectedMenuItem.title}
              <MenuArrow>
                <KeenIcon icon="down" />
              </MenuArrow>
            </MenuToggle>
            <MenuSub className="menu-default w-48">
              {MENU_ROOT.map((item: any, index: number) => (
                <MenuItem
                  key={index}
                  className={item === selectedMenuItem ? "active" : ""}
                >
                  <MenuLink path={item.path}>
                    {item.icon && (
                      <MenuIcon>
                        <KeenIcon icon={item.icon} />
                      </MenuIcon>
                    )}
                    <MenuTitle>{item.title}</MenuTitle>
                  </MenuLink>
                </MenuItem>
              ))}
            </MenuSub>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export { HeaderLogo };
