import useBodyClasses from "@/hooks/useBodyClasses";
import { toAbsoluteUrl } from "@/app/utils";
import { ReactNode } from "react";
import Image from "next/image";
import { ErrorsLayout } from "./ErrorsLayout";

type Props = {
  tag: string;
  title: string;
  description: ReactNode;
};
const Error404Page = ({ tag, title, description }: Props) => {
  useBodyClasses("dark:bg-coal-500");

  return (
    <ErrorsLayout>
      <div className="mb-10">
        <Image
          src={toAbsoluteUrl("/media/illustrations/19.svg")}
          className=" max-h-[160px]"
          alt="error"
          width={160}
          height={160}
        />
        {/* <Image
          src={toAbsoluteUrl("/media/illustrations/19-dark.svg")}
          className="light:hidden max-h-[160px]"
          alt="error"
          width={100}
          height={100}
        /> */}
      </div>

      <span className="badge badge-primary badge-outline mb-3">{tag}</span>

      <h3 className="text-2.5xl font-semibold text-gray-900 text-center mb-2">
        {tag}
      </h3>

      <div className="text-md text-center text-gray-700 mb-10">
        {description}
      </div>
    </ErrorsLayout>
  );
};

export { Error404Page };
