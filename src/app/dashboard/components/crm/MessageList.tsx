import { DropdownChatMessageIn } from "@/app/partials/dropdowns/chat/DropdownChatMessageIn";
import { DropdownChatMessageOut } from "@/app/partials/dropdowns/chat/DropdownChatMessageOut";
import { IDropdownMessage } from "@/app/partials/dropdowns/chat/types";
import React, { useEffect, useState } from "react";
import { IoLogoWechat } from "react-icons/io5";
import { observer } from "mobx-react-lite";
import { chatStore } from "@/app/store/chatStore";
import { useSession } from "next-auth/react";
import { threadStore } from "@/app/store/threadStore";
import { CustomSessionUser } from "@/types/general";
import { brokerStore } from "@/app/store/brokerStore";
import { regularUserStore } from "@/app/store/regularUserStore";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { formatMessageDateIntl } from "@/app/utils";

const MessageList = observer(() => {
  // const { friend_id } = chatStore;
  const [isChatInit, setChatInit] = useState(false);
  const { threads, profileCache, friend_id } = threadStore;
  const { data: session } = useSession();
  const user = session?.user as CustomSessionUser;
  const profile =
    user.role === "broker"
      ? brokerStore.broker_profile
      : regularUserStore.user_profile;

  const user_id = profile?.user_id!;
  const messages = threads.get(friend_id!)?.messages;

  useEffect(() => {
    if (friend_id && user_id) {
      chatStore.fetchMessages(user_id, () => {
        setChatInit(true);
      });
    }
  }, [friend_id]);

  const handleMarkAsRead = () => {
    messages?.forEach((message) => {
      if (!message.is_read && message.receiver_id === user_id) {
        chatStore.markMessageAsRead(message.id);
      }
    });
  };

  useEffect(() => {
    handleMarkAsRead();
  }, [messages]);

  return (
    <div className="flex flex-col gap-5 py-5 h-full relative mb-4 bg-[#f7f9fb]">
      {!isChatInit && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-100/50 grid place-items-center z-10">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </div>
      )}
      {Boolean(messages?.length) ? (
        messages?.map((message, index) => {
          if (message.sender_id === user_id) {
            return (
              <DropdownChatMessageOut
                key={index}
                text={message.content}
                time={formatMessageDateIntl(message.sent_at)}
                read={message.is_read || false} // Default to false if read is not provided
              />
            );
          } else {
            const id =
              message.receiver_id !== user_id
                ? message.receiver_id
                : message.sender_id;
            return (
              <DropdownChatMessageIn
                key={index}
                text={message.content}
                time={formatMessageDateIntl(message.sent_at)}
                avatar={
                  threadStore.profileCache.get(id)?.picture ||
                  "/media/avatars/300-4.png"
                }
              />
            );
          }
          return null; // Handle cases where neither `in` nor `out` is specified
        })
      ) : (
        <div className="flex flex-col justify-center items-center text-xl h-full gap-8">
          <IoLogoWechat size={120} className="text-gray-500" />
          <p className="max-w-4/5 text-gray-600">
            Welcome to the dedicated CRM dashboard to communicate with your
            leads.
          </p>
        </div>
      )}
    </div>
  );
});

export default MessageList;
