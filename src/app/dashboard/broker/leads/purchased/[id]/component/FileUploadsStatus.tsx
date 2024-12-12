import { toAbsoluteUrl } from "@/app/utils";

import { CommonAvatars, IAvatarsItems } from "@/app/partials/common";
import { Documents } from "@/types/db";

interface ICompanyProfileItem {
  total: string;
  description: string;
}
interface ICompanyProfileItems extends Array<ICompanyProfileItem> {}

type Props = {
  documents: Documents[] | undefined;
  username: string | null | undefined;
};
const FileUploadsStatus = (props: Props) => {
  const totalFiles = 5;
  const { documents, username } = props;
  function chunkText(str: string | undefined | null, len: number): string {
    if (!str) return "";
    if (str.length > len) {
      return str.slice(0, len) + "...";
    } else {
      return str;
    }
  }
  const statistics: ICompanyProfileItems = [
    {
      total: "Trial",
      description: "Status",
    },
    {
      total: "10,000",
      description: "Query runs",
    },
    {
      total: "Unlimited",
      description: "API calls",
    },
    {
      total: "$99.00",
      description: "Price",
    },
    {
      total: "17 Aug, 2024",
      description: "Next bill date",
    },
  ];

  const group: IAvatarsItems = [
    { filename: "300-4.png", variant: "size-6" },
    { filename: "300-1.png", variant: "size-6" },
    { filename: "300-2.png", variant: "size-6" },
    {
      fallback: "+16",
      variant: "text-primary-inverse size-6 ring-success-light bg-success",
    },
  ];

  const renderItem = (doc: Documents, index: number) => {
    return (
      <div
        key={index}
        className="flex flex-col gap-1.5 px-2.75 py-2.25 border border-dashed border-gray-400 rounded-md"
      >
        <span className="text-gray-900 text-sm leading-none font-medium">
          {chunkText(doc.name, 15)}
        </span>
        <span className="text-gray-700 text-xs">
          {chunkText(doc.description, 25)}
        </span>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-body lg:py-7.5">
        <div className="flex flex-wrap gap-7.5">
          <div className="flex flex-col gap-3 items-center justify-center size-[140px] rounded-xl ring-1 ring-gray-200 bg-secondary-clarity">
            <img
              src="/media/file-types/pdf.svg"
              className="size-[70px]"
              alt=""
            />
            {/* <span className="text-sm font-semibold text-gray-900">
              Cloud One
            </span> */}
          </div>
          <div className="flex flex-col gap-5 lg:gap-7.5 grow">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {username}'s file upload status
                  </h2>
                  {/* <span className="badge badge-sm badge-success badge-outline">
                    Monthly Plan
                  </span> */}
                </div>
                {/* <p className="text-2sm text-gray-700">
                  Essential Features for Startups and Individuals
                </p> */}
              </div>

              {documents?.length! < totalFiles && (
                <div className="flex items-center gap-2.5">
                  {/* <a href="#" className="btn btn-sm btn-light">
                  Cancel Plan
                </a> */}
                  <a href="#" className="btn btn-sm btn-primary">
                    Send reminder
                  </a>
                </div>
              )}
            </div>

            <div className="flex items-center flex-wrap gap-3 lg:gap-5">
              {documents?.map((doc, index) => {
                return renderItem(doc, index);
              })}
            </div>

            <div className="flex flex-wrap gap-6 lg:gap-12">
              <div className="flex flex-col gap-3.5 grow">
                <div className="text-2sm text-gray-600">
                  File uploaded:&nbsp;
                  <span className="text-2sm font-medium text-gray-900">
                    {documents?.length || 0} of {totalFiles} files
                  </span>
                </div>
                <div className="progress progress-primary max-w-2xl w-full">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${
                        ((documents?.length || 0) / totalFiles) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 lg:min-w-24 shrink-0 -mt-3 max-w-auto">
                <div className="text-2sm font-medium text-gray-600">
                  {(documents?.length || 0) >= totalFiles ? (
                    "Completed"
                  ) : (
                    <>
                      Remaining:&nbsp;
                      <span className="text-2sm font-semibold text-gray-800">
                        {totalFiles - (documents?.length || 0)} of {totalFiles}{" "}
                        files
                      </span>
                    </>
                  )}
                </div>
                {/* <CommonAvatars group={group} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadsStatus;
