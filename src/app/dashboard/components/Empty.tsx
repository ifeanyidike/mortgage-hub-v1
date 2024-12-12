import { Fragment } from "react";
import Link from "next/link";

type Props = {
  subheading: string;
  content: React.ReactNode;
  homeLink: string;
};
const Empty = ({ subheading, content, homeLink }: Props) => {
  return (
    <div className="mt-20 md:mt-40">
      <div className="card p-8 lg:p-12">
        <div className="card-body">
          <div className="grid justify-center py-5">
            <img
              src="/media/illustrations/11.svg"
              className="max-h-[170px]"
              alt=""
            />
            {/* <img
              src={toAbsoluteUrl("/media/illustrations/11.svg")}
              className="dark:hidden max-h-[170px]"
              alt=""
            /> */}
            {/* <img
              src={toAbsoluteUrl("/media/illustrations/11-dark.svg")}
              className="light:hidden max-h-[170px]"
              alt=""
            /> */}
          </div>

          <div className="text-lg font-medium text-gray-900 text-center">
            {subheading}
          </div>
          <div className="text-sm text-gray-700 text-center gap-1">
            {content}
            {/* Begin by crafting your inaugural list in minutes.&nbsp;
            <Link
              href="/account/billing/plans"
              className="text-sm font-medium link"
            >
              Get Started!
            </Link> */}
          </div>
        </div>
      </div>

      <div className="flex grow justify-center pt-5 lg:pt-7.5">
        <Link href={homeLink} className="btn btn-link">
          Return to home
        </Link>
      </div>
    </div>
  );
};

export default Empty;
