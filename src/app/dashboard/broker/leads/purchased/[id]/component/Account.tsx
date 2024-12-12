import { cn } from "@/app/utils";
import { Image } from "antd";
import React from "react";

type Props = {
  picture: string | null | undefined;
  email: string;
  is_email_verified: boolean;
  phone: string | null | undefined;
  is_phone_verified: boolean;
  location: Record<"address" | "city" | "province", string> | null | undefined;
  dob: string | null | undefined;
  postal_code: string | null | undefined;
};
const Account = ({
  picture,
  email,
  is_email_verified,
  phone,
  is_phone_verified,
  location,
  dob,
  postal_code,
}: Props) => {
  return (
    <div className="card min-w-full">
      <div className="card-table scrollable-x-auto pb-3">
        <table className="table align-middle text-sm text-gray-500">
          <tbody>
            <tr>
              <td className="w-28 text-gray-600 font-normal">Photo</td>
              {/* <td className="text-gray-700 text-2sm font-normal min-w-32">
                150x150px JPEG, PNG Image
              </td> */}
              <td className="flex justify-end">
                <div className="flex justify-center items-center ml-auto">
                  <Image
                    className="!w-16 !h-16 rounded-full"
                    src={picture!}
                    alt="avatar"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td className="text-gray-600 font-normal">Availability</td>
              <td className="text-gray-700 flex justify-end">
                <span className="badge badge-sm badge-outline badge-success">
                  Available now
                </span>
              </td>
            </tr>

            <tr>
              <td className="text-gray-600 font-normal min-w-36">Email</td>
              <td className="text-gray-800 font-normal min-w-60 gap-4 lg:gap-8 flex justify-end">
                <a href="#" className="text-gray-700 hover:text-primary-active">
                  {email}
                </a>
                <span
                  className={cn(
                    "badge badge-sm badge-outline",
                    is_email_verified ? "badge-success" : "badge-danger"
                  )}
                >
                  {is_email_verified ? "Verified" : "Not verified"}
                </span>
              </td>
            </tr>

            <tr>
              <td className="text-gray-600 font-normal min-w-36">Address</td>
              <td className="text-gray-800 font-normal min-w-60 gap-4 lg:gap-8 flex justify-end">
                <span className="text-gray-700 hover:text-primary-active">
                  {phone || "Not set"}
                </span>
                <span
                  className={cn(
                    "badge badge-sm badge-outline",
                    is_phone_verified ? "badge-success" : "badge-danger"
                  )}
                >
                  {is_phone_verified ? "Verified" : "Not verified"}
                </span>
              </td>
            </tr>

            <tr>
              <td className="text-gray-600 font-normal min-w-36">
                Date of birth
              </td>
              <td className="text-gray-800 font-normal min-w-60 gap-4 lg:gap-8 flex justify-end">
                <span className="text-gray-700 hover:text-primary-active">
                  {dob}
                </span>
              </td>
            </tr>

            <tr>
              <td className="text-gray-600 font-normal min-w-36">Address</td>
              <td className="text-gray-800 font-normal min-w-60 gap-4 lg:gap-8 flex justify-end">
                <span className="text-gray-700 hover:text-primary-active">
                  {location?.address}
                </span>
              </td>
            </tr>

            <tr>
              <td className="text-gray-600 font-normal min-w-36">City</td>
              <td className="text-gray-800 font-normal min-w-60 gap-4 lg:gap-8 flex justify-end">
                <span className="text-gray-700 hover:text-primary-active">
                  {location?.city}
                </span>
              </td>
            </tr>

            <tr>
              <td className="text-gray-600 font-normal min-w-36">City</td>
              <td className="text-gray-800 font-normal min-w-60 gap-4 lg:gap-8 flex justify-end">
                <span className="text-gray-700 hover:text-primary-active">
                  {location?.province}
                </span>
              </td>
            </tr>

            <tr>
              <td className="text-gray-600 font-normal min-w-36">
                Postal code
              </td>
              <td className="text-gray-800 font-normal min-w-60 gap-4 lg:gap-8 flex justify-end">
                <span className="text-gray-700 hover:text-primary-active">
                  {postal_code}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Account;
