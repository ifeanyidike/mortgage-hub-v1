// "use client";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import cn from "classnames";
// import HomeTrust from "@/app/assets/icons/home-trust.svg";
// import FinancialLP from "@/app/assets/icons/first-national-logo-color.svg";
// import Header from "@/components/Header";
// import CtaButton from "@/components/CtaButton";
// import { ReactNode } from "react";
// import {
//   CreditScoreIcon,
//   MortgageAssistanceIcon,
//   MortgageSeminarIcon,
// } from "@/app/assets/SvgComponents";

// const OurOffersSection = () => {
//   return (
//     <section
//       className={cn(
//         " relative w-full bg-center bg-cover bg-no-repeat",
//         "bg-[url('/assets/images/smiling-with-flag.jpg')] min-h-full"
//         // "max-lg:bg-[url('/assets/images/our-offers-mobile.jpg')]",
//         // "overflow-hidden max-h-screen"
//       )}
//       style={{ maxHeight: "calc(100vh - 80px)" }}
//     >
//        <Header bgColor="bg-transparent" />
//       <h2>As A New Immigrant You'll want some help with...</h2>
//       <div>
//         <ItemPane
//           icon={<CreditScoreIcon />}
//           text="Building a Strong Credit Score"
//         />
//         <ItemPane
//           icon={<MortgageSeminarIcon />}
//           text="Attending a mortgage Seminar"
//         />
//         <ItemPane
//           icon={<MortgageAssistanceIcon />}
//           text="Mortgage Assistance"
//         />
//       </div>
//     </section>
//   );
// };

// export default OurOffersSection;

// type Props = {
//   icon: ReactNode;
//   text: string;
// };
// const ItemPane = (props: Props) => {
//   const { icon, text } = props;
//   return (
//     <div>
//       {icon} <p>{text}</p>
//     </div>
//   );
// };

"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import cn from "classnames";
import Header from "@/components/Header";
import {
  CreditScoreIcon,
  MortgageAssistanceIcon,
  MortgageSeminarIcon,
} from "@/app/assets/SvgComponents";
import { ReactNode } from "react";

const OurOffersSection = () => {
  return (
    <section
      className={cn(
        "relative w-full max-h-screen min-h-[800px] bg-center bg-cover bg-no-repeat text-white flex flex-col items-center justify-center overflow-hidden",
        "bg-[url('/assets/images/smling-with-flag-mobile.png')] sm:bg-[url('/assets/images/smiling-with-flag.jpg')] bg-top",
        "flex "
      )}
      style={{
        maxHeight: "calc(100vh - 80px)",
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Header */}
      <div className="absolute top-0 left-0 w-full bg-white/40">
        <Header bgColor="bg-transparent" />
      </div>

      {/* Title */}
      <div className="flex-col flex lg:flex-row max-w-screen-xl mb-15 mx-auto w-full justify-around items-start ">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-bold mb-16 px-6 max-w-[500px] z-10"
        >
          As a New Immigrant, You&apos;ll Want Some Help With...
        </motion.h2>

        {/* Items */}
        <div className="flex flex-col justify-center max-md:mx-auto gap-4 z-10 px-6">
          <ItemPane
            icon={<CreditScoreIcon />}
            text="Building a Strong Credit Score"
          />
          <ItemPane
            icon={<MortgageSeminarIcon />}
            text="Attending a Mortgage Seminar"
          />
          <ItemPane
            icon={<MortgageAssistanceIcon />}
            text="Mortgage Assistance"
          />
        </div>
      </div>
    </section>
  );
};

export default OurOffersSection;

type Props = {
  icon: ReactNode;
  text: string;
};
const ItemPane = ({ icon, text }: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.07, y: -8 }}
      className="bg-white text-[#21334C] rounded-full p-4 px-6 gap-4 flex items-center shadow-md transform transition-transform"
    >
      <div className=" text-xl">{icon}</div>
      <p className="text-sm font-semibold">{text}</p>
    </motion.div>
  );
};
