"use client";
import { useRef } from "react";
import { KeenIcon } from "@/app/dashboard-components/keenicons";
import { toAbsoluteUrl } from "@/app/utils";
import { Menu, MenuItem, MenuToggle } from "@/app/dashboard-components";
import { DropdownUser } from "@/app/partials/dropdowns/user";
import { DropdownNotifications } from "@/app/partials/dropdowns/notifications";
import { DropdownChat } from "@/app/partials/dropdowns/chat";

const HeaderTopbar = () => {
  const itemChatRef = useRef<any>(null);
  const itemUserRef = useRef<any>(null);
  const itemNotificationsRef = useRef<any>(null);

  const handleDropdownChatShow = () => {
    window.dispatchEvent(new Event("resize"));
  };

  return (
    <div className="flex items-center gap-3.5">
      <div className="flex items-center gap-1">
        <Menu>
          <MenuItem
            ref={itemNotificationsRef}
            toggle="dropdown"
            trigger="click"
            dropdownProps={{
              placement: "bottom-end",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [115, 10], // [skid, distance]
                  },
                },
              ],
            }}
          >
            <MenuToggle className="btn btn-icon btn-icon-lg size-9 rounded-full hover:bg-gray-200 dropdown-open:bg-gray-200 text-gray-600">
              <KeenIcon icon="notification-status" className="text-gray-600" />
            </MenuToggle>
            {DropdownNotifications({ menuTtemRef: itemNotificationsRef })}
          </MenuItem>
        </Menu>

        <Menu>
          <MenuItem
            ref={itemChatRef}
            onShow={handleDropdownChatShow}
            toggle="dropdown"
            trigger="click"
            dropdownProps={{
              placement: "bottom-end",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [75, 10], // [skid, distance]
                  },
                },
              ],
            }}
          >
            <MenuToggle className="btn btn-icon btn-icon-lg size-9 rounded-full hover:bg-gray-200 dropdown-open:bg-gray-200 text-gray-600">
              <KeenIcon icon="messages" className="text-gray-600" />
            </MenuToggle>

            {DropdownChat({ menuTtemRef: itemChatRef })}
          </MenuItem>
        </Menu>
      </div>

      <Menu>
        <MenuItem
          ref={itemUserRef}
          toggle="dropdown"
          trigger="click"
          dropdownProps={{
            placement: "bottom-end",
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [20, 10], // [skid, distance]
                },
              },
            ],
          }}
        >
          <MenuToggle className="btn btn-icon rounded-full">
            <img
              className="size-9 rounded-full justify-center border border-gray-500 shrink-0"
              src={toAbsoluteUrl("/media/avatars/gray/5.png")}
              alt=""
            />
          </MenuToggle>
          {DropdownUser({ menuItemRef: itemUserRef })}
        </MenuItem>
      </Menu>
    </div>
  );
};

export { HeaderTopbar };
