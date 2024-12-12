import {
  KeenIcon,
  Menu,
  MenuItem,
  MenuToggle,
} from "@/app/dashboard-components";
import { CommonAvatar } from "@/app/partials/common";
import { DropdownCard1 } from "@/app/partials/dropdowns/general";

interface IHeadingProps {
  author: string;
  avatar: {
    image?: string;
    fallback?: string;
    icon?: string;
    iconClass?: string;
    badgeClass?: string;
    className?: string;
    imageClass?: string;
  };
  date: string;
}

const Heading = ({ author, avatar, date }: IHeadingProps) => {
  return (
    <div className="flex justify-between items-center mb-5 p-7.5 pb-0">
      <div className="flex items-center gap-3">
        <CommonAvatar
          image={avatar.image}
          imageClass={avatar.imageClass}
          icon={avatar.icon}
          iconClass={avatar.iconClass}
          className={avatar.className}
        />

        <div className="flex flex-col">
          <a
            href="#"
            className="text-md font-medium text-gray-900 hover:text-primary-active mb-1"
          >
            {author}
          </a>
          <time className="text-sm text-gray-600">{date}</time>
        </div>
      </div>

      <Menu>
        <MenuItem
          toggle="dropdown"
          trigger="click"
          dropdownProps={{
            placement: "bottom-end",
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
          <MenuToggle className="btn btn-sm btn-icon btn-light btn-clear">
            <KeenIcon icon="dots-vertical" />
          </MenuToggle>
          {DropdownCard1()}
        </MenuItem>
      </Menu>
    </div>
  );
};

export { Heading, type IHeadingProps };
