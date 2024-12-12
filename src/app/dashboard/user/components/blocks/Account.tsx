import { KeenIcon } from "@/app/dashboard-components";
import { toAbsoluteUrl } from "@/app/utils/Assets";

import { CrudAvatarUpload } from "@/app/partials/crud";
import { useSession } from "next-auth/react";
import { CustomSessionUser, EditableUserData } from "@/types/general";
import { observer } from "mobx-react-lite";
import { regularUserStore } from "@/app/store/regularUserStore";
import { cn, isSubsetMatching } from "@/app/utils";
import React, { useState } from "react";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Input,
  message,
  Space,
} from "antd";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { uploadFile } from "@/actions/upload";
import { getOne, updateUserProfile } from "@/actions/regular_user";
import { updateUserData } from "@/actions/user";
import { IImageInputFile } from "@/app/dashboard-components/image-input";
import { CloseOutlined } from "@ant-design/icons";
import TwoFactor from "@/app/dashboard/components/TwoFactor";
import { sendVerifiationText } from "@/actions/verification";
import { customError } from "@/server/error";
import Link from "next/link";

interface IAccountProps {
  title: string;
}

const Account = observer(({ title }: IAccountProps) => {
  const profile = regularUserStore.user_profile;
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const handleClose = () => {
    setProfileModalOpen(false);
  };
  const [phoneVerificationTextPending, setPhoneVerificationTextPending] =
    useState(false);

  const [accountData, setAccountData] = useState<EditableUserData>();
  const [messageApi, contextHolder] = message.useMessage();
  // const [saving, setSaving] = useState(false);
  const [state, setState] = useState<"saved" | "saving" | "dirty" | "clean">(
    "clean"
  );

  const getData = (key: keyof typeof profile) => {
    if (!accountData && !profile) return "";
    if (!accountData && profile) return profile[key] || "";
    const data = accountData![key];
    if (data === undefined || data === null) {
      return profile?.[key] || "";
    }
    return data || "";
  };

  const getLocationData = (key: "address" | "city" | "province") => {
    if (!accountData && !profile) return "";
    if (!accountData && profile) return profile?.location?.[key] || "";
    const data = accountData?.location?.[key];
    if (data === undefined || data === null) {
      return profile?.location?.[key] || "";
    }
    return data || "";
  };

  const [avatar, setAvatar] = useState<IImageInputFile[]>([
    {
      dataURL: profile?.picture || toAbsoluteUrl(`/media/avatars/300-2.png`),
    },
  ]);

  const allowSubmit = () => {
    if (avatar[0]?.file) return true;
    return !isSubsetMatching(accountData || {}, profile || {});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting");
    try {
      setState("saving");
      const formData = new FormData(e.currentTarget);
      let s3UploadUri;
      if (avatar[0]?.file) {
        formData.set("file", avatar[0].file);
        const { status, s3Uri } = await uploadFile(formData, "profile_pics");
        if (status === "error") {
          console.error("Failed to upload image");
          return;
        }

        s3UploadUri = s3Uri;
        setAvatar([{ dataURL: s3UploadUri }]);
      }

      const profile_params = {
        // picture: s3UploadUri,
        ...(accountData?.location && {
          location: {
            address:
              accountData?.location?.address ||
              profile?.location?.address ||
              "",
            city: accountData?.location?.city || profile?.location?.city || "",
            province:
              accountData?.location?.province ||
              profile?.location?.province ||
              "",
          },
        }),
      };

      const user_params = {
        ...(accountData?.name && { name: accountData.name }),
        ...(accountData?.dob && { dob: accountData?.dob }),
        ...(s3UploadUri && { picture: s3UploadUri }),
      };

      if (Object.values(profile_params).length) {
        await updateUserProfile(profile?.user_id!, profile_params);
      }

      if (Object.values(user_params).length) {
        await updateUserData(profile?.user_id!, user_params);
      }

      // await getOne(profile?.user_id!);
      await regularUserStore.loadUserProfile(profile?.user_id!);
      setState("saved");

      messageApi.open({
        type: "success",
        content: "Profile data has been successfully saved.",
      });
    } catch (error) {
      console.log("error", error);
      messageApi.open({
        type: "error",
        content: "An error occurred while saving your data.",
      });
      setState("dirty");
    }
  };

  const handleSendVerificationText = async (phone: string) => {
    try {
      setPhoneVerificationTextPending(true);
      console.log("phone in handleSendVerificationText", phone);
      await sendVerifiationText(phone);
      messageApi.open({
        type: "success",
        content: "Verification text sent successfully.",
      });
    } catch (error: any) {
      console.error("Failed to send verification text", error);
      messageApi.open({
        type: "error",
        content: "Failed to send verification text.",
      });

      const serializedError = customError.serializeError(error);
      messageApi.open({
        type: "error",
        content: serializedError,
      });
      console.log("Serialized Axios error:", serializedError);
    } finally {
      setPhoneVerificationTextPending(false);
    }
  };

  return (
    <div className="card min-w-full">
      {contextHolder}
      <div className="card-header">
        <h3 className="card-title">{title}</h3>

        <div className="flex items-center gap-2">
          <label className="switch switch-sm">
            <span className="switch-label">Public Profile</span>
            <input
              type="checkbox"
              value="1"
              name="check"
              defaultChecked
              readOnly
            />
          </label>
        </div>
      </div>
      <form
        className="card-table scrollable-x-auto pb-3"
        onSubmit={handleSubmit}
      >
        <table className="table align-middle text-sm text-gray-500">
          <tbody>
            <tr>
              <td className="w-28 text-gray-600 font-normal">Photo</td>
              <td className="text-gray-700 text-2sm font-normal min-w-32">
                150x150px JPEG, PNG Image
              </td>
              <td className="text-center">
                <div className="flex justify-center items-center">
                  <CrudAvatarUpload avatar={avatar} setAvatar={setAvatar} />
                </div>
              </td>
            </tr>

            <TriggerEditInput
              fieldName="Name"
              name="name"
              value={getData("name" as keyof typeof profile)}
              onChange={(value) =>
                setAccountData((prev) => ({ ...prev, name: value }))
              }
              setState={setState}
              state={state}
            />

            <tr>
              <td className="text-gray-600 font-normal">Availability</td>
              <td className="text-gray-700">
                <span className="badge badge-sm badge-outline badge-success">
                  Available now
                </span>
              </td>
            </tr>

            <tr>
              <td className="text-gray-600 font-normal min-w-36">Email</td>
              <td className="text-gray-800 font-normal min-w-60 flex gap-4 lg:gap-8">
                <a href="#" className="text-gray-700 hover:text-primary-active">
                  {profile?.email}
                </a>
                <span
                  className={cn(
                    "badge badge-sm badge-outline",
                    profile?.is_email_verified
                      ? "badge-success"
                      : "badge-danger"
                  )}
                >
                  {profile?.is_email_verified ? "Verified" : "Not verified"}
                </span>
              </td>

              <td className="text-center">
                {!profile?.is_email_verified && (
                  <button type="button" className="btn btn-link btn-sm">
                    Setup
                  </button>
                )}
              </td>
            </tr>

            <tr>
              <td className="text-gray-600 font-normal min-w-36">Phone</td>
              <td className="text-gray-800 font-normal min-w-60 flex gap-4 lg:gap-8">
                <a href="#" className="text-gray-700 hover:text-primary-active">
                  {profile?.phone || "Not set"}
                </a>
                <span
                  className={cn(
                    "badge badge-sm badge-outline",
                    profile?.is_phone_verified
                      ? "badge-success"
                      : "badge-danger"
                  )}
                >
                  {profile?.is_phone_verified ? "Verified" : "Not verified"}
                </span>
              </td>

              <td className="text-center">
                {!profile?.is_phone_verified && (
                  <button
                    type="button"
                    onClick={() => {
                      setProfileModalOpen(true);
                      if (profile?.phone) {
                        handleSendVerificationText(profile.phone);
                      }
                    }}
                    className="btn btn-link btn-sm"
                  >
                    Setup
                  </button>
                )}
              </td>
            </tr>

            <TriggerEditDate
              fieldName="Date of Birth"
              name="dob"
              value={getData("dob" as keyof typeof profile)}
              onChange={(value) =>
                setAccountData((prev) => ({ ...prev, dob: value }))
              }
              setState={setState}
              state={state}
            />

            <TriggerEditInput
              fieldName="Province"
              value={getLocationData("province")}
              name="province"
              onChange={(value) => {
                const newLocation = (accountData?.location || {}) as Record<
                  "address" | "city" | "province",
                  string
                >;
                newLocation.province = value;
                setAccountData((prev) => ({ ...prev, location: newLocation }));
              }}
              setState={setState}
              state={state}
            />

            <TriggerEditInput
              fieldName="City"
              value={getLocationData("city")}
              name="city"
              onChange={(value) => {
                const newLocation = (accountData?.location || {}) as Record<
                  "address" | "city" | "province",
                  string
                >;
                newLocation.city = value;
                setAccountData((prev) => ({ ...prev, location: newLocation }));
              }}
              setState={setState}
              state={state}
            />

            <TriggerEditInput
              fieldName="Address"
              value={getLocationData("address")}
              name="address"
              onChange={(value) => {
                const newLocation = (accountData?.location || {}) as Record<
                  "address" | "city" | "province",
                  string
                >;
                newLocation.address = value;
                setAccountData((prev) => ({ ...prev, location: newLocation }));
              }}
              setState={setState}
              state={state}
            />
          </tbody>
        </table>
        <div className="card-footer flex w-full justify-center">
          <Link
            href="/dashboard/user/profile/settings"
            className="btn btn-link"
          >
            More settings
          </Link>
        </div>
        {allowSubmit() && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <Button
              shape="round"
              type="primary"
              size="large"
              className="btn-success rounded !mx-auto !mt-4"
              htmlType="submit"
            >
              {state === "saving" && (
                <motion.i
                  animate={state === "saving" ? { rotate: 360 } : { rotate: 0 }}
                  transition={{
                    duration: 1,
                    repeat: state === "saving" ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <KeenIcon icon="loading" />
                </motion.i>
              )}
              Save changes
            </Button>
          </motion.div>
        )}
      </form>

      <TwoFactor
        phone={profile?.phone}
        open={profileModalOpen}
        handleSendVerificationText={handleSendVerificationText}
        phoneVerificationTextPending={phoneVerificationTextPending}
        onClose={handleClose}
        messageApi={messageApi}
      />
    </div>
  );
});

export { Account, type IAccountProps };

const TriggerEditInput = ({
  fieldName,
  value,
  onChange,
  name,
  setState,
  state,
}: {
  fieldName: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  setState: React.Dispatch<
    React.SetStateAction<"saved" | "saving" | "dirty" | "clean">
  >;
  state: "saved" | "saving" | "dirty" | "clean";
}) => {
  const [isEditing, setIsEditing] = useState(false);
  React.useEffect(() => {
    if (state === "saved") {
      setIsEditing(false);
    }
  }, [state]);
  return (
    <tr>
      <td className="text-gray-600 font-normal">{fieldName}</td>
      <td className="text-gray-800 font-normal">
        {isEditing ? (
          <Input
            value={value || undefined}
            name={name}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              !isEditing && "!border-none !outline-none !border-0",
              "text-gray-700 hover:text-primary-active"
            )}
          />
        ) : (
          <span className="text-gray-700 hover:text-primary-active">
            {value || "Not set"}
          </span>
        )}
      </td>
      <td className="text-center">
        <button
          type="button"
          onClick={() => {
            setIsEditing(!isEditing);
            if (state === "saved") setState("clean");
          }}
          className="btn btn-sm btn-icon btn-clear btn-primary"
        >
          {isEditing ? (
            <CloseOutlined size={24} />
          ) : (
            <KeenIcon icon="notepad-edit" />
          )}
        </button>
      </td>
    </tr>
  );
};

const TriggerEditDate = ({
  fieldName,
  value,
  onChange,
  name,
  setState,
  state,
}: {
  fieldName: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  setState: React.Dispatch<
    React.SetStateAction<"saved" | "saving" | "dirty" | "clean">
  >;
  state: "saved" | "saving" | "dirty" | "clean";
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const onOk = (value: DatePickerProps["value"]) => {
    console.log("onOk: ", value);
  };
  const dateFormat = "YYYY/MM/DD";

  React.useEffect(() => {
    if (state === "saved") {
      setIsEditing(false);
    }
  }, [state]);

  return (
    <tr>
      <td className="text-gray-600 font-normal min-w-36">{fieldName}</td>
      <td className="text-gray-800 font-normal min-w-60">
        {isEditing ? (
          <Space direction="vertical" size={12}>
            <DatePicker
              defaultValue={value ? dayjs(value, dateFormat) : null}
              name={name}
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
                onChange(dateString as string);
              }}
              onOk={onOk}
              className={cn(
                !isEditing && "!border-none !outline-none !border-0"
              )}
            />
          </Space>
        ) : (
          <span className="text-gray-700 hover:text-primary-active">
            {value || "Not set"}
          </span>
        )}
      </td>
      <td className="max-w-16 text-center">
        <button
          type="button"
          onClick={() => {
            setIsEditing(!isEditing);
            if (state === "saved") setState("clean");
          }}
          className="btn btn-sm btn-icon btn-clear btn-primary"
        >
          {isEditing ? (
            <CloseOutlined size={24} />
          ) : (
            <KeenIcon icon="notepad-edit" />
          )}
        </button>
      </td>
    </tr>
  );
};
