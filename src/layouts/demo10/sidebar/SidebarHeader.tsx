"use client";
import React, { forwardRef, useEffect, useState } from "react";
import { toAbsoluteUrl } from "@/app/utils";
import {
  Menu,
  MenuArrow,
  MenuIcon,
  MenuItem,
  MenuLabel,
  MenuLink,
  MenuSub,
  MenuTitle,
} from "@/app/dashboard-components/menu";
import { MENU_ROOT } from "@/config";
import { KeenIcon } from "@/app/dashboard-components";
import { ModalSearch } from "@/app/partials/modals/search/ModalSearch";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SidebarHeader = forwardRef<HTMLDivElement, any>((props, ref) => {
  const pathname = usePathname();
  const [selectedMenuItem, setSelectedMenuItem] = useState(MENU_ROOT[1]);

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const handleSearchModalOpen = () => setSearchModalOpen(true);
  const handleSearchModalClose = () => {
    setSearchModalOpen(false);
  };

  useEffect(() => {
    MENU_ROOT.forEach((item: any) => {
      if (item.rootPath && pathname.includes(item.rootPath)) {
        setSelectedMenuItem(item);
      }
    });
  }, [pathname]);

  return (
    <div ref={ref} className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5 px-3.5 h-[70px]">
        <Link href="/">
          <img
            src={toAbsoluteUrl("/media/app/mini-logo-circle-success.svg")}
            className="h-[34px]"
          />
        </Link>

        <Menu className="menu-default grow">
          <MenuItem
            className="grow"
            toggle="dropdown"
            trigger="hover"
            dropdownProps={{
              placement: "bottom-start",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 15], // [skid, distance]
                  },
                },
              ],
            }}
          >
            <MenuLabel className="cursor-pointer text-gray-900 font-medium grow justify-between">
              <span className="text-lg font-medium text-inverse grow">
                Metronic
              </span>
              <div className="flex flex-col text-gray-900 font-medium">
                <MenuArrow>
                  <KeenIcon icon="up" />
                </MenuArrow>
                <MenuArrow>
                  <KeenIcon icon="down" />
                </MenuArrow>
              </div>
            </MenuLabel>

            <MenuSub className="menu-default w-48 py-2" baseClassName="dark">
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

      <div className="flex items-center gap-2.5 px-3.5">
        <Link
          href="/public-profile/projects/3-columns"
          className="btn btn-dark btn-sm justify-center min-w-[198px]"
        >
          <KeenIcon icon="plus" />
          Add New
        </Link>

        <div className="flex items-center">
          <button
            onClick={handleSearchModalOpen}
            className="btn btn-icon btn-dark btn-icon-lg size-8 hover:text-primary"
          >
            <KeenIcon icon="magnifier" />
          </button>
          <ModalSearch
            open={searchModalOpen}
            onClose={handleSearchModalClose}
          />
        </div>
      </div>
    </div>
  );
});

export { SidebarHeader };
