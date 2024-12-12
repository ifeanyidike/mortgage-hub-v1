import { Fragment } from "react";

import { toAbsoluteUrl } from "@/app/utils";

import {
  MiscHighlightedPosts,
  IHighlightedPostsItems,
} from "@/app/partials/misc";

import { FeaturesHighlight } from "@/app/pages/public-profile/profiles/creator";
import {
  Authentification,
  GeneralSettings,
  LoginSessions,
  ProductInsight,
  QuickSettings,
  TrustedDevices,
} from "./blocks";

const AccountOverviewContent = () => {
  const posts: IHighlightedPostsItems = [
    {
      icon: "shield-slash",
      title: "Enhancing Security Knowledge: Guides, Tips, and Documentation",
      summary:
        "Explore comprehensive resources to strengthen security understanding through detailed guides, expert tips, and documentation.",
      path: "#",
    },
    {
      icon: "ensure",
      title: "Mastering Security Protocols: Learning Through Expert Guidance",
      summary:
        "Delve into the realm of security with specialized learning materials, expert guidance, and practical tips for implementation.",
      path: "#",
    },
    {
      icon: "shield-search",
      title: "Navigating Digital Security: A Comprehensive Learning Journey",
      summary:
        "Embark on a journey of digital security enlightenment with our extensive collection of educational guides and practical advice..",
      path: "#",
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <FeaturesHighlight
            image={
              <Fragment>
                <img
                  src={toAbsoluteUrl("/media/illustrations/5.svg")}
                  className="dark:hidden max-h-36"
                  alt=""
                />
                <img
                  src={toAbsoluteUrl("/media/illustrations/5-dark.svg")}
                  className="light:hidden max-h-36"
                  alt=""
                />
              </Fragment>
            }
            title="Essential Personal Security Tips for Enhanced Safety"
            description="Transform your living space beautifully with our Restyle Your Space: Soft Goods Makeover Ideas tutorial"
            more={{ title: "Review Security Tips", url: "#" }}
            features={[
              ["Strong Passwords", "Two-Factor Authentication"],
              ["Budget-Friendly", "Fresh Look"],
            ]}
          />

          <GeneralSettings />

          <Authentification />

          <QuickSettings />

          <LoginSessions />

          <TrustedDevices />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <ProductInsight
            image={
              <Fragment>
                <img
                  src={toAbsoluteUrl("/media/brand-logos/apple-black.svg")}
                  className="dark:hidden h-5"
                  alt=""
                />
                <img
                  src={toAbsoluteUrl("/media/brand-logos/apple-white.svg")}
                  className="light:hidden h-5"
                  alt=""
                />
              </Fragment>
            }
            title="iOS"
            description="Active Sessions"
            number={24}
          />

          <ProductInsight
            image={
              <img
                src={toAbsoluteUrl("/media/brand-logos/android.svg")}
                className="h-5"
                alt=""
              />
            }
            title="Android"
            description="Active Sessions"
            number={35}
          />

          <MiscHighlightedPosts posts={posts} />
        </div>
      </div>
    </div>
  );
};

export { AccountOverviewContent };
