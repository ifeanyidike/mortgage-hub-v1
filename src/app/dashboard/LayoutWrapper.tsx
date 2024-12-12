"use client";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import { Demo1Layout } from "./page-layout";
import { chatStore } from "../store/chatStore";
import { leadStore } from "../store/leadStore";
import { useSession } from "next-auth/react";
import { CustomSessionUser } from "@/types/general";
import { supabase } from "@/lib/supabase";

const LayoutClient = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession();
  const user = session?.user as CustomSessionUser;
  const initRef = useRef<boolean>(false);
  useEffect(() => {
    console.log("user_id", user?.id);
    const chatSubscription = chatStore.initializeSubscription(user);
    const leadSubscription = leadStore.initializeSubscription();

    return () => {
      supabase.removeChannel(chatSubscription);
      supabase.removeChannel(leadSubscription);
    };
  }, []);

  // useEffect(() => {
  //   const subscription = leadStore.initializeSubscription();
  //   console.log("subscription", subscription);
  //   return () => {
  //     supabase.removeChannel(subscription);
  //     //   if (leadStore.subscription) {
  //     //     // chatStore.subscription.unsubscribe();
  //     //     supabase.removeChannel(leadStore.subscription);
  //     //     leadStore.subscription = null;
  //     //   }
  //   };
  // }, []);

  return <div className="top-layout">{children}</div>;
};

export default LayoutClient;
