import { toAbsoluteUrl } from "@/app/utils";
import { motion } from "framer-motion";

interface IDropdownChatMessageInProps {
  text: string;
  time: string;
  avatar: string;
}

const DropdownChatMessageIn = ({
  text,
  time,
  avatar,
}: IDropdownChatMessageInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-end gap-3.5 px-5"
    >
      <img src={toAbsoluteUrl(avatar)} className="rounded-full size-9" alt="" />

      <div className="flex flex-col gap-1.5">
        <div
          className="card shadow-xl !rounded-xl flex flex-col bg-white gap-2.5 p-3 !rounded-bl-none text-2sm font-medium text-gray-700"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <span className="text-2xs font-medium text-gray-500">{time}</span>
      </div>
    </motion.div>
  );
};

export { DropdownChatMessageIn, type IDropdownChatMessageInProps };
