"use client";
import { ChangeEvent, useState } from "react";
import {
  KeenIcon,
  Menu,
  MenuItem,
  MenuToggle,
} from "@/app/dashboard-components";

import { DropdownCard2 } from "@/app/partials/dropdowns/general";
import { observer } from "mobx-react-lite";
import { regularUserStore } from "@/app/store/regularUserStore";
import { updateUserProfile } from "@/actions/regular_user";
import { message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { isSubsetMatching } from "@/app/utils";

const SetGoal = observer(() => {
  const [saving, setSaving] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const profile = regularUserStore.user_profile;
  const defaultGoal = profile?.goal;
  const [goal, setGoal] = useState<number | null | undefined>(defaultGoal);
  const handleSubmit = async () => {
    console.log("submitting");
    try {
      setSaving(true);

      await updateUserProfile(profile?.user_id!, { goal });

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
  console.log("profile", profile, "goal", goal);
  const allowSubmit = !isSubsetMatching({ goal }, profile || {});

  return (
    <div className="card relative">
      {contextHolder}
      {saving && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-100/50 grid place-items-center z-10">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </div>
      )}
      <div className="card-header gap-2" id="settings_set_goal">
        <h3 className="card-title">Set a Goal</h3>

        {/* <Menu>
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
            {DropdownCard2()}
          </MenuItem>
        </Menu> */}
      </div>
      <div className="card-body lg:p-7.5 p-5">
        <p className="text-2sm text-gray-800 leading-5 mb-3.5">
          Envision your ideal property, outline your path. Set clear goals to
          turn your housing aspirations <br />
          into achievable milestones.
        </p>
        <div className="card shadow-none p-3.5">
          <span className="text-2.5xl font-semibold text-gray-800">
            {Number(goal || 0).toLocaleString("en-US", {
              style: "currency",
              currency: "CAD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <div className="flex justify-between items-center flex-wrap gap-2 mb-7">
            <div className="flex items-center gap-3.5 pt-1">
              <span className="text-2sm text-gray-700">
                Focus on finding opportunities that match your budget and
                lifestyle. <br /> Growth isn&apos;t just about property
                value—it&apos;s about building your future.
              </span>
            </div>

            <button
              onClick={() => handleSubmit()}
              disabled={!allowSubmit}
              className="btn btn-sm btn-light"
            >
              Add Goal
            </button>
          </div>

          <div className="mb-3">
            <input
              className="range card"
              max="10000000"
              min="0"
              type="range"
              value={goal || 0}
              onChange={(e) => setGoal(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export { SetGoal };
