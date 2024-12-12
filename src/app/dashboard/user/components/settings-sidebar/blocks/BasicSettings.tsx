"use client";
import { uploadFile } from "@/actions/upload";
import { updateUserData } from "@/actions/user";
import { IImageInputFile } from "@/app/dashboard-components/image-input";
import { CrudAvatarUpload } from "@/app/partials/crud";
import { regularUserStore } from "@/app/store/regularUserStore";
import { isSubsetMatching, toAbsoluteUrl } from "@/app/utils";
import { LoadingOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const BasicSettings = observer(() => {
  const [messageApi, contextHolder] = message.useMessage();
  const [saving, setSaving] = useState(false);
  const profile = regularUserStore.user_profile;
  const [avatar, setAvatar] = useState<IImageInputFile[]>([
    {
      dataURL: profile?.picture || toAbsoluteUrl(`/media/avatars/300-2.png`),
    },
  ]);
  const [name, setName] = useState<string>(profile?.name || "");

  const handleSubmit = async () => {
    console.log("submitting");
    try {
      setSaving(true);
      const formData = new FormData();
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

      const user_params = {
        name,
        ...(s3UploadUri && { picture: s3UploadUri }),
      };

      await updateUserData(profile?.user_id!, user_params);

      // await getOne(profile?.user_id!);
      await regularUserStore.loadUserProfile(profile?.user_id!);
      setSaving(false);

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
      setSaving(false);
    }
  };

  const allowSubmit = avatar[0]?.file || name !== profile?.name;

  return (
    <div className="card pb-2.5">
      {contextHolder}
      {saving && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-100/50 grid place-items-center z-10">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </div>
      )}
      <div className="card-header" id="basic_settings">
        <h3 className="card-title">Basic Settings</h3>
      </div>
      <div className="card-body grid gap-5">
        <div className="flex items-center flex-wrap gap-2.5">
          <label className="form-label max-w-56">Photo</label>
          <div className="flex items-center justify-between flex-wrap grow gap-2.5">
            <span className="text-2sm text-gray-700">
              150x150px JPEG, PNG Image
            </span>
            <CrudAvatarUpload avatar={avatar} setAvatar={setAvatar} />
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <label className="form-label flex items-center gap-1 max-w-56">
              Name
            </label>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <label className="form-label max-w-56">Email</label>
          <div className="grow text-sm text-gray-700" aria-disabled>
            {profile?.email}
          </div>
        </div>

        <div className="flex justify-end pt-2.5">
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={!allowSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
});

export { BasicSettings };
