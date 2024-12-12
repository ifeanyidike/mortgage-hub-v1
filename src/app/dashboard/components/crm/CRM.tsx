"use client";
import { Container, KeenIcon } from "@/app/dashboard-components";
import { cn, getHeight } from "@/app/utils";
import { useViewport } from "@/hooks";
import React, { useEffect, useRef, useState } from "react";
import MessageList from "./MessageList";
import ThreadList from "./ThreadList";
import MessageForm from "./MessageForm";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { threadStore } from "@/app/store/threadStore";
import { Upgrade } from "../../user/components/blocks";
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from "@/app/partials/toolbar";

const CRM = observer(() => {
  const headerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [scrollableHeight, setScrollableHeight] = useState<number>(0);
  const footerRef = useRef<HTMLDivElement>(null);

  const [viewportHeight] = useViewport();
  const offset = 110;
  const friendProfile = threadStore.friend_id
    ? threadStore.profileCache?.get(threadStore.friend_id)
    : undefined;

  useEffect(() => {
    if (messagesRef.current) {
      let availableHeigh: number = viewportHeight - offset;

      //   if (headerRef.current) availableHeigh -= getHeight(headerRef.current);
      if (footerRef.current) availableHeigh -= getHeight(footerRef.current);

      setScrollableHeight(availableHeigh);
    }
  }, [viewportHeight]);

  // const buildHeader = () => {
  //   return (
  //     <>
  //       <div className="flex items-center justify-between gap-2.5 text-sm text-gray-900 font-semibold px-5 py-2.5">
  //         Chat
  //         <button
  //           className="btn btn-sm btn-icon btn-light btn-clear shrink-0"
  //           onClick={() => {}}
  //         >
  //           <KeenIcon icon="cross" />
  //         </button>
  //       </div>
  //       <div className="border-b border-b-gray-200"></div>
  //     </>
  //   );
  // };

  const buildHeader = () => {
    return (
      <motion.div
        ref={headerRef}
        className="flex items-center justify-between px-6 py-4 "
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex gap-2 items-center">
          <img
            src={friendProfile?.picture}
            className="w-10 h-10 rounded-full"
          />
          <h2 className="text-sm">{friendProfile?.name}</h2>
        </div>
        {/* <h2 className="text-lg font-semibold">Chat</h2>
        <button
          className="rounded-full hover:bg-blue-700 p-2 transition"
          onClick={() => {}}
        >
          <KeenIcon icon="cross" />
        </button> */}
      </motion.div>
    );
  };

  return (
    <>
      <Container>
        {/* <Upgrade /> */}
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle />
            <ToolbarDescription>
              Tailored Tools for Business Scalability
            </ToolbarDescription>
          </ToolbarHeading>
          <ToolbarActions>
            <a href="#" className="btn btn-sm btn-light">
              Public Profile
            </a>
            <a href="#" className="btn btn-sm btn-primary">
              My profile
            </a>
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <div
          className="flex flex-col lg:flex-row lg:mt-10 gap-6"
          style={{ height: "calc(100vh - 170px)" }}
        >
          <ThreadList />
          {/* shadow-md rounded  */}
          <div
            className="border border-gray-400 flex-1 flex flex-col rounded-t-lg"
            style={{ height: "60dvh" }}
          >
            <div ref={headerRef}>{buildHeader()}</div>
            <div
              ref={messagesRef}
              className="scrollable-y-auto pb-4 flex-1 bg-[#f7f9fb]"
              style={{ maxHeight: `${scrollableHeight}px` }}
            >
              <MessageList />
            </div>

            <motion.div
              ref={footerRef}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <MessageForm />
            </motion.div>
          </div>
        </div>
      </Container>
    </>
  );
});

export default CRM;
