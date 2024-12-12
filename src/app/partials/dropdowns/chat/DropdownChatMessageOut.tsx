"use client";
import { toAbsoluteUrl } from "@/app/utils";
import { KeenIcon } from "@/app/dashboard-components";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useSession } from "next-auth/react";
import { CustomSessionUser } from "@/types/general";
import { motion } from "framer-motion";

interface IDropdownChatMessageOutProps {
  text: string;
  time: string;
  read: boolean;
}

const DropdownChatMessageOut = observer(
  ({ text, time, read }: IDropdownChatMessageOutProps) => {
    const { data: session } = useSession();
    const user = session?.user as CustomSessionUser;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-end justify-end gap-3.5 px-5"
      >
        <div className="flex flex-col gap-1.5 ">
          <div
            className="card shadow-xl !rounded-xl flex bg-primary text-primary-inverse text-2sm font-medium flex-col gap-2.5 p-3 !rounded-br-none "
            dangerouslySetInnerHTML={{ __html: text }}
          />

          <div className="flex items-center justify-end relative">
            <span className="text-2xs font-medium text-gray-600 me-6">
              {time}
            </span>
            <KeenIcon
              icon="double-check"
              className={clsx(
                "text-lg absolute",
                read ? "text-success" : "text-gray-400"
              )}
            />
          </div>
        </div>

        <div className="relative shrink-0">
          <img
            src={user?.picture || "/media/avatars/300-2.png"}
            className="rounded-full size-9"
            alt=""
          />
          <span className="size-[4.8px] badge badge-circle badge-success absolute top-7 end-0 transform -translate-y-1/2"></span>
        </div>
      </motion.div>
    );
  }
);

export { DropdownChatMessageOut, type IDropdownChatMessageOutProps };
