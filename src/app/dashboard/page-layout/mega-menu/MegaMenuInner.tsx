"use client";
import { Fragment, useEffect, useState } from "react";
import { useResponsive } from "@/hooks";
import { KeenIcon } from "@/app/dashboard-components";
import {
  TMenuConfig,
  MenuItem,
  MenuLink,
  MenuTitle,
  MenuArrow,
  Menu,
} from "@/app/dashboard-components/menu";
import {
  MegaMenuSubProfiles,
  MegaMenuSubAccount,
  MegaMenuSubNetwork,
  MegaMenuSubAuth,
  MegaMenuSubHelp,
} from "@/app/partials/menu/mega-menu";
import { useDemo1Layout } from "../LayoutProvider";
import { MENU_MEGA } from "@/config";
import { observer } from "mobx-react-lite";
import { pageStore } from "@/app/store/pageStore";
import { runInAction } from "mobx";

const MegaMenuInner = observer(() => {
  const desktopMode = useResponsive("up", "lg");
  const [disabled, setDisabled] = useState(true); // Initially set disabled to true
  const { sidebarMouseLeave } = pageStore;
  const { layout } = pageStore;

  // Change disabled state to false after a certain time (e.g., 5 seconds)
  useEffect(() => {
    setDisabled(true);

    const timer = setTimeout(() => {
      setDisabled(false);
    }, 1000); // 1000 milliseconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [layout.sidebar.collapse, pageStore.sidebarMouseLeave]);

  // useEffect(() => {
  //   runInAction(() => setMegaMenuEnabled(true));
  // }, []);

  const build = (items: TMenuConfig) => {
    const homeItem = items[0];
    const publicProfilesItem = items[1];
    const myAccountItem = items[2];
    const networkItem = items[3];
    const authItem = items[4];
    const helpItem = items[5];

    const linkClass =
      "menu-link text-sm text-gray-700 font-semibold menu-link-hover:text-primary menu-item-active:text-gray-900 menu-item-show:text-primary menu-item-here:text-gray-900";
    const titleClass = "text-nowrap";

    return (
      <Fragment>
        <MenuItem key="home">
          <MenuLink path={homeItem.path} className={linkClass}>
            <MenuTitle className={titleClass}>{homeItem.title}</MenuTitle>
          </MenuLink>
        </MenuItem>

        <MenuItem
          key="public-profiles"
          toggle={desktopMode ? "dropdown" : "accordion"}
          trigger={desktopMode ? "hover" : "click"}
          dropdownProps={{
            placement: "bottom-start",
          }}
        >
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>
              {publicProfilesItem.title}
            </MenuTitle>
            {buildArrow()}
          </MenuLink>
          {MegaMenuSubProfiles(items)}
        </MenuItem>

        <MenuItem
          key="my-account"
          toggle={desktopMode ? "dropdown" : "accordion"}
          trigger={desktopMode ? "hover" : "click"}
          dropdownProps={{
            placement: "bottom-start",
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [-300, 0], // [skid, distance]
                },
              },
            ],
          }}
        >
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>{myAccountItem.title}</MenuTitle>
            {buildArrow()}
          </MenuLink>
          {MegaMenuSubAccount(items)}
        </MenuItem>

        <MenuItem
          key="network"
          toggle={desktopMode ? "dropdown" : "accordion"}
          trigger={desktopMode ? "hover" : "click"}
          dropdownProps={{
            placement: "bottom-start",
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [-300, 0], // [skid, distance]
                },
              },
            ],
          }}
        >
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>{networkItem.title}</MenuTitle>
            {buildArrow()}
          </MenuLink>
          {MegaMenuSubNetwork(items)}
        </MenuItem>

        <MenuItem
          key="auth"
          toggle={desktopMode ? "dropdown" : "accordion"}
          trigger={desktopMode ? "hover" : "click"}
          dropdownProps={{
            placement: "bottom-start",
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [-300, 0], // [skid, distance]
                },
              },
            ],
          }}
        >
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>{authItem.title}</MenuTitle>
            {buildArrow()}
          </MenuLink>
          {MegaMenuSubAuth(items)}
        </MenuItem>

        <MenuItem
          key="help"
          toggle={desktopMode ? "dropdown" : "accordion"}
          trigger={desktopMode ? "hover" : "click"}
          dropdownProps={{
            placement: "bottom-start",
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [-20, 0], // [skid, distance]
                },
              },
            ],
          }}
        >
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>{helpItem.title}</MenuTitle>
            {buildArrow()}
          </MenuLink>
          {MegaMenuSubHelp(items)}
        </MenuItem>
      </Fragment>
    );
  };

  const buildArrow = () => {
    return (
      <MenuArrow className="flex lg:hidden text-gray-400">
        <KeenIcon icon="plus" className="text-2xs menu-item-show:hidden" />
        <KeenIcon
          icon="minus"
          className="text-2xs hidden menu-item-show:inline-flex"
        />
      </MenuArrow>
    );
  };

  return (
    <Menu
      multipleExpand={true}
      disabled={disabled}
      highlight={true}
      className="flex-col lg:flex-row gap-5 lg:gap-7.5 p-5 lg:p-0"
    >
      {build(MENU_MEGA)}
    </Menu>
  );
});

export { MegaMenuInner };