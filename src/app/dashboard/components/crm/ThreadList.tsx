import { chatStore } from "@/app/store/chatStore";
import { leadStore } from "@/app/store/leadStore";
import { threadStore } from "@/app/store/threadStore";
import {
  cn,
  formatMessageDateIntl,
  formatMessageDateIntlShort,
  isBeforeYesterday,
} from "@/app/utils";
import { CustomSessionUser } from "@/types/general";
import {
  CloseOutlined,
  CommentOutlined,
  MenuOutlined,
  MessageOutlined,
  WechatOutlined,
  WechatWorkOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Image, Tabs } from "antd";
import { FaSearch } from "react-icons/fa";

type ThreadData = {
  user_id: string;
  profile_pic: string;
  name: string;
  is_active: boolean;
  time: string;
  num_unread: number;
};
const ThreadList = observer(() => {
  const { data: session } = useSession();
  const user = session?.user as CustomSessionUser;
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      await leadStore.fetchPurchasedLeads(user?.id!, user.role === "broker");
      threadStore.isLoading = false;
    })();
  }, []);

  const data = Array.from(threadStore.threads).map(([friend_id, chatData]) => {
    const friend_profile = threadStore.profileCache.get(friend_id);
    const is_active = threadStore.friend_id === friend_id;

    return {
      user_id: friend_id,
      profile_pic: friend_profile?.picture || "/media/avatars/default.png",
      name: friend_profile?.name || "Unnamed User",
      is_active,
      time: formatMessageDateIntlShort(chatData?.messages?.[0]?.sent_at),
      num_unread: is_active
        ? 0
        : chatData?.messages?.filter(
            (m: any) => m.reciever_id === user?.id && m.is_read === false
          ).length || 0,
    };
  });

  const activeChat = Array.from(threadStore.threads)
    .map(([friend_id, chatData]) => {
      const friend_profile = threadStore.profileCache.get(friend_id);
      const is_active = threadStore.friend_id === friend_id;
      const messages = chatData?.messages;
      const lastMessage = messages ? messages[messages.length - 1] : null;

      if (!lastMessage || isBeforeYesterday(lastMessage?.sent_at)) {
        return;
      }

      return {
        user_id: friend_id,
        profile_pic: friend_profile?.picture || "/media/avatars/default.png",
        name: friend_profile?.name || "Unnamed User",
        is_active,
        time: formatMessageDateIntlShort(chatData?.messages?.[0]?.sent_at),
        num_unread: is_active
          ? 0
          : chatData?.messages?.filter(
              (m: any) => m.reciever_id === user?.id && m.is_read === false
            ).length || 0,
      };
    })
    .filter(Boolean) as ThreadData[];

  const renderListItems = (data: ThreadData[]) => {
    return Boolean(data.length) ? (
      <>
        <div className="p-4">
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-3">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats..."
              className="ml-3 flex-grow bg-transparent outline-none text-sm text-gray-800 bg-gray-200"
            />
          </div>
        </div>
        <div>
          {[...data].map((d) => (
            <motion.div
              key={d.user_id}
              onClick={() => threadStore.setActiveThread(d.user_id)}
              className={cn(
                "flex items-center gap-3 cursor-pointer py-4 transition-all hover:bg-primary-light hover:shadow-md rounded-md",
                d.is_active
                  ? "bg-primary-light text-primary-dark shadow-sm"
                  : "text-gray-600",
                isExpanded ? "px-3" : "justify-center"
              )}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
            >
              {/* Profile Picture with Preview */}
              <Image
                src={d.profile_pic}
                preview={{
                  mask: <span className="text-white">Preview</span>,
                }}
                className="!w-8 !h-8 !rounded-full !border !border-gray-300 !shadow-sm !object-cover"
                alt="Profile Picture"
              />
              {isExpanded && (
                <>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium truncate">
                      {d.name}
                    </span>
                    <span
                      className={cn(
                        "text-xs text-gray-400",
                        d.num_unread ? "text-red-500 font-semibold" : ""
                      )}
                    >
                      {d.num_unread > 0
                        ? `${d.num_unread > 10 ? "10+" : d.num_unread} unread`
                        : "No unread messages"}
                    </span>
                  </div>
                  {/* Unread Badge */}
                  <div className="ml-auto flex flex-col gap-2">
                    {Boolean(d.num_unread) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center w-6 h-6 shadow-lg"
                      >
                        {d.num_unread > 10 ? "10+" : d.num_unread}
                      </motion.div>
                    )}
                    <small className="text-[10px] text-gray-500 mt-auto">
                      {d.time}
                    </small>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </>
    ) : (
      <div className="flex items-center justify-center py-5 text-gray-500 text-sm">
        No conversations yet.
      </div>
    );
  };

  return (
    <div
      //   initial={{ width: isExpanded ? "20%" : "w-96" }}
      //   animate={{ width: isExpanded ? "23%" : "w-96" }}
      //   transition={{ duration: 0.5, ease: "easeInOut" }}
      className={cn(
        // "flex flex-col shadow-lg rounded-md bg-gradient-to-b from-white to-gray-50 sticky top-0 border border-gray-200",
        "bg-gray-50 border-r border-gray-200 max-lg:h-[500px] crm-sidebar"
        // isExpanded ? "md:w-[23%]" : "w-96"
      )}
      style={{
        maxHeight: "60vh",
        height: "fit-content",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "flex items-center py-3 transition-all",
          isExpanded ? "px-5 justify-between" : "justify-center"
        )}
      >
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xl text-primary font-bold flex items-center"
          >
            <WechatWorkOutlined className="mr-2 text-xl text-gray-700" />
            Chats
          </motion.span>
        )}
        <button
          //   onClick={() => setIsExpanded(!isExpanded)}
          className="text-xl text-gray-500 hover:text-primary transition-colors"
        >
          {isExpanded ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </motion.div> */}

      <Tabs
        defaultActiveKey="1"
        items={[MessageOutlined, CommentOutlined].map((Icon, i) => {
          const id = String(i + 1);
          return {
            key: id,
            label: (
              <div className="!w-full !px-3">
                {i === 0 ? (
                  <p className="space-x-2">
                    <MessageOutlined /> Messages
                  </p>
                ) : (
                  <p className="space-x-2">
                    <CommentOutlined /> Active
                  </p>
                )}
              </div>
            ),
            children:
              i === 0 ? renderListItems(data) : renderListItems(activeChat),
          };
        })}
      />

      {/* Threads */}
      {/* {renderListItems(data)} */}
    </div>
  );
});

export default ThreadList;
