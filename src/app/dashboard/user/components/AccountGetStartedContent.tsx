import { IOptionsItems, Options } from "@/app/pages/account/home/get-started";
import { Fragment } from "react";

const AccountGetStartedContent = () => {
  const items: IOptionsItems = [
    {
      icon: "badge",
      title: "Account & Personal info",
      desc: "We're open to partnerships, guest posts, promo bannersand more.",
      path: "/dashboard/user/profile",
    },
    {
      icon: "security-user",
      title: "Login & Security",
      desc: "Safeguarding your information with strong authentication measures.",
      path: "/dashboard/user/profile/security/",
    },
    {
      icon: "cheque",
      title: "Tools",
      desc: "Simplify payments today with secure, user-friendly transaction processes.",
      path: "/dashboard/network/tools",
    },
    {
      icon: "notification-on",
      title: "Notifications",
      desc: "Keep updated with important notices and event reminders.",
      path: "/dashboard/user/notifications",
    },
    {
      icon: "dropbox",
      title: "CRM Toolkit",
      desc: "Enhance Workflows with Advanced Integrations.",
      path: "/dashboard/user/crm/leads-connections",
    },
    {
      icon: "cloud-add",
      title: "Documents & Uploads",
      desc: "Efficient management of members, teams, and roles.",
      path: "/dashboard/user/document-upload",
    },
    {
      icon: "mouse-square",
      title: "Appearance",
      desc: "Transforming your online presence with flawless appearance.",
      path: "/dashboard/user/profile/appearance",
    },
    {
      icon: "chart-line-star",
      title: "Activity",
      desc: "Central Hub for Personal Customization.",
      path: "dashboard/user/profile/activity",
    },
    {
      icon: "support",
      title: "Support",
      desc: "Stay ahead with the latest devices and innovations news",
      path: "/dashboard/user/support",
    },
  ];

  return (
    <Fragment>
      <Options items={items} dropdown={true} />

      <div className="flex grow justify-center pt-5 lg:pt-7.5">
        <a href="#" className="btn btn-link">
          More Account Options
        </a>
      </div>
    </Fragment>
  );
};

export { AccountGetStartedContent };
