import { ChangeEvent, Fragment } from "react";
// import { FormattedMessage } from "react-intl";
// import { useAuthContext } from "@/auth";

import { toAbsoluteUrl } from "@/app/utils";
import { DropdownUserLanguages } from "./DropdownUserLanguages";
import { useSettings } from "@/providers/SettingsProvider";
import { DefaultTooltip, KeenIcon } from "@/app/dashboard-components";
import {
  MenuItem,
  MenuLink,
  MenuSub,
  MenuTitle,
  MenuSeparator,
  MenuArrow,
  MenuIcon,
} from "@/app/dashboard-components/menu";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CustomSessionUser } from "@/types/general";
import { handleLogout } from "@/actions/auth";
import { redirect, RedirectType } from "next/navigation";

interface IDropdownUserProps {
  menuItemRef: any;
}

const DropdownUser = ({ menuItemRef }: IDropdownUserProps) => {
  const { settings, storeSettings } = useSettings();
  // const { logout } = useAuthContext();
  const { data: session } = useSession();
  const user = session?.user as CustomSessionUser;

  const handleThemeMode = (event: ChangeEvent<HTMLInputElement>) => {
    const newThemeMode = event.target.checked ? "dark" : "light";

    storeSettings({
      themeMode: newThemeMode,
    });
  };

  const buildHeader = () => {
    return (
      <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
        <div className="flex items-center gap-2">
          <img
            className="size-9 rounded-full border-2 border-success"
            src={user?.image || toAbsoluteUrl("/media/avatars/300-2.png")}
            alt=""
          />
          <div className="flex flex-col gap-1.5">
            <Link
              href="/account/hoteme/get-stard"
              className="text-sm text-gray-800 hover:text-primary font-semibold leading-none"
            >
              {user?.name || "Ifeanyi Dike"}
            </Link>
            <a
              href={`mailto:${user?.email}}`}
              className="text-xs text-gray-600 hover:text-primary font-medium leading-none"
            >
              {user?.email}
            </a>
          </div>
        </div>
      </div>
    );
  };

  const buildMenu = () => {
    return (
      <Fragment>
        <MenuSeparator />
        <div className="flex flex-col">
          <MenuItem>
            <MenuLink path={user?.role === "user" ? "/user" : "/broker"}>
              <MenuIcon className="menu-icon">
                <KeenIcon icon="badge" />
              </MenuIcon>
              <MenuTitle>Profile</MenuTitle>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink path="/account/home/user-profile">
              <MenuIcon>
                <KeenIcon icon="profile-circle" />
              </MenuIcon>
              {/* <MenuTitle>
                <FormattedMessage id="USER.MENU.MY_PROFILE" />
              </MenuTitle> */}
            </MenuLink>
          </MenuItem>
          <MenuItem
            toggle="dropdown"
            trigger="hover"
            dropdownProps={{
              placement: "right-start",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [-50, 0], // [skid, distance]
                  },
                },
              ],
            }}
          >
            <MenuLink>
              <MenuIcon>
                <KeenIcon icon="setting-2" />
              </MenuIcon>
              {/* <MenuTitle>
                <FormattedMessage id="USER.MENU.MY_ACCOUNT" />
              </MenuTitle> */}
              <MenuArrow>
                <KeenIcon
                  icon="right"
                  className="text-3xs rtl:transform rtl:rotate-180"
                />
              </MenuArrow>
            </MenuLink>
            <MenuSub className="menu-default light:border-gray-300 w-[200px]] md:w-[220px]">
              <MenuItem>
                <MenuLink path="/account/home/get-started">
                  <MenuIcon>
                    <KeenIcon icon="coffee" />
                  </MenuIcon>
                  {/* <MenuTitle>
                    <FormattedMessage id="USER.MENU.GET_STARTED" />
                  </MenuTitle> */}
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink path="/account/home/user-profile">
                  <MenuIcon>
                    <KeenIcon icon="some-files" />
                  </MenuIcon>
                  {/* <MenuTitle>
                    <FormattedMessage id="USER.MENU.MY_PROFILE" />
                  </MenuTitle> */}
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink path="/account/billing/basic">
                  <MenuIcon>
                    <KeenIcon icon="icon" />
                  </MenuIcon>
                  {/* <MenuTitle>
                    <FormattedMessage id="USER.MENU.BILLING" />
                  </MenuTitle> */}
                  <DefaultTooltip
                    title={"My Menu"}
                    placement="top"
                    className="max-w-48"
                  >
                    <KeenIcon
                      icon="information-2"
                      className="text-gray-500 text-md"
                    />
                  </DefaultTooltip>
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink path="/account/security/overview">
                  <MenuIcon>
                    <KeenIcon icon="medal-star" />
                  </MenuIcon>
                  <MenuTitle>My Menu</MenuTitle>
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink path="/account/members/teams">
                  <MenuIcon>
                    <KeenIcon icon="setting" />
                  </MenuIcon>
                  <MenuTitle>
                    {/* <FormattedMessage id="USER.MENU.MEMBERS_&_ROLES" /> */}
                    My Menu
                  </MenuTitle>
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink path="/account/integrations">
                  <MenuIcon>
                    <KeenIcon icon="switch" />
                  </MenuIcon>
                  <MenuTitle>
                    {/* <FormattedMessage id="USER.MENU.INTEGRATIONS" /> */}
                    My Menu
                  </MenuTitle>
                </MenuLink>
              </MenuItem>
              <MenuSeparator />
              <MenuItem>
                <MenuLink path="/account/security/overview">
                  <MenuIcon>
                    <KeenIcon icon="shield-tick" />
                  </MenuIcon>
                  <MenuTitle>
                    {/* <FormattedMessage id="USER.MENU.NOTIFICATIONS" /> */}
                    notifications
                  </MenuTitle>
                  <label className="switch switch-sm">
                    <input
                      name="check"
                      type="checkbox"
                      checked
                      onChange={() => {}}
                      value="1"
                    />
                  </label>
                </MenuLink>
              </MenuItem>
            </MenuSub>
          </MenuItem>
          <MenuItem>
            <MenuLink path="/">
              <MenuIcon>
                <KeenIcon icon="message-programming" />
              </MenuIcon>
              <MenuTitle>
                dev forum
                {/* <FormattedMessage id="USER.MENU.DEV_FORUM" /> */}
              </MenuTitle>
            </MenuLink>
          </MenuItem>
          {/* <DropdownUserLanguages menuItemRef={menuItemRef} /> */}
          <MenuSeparator />
        </div>
      </Fragment>
    );
  };

  const buildFooter = () => {
    return (
      <div className="flex flex-col">
        {/* <div className="menu-item mb-0.5">
          <div className="menu-link">
            <span className="menu-icon">
              <KeenIcon icon="moon" />
            </span>
            <span className="menu-title">dark mode</span>
            <label className="switch switch-sm">
              <input
                name="theme"
                type="checkbox"
                checked={settings.themeMode === "dark"}
                onChange={handleThemeMode}
                value="1"
              />
            </label>
          </div>
        </div> */}

        <div className="menu-item px-4 py-1.5">
          <a
            onClick={async () => {
              await handleLogout();
              window.location.reload();
            }}
            className="btn btn-sm btn-light justify-center"
          >
            {/* <FormattedMessage id="USER.MENU.LOGOUT" /> */}
            logout
          </a>
        </div>
      </div>
    );
  };

  return (
    <MenuSub
      className="menu-default light:border-gray-300 w-fit"
      rootClassName="p-0"
    >
      {buildHeader()}
      {buildMenu()}
      {buildFooter()}
    </MenuSub>
  );
};

export { DropdownUser };
