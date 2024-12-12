import { cn } from "@/app/utils/";
import { Button } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  classes: string;
  text: string;
  bodyStyle?: string;
};
const CtaButton = (props: Props) => {
  const { href, classes, text, bodyStyle = "justify-center" } = props;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.5,
        duration: 0.6,
        type: "spring",
        stiffness: 150,
      }}
      className={`flex ${bodyStyle}`}
    >
      <Link href={href}>
        <Button
          size="large"
          shape="round"
          className={cn(
            "!p-8 !text-xl !flex !items-center !gap-4 shadow-md transition-all duration-200",
            classes
          )}
        >
          {text}
        </Button>
      </Link>
    </motion.div>
  );
};

export default CtaButton;
