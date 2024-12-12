"use client";
import {
  KeenIcon,
  Menu,
  MenuItem,
  MenuToggle,
  MenuIcon,
  MenuLink,
  MenuSub,
  MenuTitle,
} from "@/app/dashboard-components";
import { downloadSingleFile, handleDownloadAllAsZip } from "@/app/utils";
import { Documents } from "@/types/db";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Link from "next/link";
import { useState } from "react";

interface IUploadsItem {
  id?: string;
  image: string;
  desc: string;
  date: string;
}
interface IUploadsItems extends Array<IUploadsItem> {}

interface IUploadsProps {
  title: string;
  items: IUploadsItems;
  setSelectedDocument?: React.Dispatch<React.SetStateAction<Documents | null>>;
  documents?: Documents[] | null;
  username: string;
}

const Uploads = ({
  title,
  items,
  setSelectedDocument,
  documents,
  username,
}: IUploadsProps) => {
  const [downloading, setDownloading] = useState<boolean>(false);
  console.log("items", items);
  const renderItem = (item: IUploadsItem, index: number) => {
    return (
      <div key={index} className="flex items-center gap-3">
        <div className="flex items-center grow gap-2.5">
          <img src={`/media/file-types/${item.image}`} alt="" />

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 cursor-pointer hover:text-primary mb-px">
              {item.desc}
            </span>
            <span className="text-xs text-gray-700">{item.date}</span>
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
            {/* {DropdownCard()} */}
            <MenuSub
              className="menu-default"
              rootClassName="w-full max-w-[175px]"
            >
              <MenuItem
                onClick={() => {
                  if (item.id && documents && setSelectedDocument) {
                    setSelectedDocument(
                      documents.find((d) => d.id === item.id)!
                    );
                  }
                }}
                path="#"
              >
                <MenuLink>
                  <MenuIcon>
                    <KeenIcon icon="document" />
                  </MenuIcon>
                  <MenuTitle>Details</MenuTitle>
                </MenuLink>
              </MenuItem>

              <MenuItem
                path="#"
                onClick={() => {
                  if (item.id && documents) {
                    downloadSingleFile(
                      documents.find((d) => d.id === item.id)!
                    );
                  }
                }}
              >
                <MenuLink>
                  <MenuIcon>
                    <KeenIcon icon="file-down" />
                  </MenuIcon>
                  <MenuTitle>Download</MenuTitle>
                </MenuLink>
              </MenuItem>
            </MenuSub>
          </MenuItem>
        </Menu>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>

        <button
          className="btn btn-light btn-sm"
          onClick={() =>
            handleDownloadAllAsZip(documents, username, setDownloading)
          }
        >
          {downloading ? (
            <Spin indicator={<LoadingOutlined />} />
          ) : (
            <KeenIcon icon="exit-down" />
          )}
          Download All
        </button>
      </div>

      <div className="card-body">
        <div className="grid gap-2.5 lg:gap-5">
          {items.map((item, index) => {
            return renderItem(item, index);
          })}
        </div>
      </div>

      {/* <div className="card-footer justify-center">
        <Link href="/account/integrations" className="btn btn-link">
          All Files
        </Link>
      </div> */}
    </div>
  );
};

// export { Uploads, type IUploadsItem, type IUploadsItems, type IUploadsProps };
export default Uploads;
