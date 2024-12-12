"use client";
import { KeenIcon } from "@/app/dashboard-components";
import { chatStore } from "@/app/store/chatStore";
import { CustomSessionUser } from "@/types/general";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const MessageForm = () => {
  const { data: session } = useSession();
  const user = session?.user as CustomSessionUser;
  const [message, setMessage] = useState("");
  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!message) return;
    e.preventDefault();
    await chatStore.sendMessage(user?.id!, message);
    setMessage("");
    // Send the message to the server
    // Clear the input field
  };
  return (
    <form onSubmit={handleSubmit} className="relative grow mx-5 mb-2.5">
      <img
        src={user.picture || "/media/avatars/300-2.png"}
        className="rounded-full size-[30px] absolute start-0 top-2/4 -translate-y-2/4 ms-2.5"
        alt=""
      />

      <input
        type="text"
        className="input h-auto py-4 ps-12 bg-transparent"
        onChange={handleFormInput}
        placeholder="Write a message..."
        value={message}
      />

      <div className="flex items-center gap-2.5 absolute end-3 top-1/2 -translate-y-1/2">
        <button
          type="submit"
          className="btn btn-sm btn-icon btn-light btn-clear"
        >
          <KeenIcon icon="exit-up" />
        </button>
        <button className="btn btn-dark btn-sm">Send</button>
      </div>
    </form>
  );
};

export default MessageForm;
