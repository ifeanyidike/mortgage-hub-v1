"use client";
import { useRef, useState } from "react";
import { KeenIcon } from "@/app/dashboard-components/keenicons";
import { toAbsoluteUrl } from "@/app/utils";
import { Menu, MenuItem, MenuToggle } from "@/app/dashboard-components";
import { DropdownUser } from "@/app/partials/dropdowns/user";
import { DropdownNotifications } from "@/app/partials/dropdowns/notifications";
import { DropdownApps } from "@/app/partials/dropdowns/apps";
import { DropdownChat } from "@/app/partials/dropdowns/chat";
import { ModalSearch } from "@/app/partials/modals/search/ModalSearch";
import { useSession } from "next-auth/react";
import { CustomSessionUser } from "@/types/general";
import { Image } from "antd";
import { observer } from "mobx-react-lite";
import { regularUserStore } from "@/app/store/regularUserStore";

const HeaderTopbar = observer(() => {
  const { data: session } = useSession();
  const user = session?.user as CustomSessionUser;
  const itemChatRef = useRef<any>(null);
  const itemAppsRef = useRef<any>(null);
  const itemUserRef = useRef<any>(null);
  const itemNotificationsRef = useRef<any>(null);

  const imageSrc = () => {
    if (user?.role === "user") {
      return regularUserStore.user_profile?.picture || user?.picture;
    }
    return user?.picture;
  };

  const handleShow = () => {
    window.dispatchEvent(new Event("resize"));
  };

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const handleOpen = () => setSearchModalOpen(true);
  const handleClose = () => {
    setSearchModalOpen(false);
  };

  return (
    <div className="flex items-center gap-2 lg:gap-3.5">
      <button
        onClick={handleOpen}
        className="btn btn-icon btn-icon-lg size-9 rounded-full hover:bg-primary-light hover:text-primary text-gray-500"
      >
        <KeenIcon icon="magnifier" />
      </button>
      <ModalSearch open={searchModalOpen} onClose={handleClose} />

      <Menu>
        <MenuItem
          ref={itemChatRef}
          onShow={handleShow}
          toggle="dropdown"
          trigger="click"
          dropdownProps={{
            placement: "bottom-end",
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [170, 10],
                },
              },
            ],
          }}
        >
          <MenuToggle className="btn btn-icon btn-icon-lg size-9 rounded-full hover:bg-primary-light hover:text-primary dropdown-open:bg-primary-light dropdown-open:text-primary text-gray-500">
            <KeenIcon icon="messages" />
          </MenuToggle>

          {DropdownChat({ menuTtemRef: itemChatRef })}
        </MenuItem>
      </Menu>

      <Menu>
        <MenuItem
          ref={itemAppsRef}
          toggle="dropdown"
          trigger="click"
          dropdownProps={{
            placement: "bottom-end",
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [-10, 10],
                },
              },
            ],
          }}
        >
          <MenuToggle className="btn btn-icon btn-icon-lg size-9 rounded-full hover:bg-primary-light hover:text-primary dropdown-open:bg-primary-light dropdown-open:text-primary text-gray-500">
            <KeenIcon icon="element-11" />
          </MenuToggle>

          {DropdownApps()}
        </MenuItem>
      </Menu>

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
                  offset: [-70, 10], // [skid, distance]
                },
              },
            ],
          }}
        >
          <MenuToggle className="btn btn-icon btn-icon-lg relative cursor-pointer size-9 rounded-full hover:bg-primary-light hover:text-primary dropdown-open:bg-primary-light dropdown-open:text-primary text-gray-500">
            <KeenIcon icon="notification-status" />
          </MenuToggle>
          {DropdownNotifications({ menuTtemRef: itemNotificationsRef })}
        </MenuItem>
      </Menu>

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
              className="size-9 !rounded-full !border-2 border-success !shrink-0"
              src={imageSrc() || toAbsoluteUrl("/media/avatars/300-2.png")}
              alt=""
              width={36}
              height={36}
            />
          </MenuToggle>
          {DropdownUser({ menuItemRef: itemUserRef })}
        </MenuItem>
      </Menu>
    </div>
  );
});

export { HeaderTopbar };
