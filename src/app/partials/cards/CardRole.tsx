import {
  KeenIcon,
  Menu,
  MenuItem,
  MenuToggle,
} from "@/app/dashboard-components";

import { DropdownCardItem1 } from "../dropdowns/general";
import { CommonHexagonBadge } from "../common";
import { ReactNode } from "react";
import Link from "next/link";

interface Badge {
  size: string;
  badge: ReactNode;
  fill: string;
  stroke: string;
}

interface IRoleProps {
  badge: Badge;
  title: string;
  subTitle: string;
  description: string;
  team: string;
  path: string;
}

const CardRole = ({
  path,
  title,
  subTitle,
  description,
  team,
  badge,
}: IRoleProps) => {
  return (
    <div className="card flex flex-col gap-5 p-5 lg:p-7.5">
      <div className="flex items-center flex-wrap justify-between gap-1">
        <div className="flex items-center gap-2.5">
          <CommonHexagonBadge {...badge} />

          <div className="flex flex-col">
            <Link
              href={`${path}`}
              className="text-md font-medium text-gray-900 hover:text-primary-active mb-px"
            >
              {title}
            </Link>
            <span className="text-2sm text-gray-700">{subTitle}</span>
          </div>
        </div>

        <Menu className="inline-flex">
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
            {DropdownCardItem1()}
          </MenuItem>
        </Menu>
      </div>

      <p className="text-2sm text-gray-700">{description}</p>

      <span className="text-2sm text-gray-800">{team}</span>
    </div>
  );
};

export { CardRole, type IRoleProps };
