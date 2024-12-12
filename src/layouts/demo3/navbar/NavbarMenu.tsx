"use client";
import { KeenIcon } from "@/app/dashboard-components/keenicons";
import {
  Menu,
  MenuArrow,
  TMenuConfig,
  MenuItem,
  MenuLink,
  MenuSub,
  MenuTitle,
} from "@/app/dashboard-components/menu";
import { useMenus } from "@/providers";
import { usePathname } from "next/navigation";

const NavbarMenu = () => {
  const pathname = usePathname();
  const { getMenuConfig } = useMenus();
  const primaryMenu = getMenuConfig("primary");

  let navbarMenu;

  if (pathname.includes("/public-profile/")) {
    navbarMenu = primaryMenu?.[2];
  } else if (pathname.includes("/network/")) {
    navbarMenu = primaryMenu?.[4];
  } else if (pathname.includes("/authentication/")) {
    navbarMenu = primaryMenu?.[5];
  } else {
    navbarMenu = primaryMenu?.[3];
  }

  const buildMenu = (items: TMenuConfig) => {
    return items.map((item, index) => {
      if (item.children) {
        return (
          <MenuItem
            key={index}
            className="border-b-2 border-b-transparent menu-item-active:border-b-gray-900 menu-item-here:border-b-gray-900"
            trigger="hover"
            toggle="dropdown"
            dropdownProps={{
              placement: "bottom-start",
            }}
          >
            <MenuLink className="gap-1.5">
              <MenuTitle className="text-nowrap text-sm text-gray-800 menu-item-active:text-gray-900 menu-item-active:font-semibold menu-item-here:text-gray-900 menu-item-here:font-semibold menu-item-show:text-gray-900 menu-link-hover:text-gray-900">
                {item.title}
              </MenuTitle>
              <MenuArrow>
                <KeenIcon icon="down" className="text-2xs text-gray-500" />
              </MenuArrow>
            </MenuLink>
            <MenuSub
              className="menu-default py-2"
              rootClassName="min-w-[200px]"
            >
              {buildMenuChildren(item.children)}
            </MenuSub>
          </MenuItem>
        );
      } else if (!item.disabled) {
        return (
          <MenuItem
            key={index}
            className="border-b-2 border-b-transparent menu-item-active:border-b-gray-900 menu-item-here:border-b-gray-900"
          >
            <MenuLink path={item.path} className="gap-2.5">
              <MenuTitle className="text-nowrap text-sm text-gray-800 menu-item-active:text-gray-900 menu-item-active:font-semibold menu-item-here:text-gray-900 menu-item-here:font-semibold menu-item-show:text-gray-900 menu-link-hover:text-gray-900">
                {item.title}
              </MenuTitle>
            </MenuLink>
          </MenuItem>
        );
      }
    });
  };

  const buildMenuChildren = (items: TMenuConfig) => {
    return items.map((item, index) => {
      if (item.children) {
        return (
          <MenuItem
            key={index}
            trigger="hover"
            toggle="dropdown"
            dropdownProps={{
              placement: "right-start",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [-10, 0], // [skid, distance]
                  },
                },
              ],
            }}
          >
            <MenuLink>
              <MenuTitle>{item.title}</MenuTitle>
              <MenuArrow>
                <KeenIcon
                  icon="down"
                  className="text-2xs [.menu-dropdown_&]:-rotate-90"
                />
              </MenuArrow>
            </MenuLink>
            <MenuSub className="menu-default py" rootClassName="min-w-[200px]">
              {buildMenuChildren(item.children)}
            </MenuSub>
          </MenuItem>
        );
      } else if (!item.disabled) {
        return (
          <MenuItem key={index}>
            <MenuLink path={item.path}>
              <MenuTitle>{item.title}</MenuTitle>
            </MenuLink>
          </MenuItem>
        );
      }
    });
  };

  return (
    <div className="grid items-stretch">
      <div className="scrollable-x-auto flex items-stretch">
        <Menu highlight={true} className="gap-5 lg:gap-7.5">
          {navbarMenu && navbarMenu.children && buildMenu(navbarMenu.children)}
        </Menu>
      </div>
    </div>
  );
};

export { NavbarMenu };