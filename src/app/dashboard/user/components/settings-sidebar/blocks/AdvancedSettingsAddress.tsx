"use client";
import { updateUserProfile } from "@/actions/regular_user";
import { regularUserStore } from "@/app/store/regularUserStore";
import { isSubsetMatching } from "@/app/utils";
import { UserData } from "@/types/general";
import { LoadingOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const AdvancedSettingsAddress = observer(() => {
  const profile = regularUserStore.user_profile;
  const [messageApi, contextHolder] = message.useMessage();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<{
    postal_code?: string;
    location?: {
      city: string;
      province: string;
      address: string;
    } | null;
  }>({
    location: profile?.location,
    postal_code: profile?.postal_code,
  });

  const handleSubmit = async () => {
    console.log("submitting");
    try {
      setSaving(true);

      await updateUserProfile(profile?.user_id!, data);

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

  const allowSubmit = !isSubsetMatching(data || {}, profile || {});
  return (
    <div className="card">
      {contextHolder}
      {saving && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-100/50 grid place-items-center z-10">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </div>
      )}
      <div className="card-header" id="advanced_settings_address">
        <h3 className="card-title">Address</h3>
      </div>
      <div className="card-body grid gap-5 lg:py-7.5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label flex items-center gap-1 max-w-56">
            Address
          </label>
          <input
            className="input"
            type="text"
            value={data.location?.address}
            onChange={(e) =>
              setData({
                ...data,
                location: {
                  ...(data.location || {}),
                  address: e.target.value,
                } as UserData["location"],
              })
            }
          />
        </div>

        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">City</label>
          <input
            className="input"
            type="text"
            value={data.location?.city}
            // onChange={(e) => setData({ ...data, city: e.target.value })}
            onChange={(e) =>
              setData({
                ...data,
                location: {
                  ...(data.location || {}),
                  city: e.target.value,
                } as UserData["location"],
              })
            }
          />
        </div>

        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Province</label>
          <input
            className="input"
            type="text"
            placeholder="Province"
            value={data.location?.province}
            // onChange={(e) => setData({ ...data, province: e.target.value })}
            onChange={(e) =>
              setData({
                ...data,
                location: {
                  ...(data.location || {}),
                  province: e.target.value,
                } as UserData["location"],
              })
            }
          />
        </div>

        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Postcode</label>
          <input
            className="input"
            type="text"
            value={data.postal_code}
            onChange={(e) => setData({ ...data, postal_code: e.target.value })}
          />
        </div>

        <div className="flex justify-end pt-2.5">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!allowSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
});

export { AdvancedSettingsAddress };
