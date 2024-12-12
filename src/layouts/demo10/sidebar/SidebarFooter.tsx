import React, { forwardRef, useRef } from "react";
import { toAbsoluteUrl } from "@/app/utils";
import {
  KeenIcon,
  Menu,
  MenuIcon,
  MenuItem,
  MenuToggle,
} from "@/app/dashboard-components";
import { DropdownUser } from "@/app/partials/dropdowns/user";
import { DropdownNotifications } from "@/app/partials/dropdowns/notifications";

const SidebarFooter = forwardRef<HTMLDivElement, any>((props, ref) => {
  // const { logout } = useAuthContext();
  const itemUserRef = useRef<any>(null);
  const itemNotificationsRef = useRef<any>(null);

  return (
    <div
      ref={ref}
      className="flex flex-center justify-between shrink-0 ps-4 pe-3.5 mb-3.5"
    >
      <Menu data-menu="true">
        <MenuItem
          ref={itemUserRef}
          toggle="dropdown"
          trigger="click"
          dropdownProps={{
            placement: "right-end",
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
          <MenuToggle className="btn btn-icon rounded-full">
            <img
              className="size-8 rounded-full justify-center border border-gray-500 shrink-0"
              src={toAbsoluteUrl("/media/avatars/gray/5.png")}
              alt=""
            />
          </MenuToggle>
          {DropdownUser({ menuItemRef: itemUserRef })}
        </MenuItem>
      </Menu>

      <div className="flex items-center gap-1.5">
        <Menu>
          <MenuItem
            toggle="dropdown"
            trigger="click"
            dropdownProps={{
              placement: "right-end",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [10, 15],
                  },
                },
              ],
            }}
          >
            <MenuToggle className="btn btn-icon btn-icon-lg relative size-8 hover:bg-light hover:text-primary dropdown-open:bg-gray-200 text-gray-600">
              <MenuIcon>
                <KeenIcon icon="notification-status" />
              </MenuIcon>
            </MenuToggle>
            {DropdownNotifications({ menuTtemRef: itemNotificationsRef })}
          </MenuItem>
        </Menu>

        <div
          onClick={() => {}}
          className="btn btn-icon btn-icon-lg size-8 hover:bg-light hover:text-primary text-gray-600"
        >
          <KeenIcon icon="exit-right" />
        </div>
      </div>
    </div>
  );
});

export { SidebarFooter };
