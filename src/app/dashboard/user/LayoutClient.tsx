"use client";
import { regularUserStore } from "@/app/store/regularUserStore";
import { useSession } from "next-auth/react";
import React, { PropsWithChildren, useEffect } from "react";

const LayoutClient = ({ children }: PropsWithChildren) => {
  //   const { data: session } = useSession();
  //   const user_id = session?.user?.id;
  //   useEffect(() => {
  //     if (user_id) {
  //       regularUserStore.loadUserProfile(user_id);
  //     }
  //   }, [user_id]);
  return <>{children}</>;
};

export default LayoutClient;
