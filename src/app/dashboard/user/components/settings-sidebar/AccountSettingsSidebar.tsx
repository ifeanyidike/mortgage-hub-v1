import { IScrollspyMenuItems, ScrollspyMenu } from "@/app/partials/menu";

const AccountSettingsSidebar = () => {
  const items: IScrollspyMenuItems = [
    {
      title: "Basic Settings",
      target: "basic_settings",
      active: true,
    },

    {
      title: "Personal Settings",
      children: [
        {
          title: "Address",
          target: "advanced_settings_address",
        },
        {
          title: "Marital and Financial Status",
          target: "marital_financial_status",
          active: false,
        },
        {
          title: "Legal and Residency Status",
          target: "legal_residency_status",
          active: false,
        },
      ],
    },

    {
      title: "Financial Settings",
      children: [
        {
          title: "Employment & Income Details",
          target: "employment_income_details",
          active: false,
        },
        {
          title: "Financial Information",
          target: "financial_information",
          active: false,
        },
        {
          title: "Credit History",
          target: "credit_history",
          active: false,
        },
      ],
    },

    // {
    //   title: "Authentication",
    //   children: [
    //     {
    //       title: "Email",
    //       target: "auth_email",
    //       active: false,
    //     },
    //     {
    //       title: "Password",
    //       target: "auth_password",
    //     },
    //     {
    //       title: "Social Sign in",
    //       target: "auth_social_sign_in",
    //     },
    //     {
    //       title: "Single Sign On(SSO)",
    //       target: "auth_social_sign_in_sso",
    //     },
    //     {
    //       title: "Two-Factor auth(2FA)",
    //       target: "auth_two_factor",
    //     },
    //   ],
    // },
    {
      title: "Advanced Settings",
      children: [
        // {
        //   title: "Preferences",
        //   target: "advanced_settings_preferences",
        // },
        {
          title: "Appearance",
          target: "advanced_settings_appearance",
        },
        {
          title: "Notifications",
          target: "advanced_settings_notifications",
        },
      ],
    },
    // {
    //   title: "External Services",
    //   children: [
    //     {
    //       title: "Manage API",
    //       target: "external_services_manage_api",
    //     },
    //     {
    //       title: "Integrations",
    //       target: "external_services_integrations",
    //     },
    //   ],
    // },
    {
      title: "Delete Account",
      target: "delete_account",
    },
  ];

  return <ScrollspyMenu items={items} />;
};

export { AccountSettingsSidebar };
