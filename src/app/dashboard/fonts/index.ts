import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

// export const montserrat = Montserrat({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-montserrat",
// });

export const montserrat = localFont({
  src: [
    {
      path: "./Montserrat-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Montserrat-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Montserrat-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Montserrat-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    // Add other font variants here
  ],
  variable: "--font-montserrat",
});
