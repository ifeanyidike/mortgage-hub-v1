import { type TMenuConfig } from "@/app/dashboard-components/menu";

export const MENU_SIDEBAR: TMenuConfig = [
  {
    title: "Dashboards",
    icon: "element-11",
    children: [
      {
        title: "Light Sidebar",
        path: "/",
      },
      {
        title: "Dark Sidebar",
        path: "/dark-sidebar",
      },
    ],
  },
  {
    heading: "User",
  },
  {
    title: "Public Profile",
    icon: "profile-circle",
    children: [
      {
        title: "Profiles",
        children: [
          {
            title: "Default",
            path: "/public-profile/profiles/default",
          },
          {
            title: "Creator",
            path: "/public-profile/profiles/creator",
          },
          {
            title: "Company",
            path: "/public-profile/profiles/company",
          },
          {
            title: "NFT",
            path: "/public-profile/profiles/nft",
          },
          {
            title: "Blogger",
            path: "/public-profile/profiles/blogger",
          },
          {
            title: "CRM",
            path: "/public-profile/profiles/crm",
          },
          {
            title: "More",
            collapse: true,
            collapseTitle: "Show less",
            expandTitle: "Show 4 more",
            dropdownProps: {
              placement: "right-start",
            },
            children: [
              {
                title: "Gamer",
                path: "/public-profile/profiles/gamer",
              },
              {
                title: "Feeds",
                path: "/public-profile/profiles/feeds",
              },
              {
                title: "Plain",
                path: "/public-profile/profiles/plain",
              },
              {
                title: "Modal",
                path: "/public-profile/profiles/modal",
              },
            ],
          },
        ],
      },
      {
        title: "Projects",
        children: [
          {
            title: "3 Columns",
            path: "/public-profile/projects/3-columns",
          },
          {
            title: "2 Columns",
            path: "/public-profile/projects/2-columns",
          },
        ],
      },
      {
        title: "Works",
        path: "/public-profile/works",
      },
      {
        title: "Teams",
        path: "/public-profile/teams",
      },
      {
        title: "Network",
        path: "/public-profile/network",
      },
      {
        title: "Activity",
        path: "/public-profile/activity",
      },
      {
        title: "More",
        collapse: true,
        collapseTitle: "Show less",
        expandTitle: "Show 3 more",
        dropdownProps: {
          placement: "right-start",
        },
        children: [
          {
            title: "Campaigns - Card",
            path: "/public-profile/campaigns/card",
          },
          {
            title: "Campaigns - List",
            path: "/public-profile/campaigns/list",
          },
          {
            title: "Empty",
            path: "/public-profile/empty",
          },
        ],
      },
    ],
  },
  {
    title: "My Account",
    icon: "setting-2",
    children: [
      {
        title: "Account",
        children: [
          {
            title: "Get Started",
            path: "/account/home/get-started",
          },
          {
            title: "User Profile",
            path: "/account/home/user-profile",
          },
          {
            title: "Company Profile",
            path: "/account/home/company-profile",
          },
          {
            title: "Settings - With Sidebar",
            path: "/account/home/settings-sidebar",
          },
          {
            title: "Settings - Enterprise",
            path: "/account/home/settings-enterprise",
          },
          {
            title: "Settings - Plain",
            path: "/account/home/settings-plain",
          },
          {
            title: "Settings - Modal",
            path: "/account/home/settings-modal",
          },
        ],
      },

      {
        title: "Integrations",
        path: "/account/integrations",
      },
      {
        title: "Notifications",
        path: "/account/notifications",
      },
      {
        title: "API Keys",
        path: "/account/api-keys",
      },
      {
        title: "More",
        collapse: true,
        collapseTitle: "Show less",
        expandTitle: "Show 3 more",
        dropdownProps: {
          placement: "right-start",
        },
        children: [
          {
            title: "Appearance",
            path: "/account/appearance",
          },
          {
            title: "Invite a Friend",
            path: "/account/invite-a-friend",
          },
          {
            title: "Activity",
            path: "/account/activity",
          },
        ],
      },
    ],
  },

  { heading: "Apps" },
  {
    title: "User Management",
    icon: "users",
    disabled: true,
  },
  {
    title: "Projects",
    icon: "questionnaire-tablet",
    disabled: true,
  },
  {
    title: "eCommerce",
    icon: "handcart",
    disabled: true,
  },
  { heading: "Miscellaneous" },
  {
    title: "Modals",
    icon: "some-files",
    disabled: true,
  },
  {
    title: "Wizards",
    icon: "note-2",
    disabled: true,
  },
];

export const MENU_MEGA: TMenuConfig = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Profiles",
    children: [
      {
        title: "Profiles",
        children: [
          {
            children: [
              {
                title: "Default",
                icon: "badge",
                path: "/public-profile/profiles/default",
              },
              {
                title: "Creator",
                icon: "coffee",
                path: "/public-profile/profiles/creator",
              },
              {
                title: "Company",
                icon: "abstract-41",
                path: "/public-profile/profiles/company",
              },
              {
                title: "NFT",
                icon: "bitcoin",
                path: "/public-profile/profiles/nft",
              },
              {
                title: "Blogger",
                icon: "message-text",
                path: "/public-profile/profiles/blogger",
              },
              {
                title: "CRM",
                icon: "devices",
                path: "/public-profile/profiles/crm",
              },
              {
                title: "Gamer",
                icon: "ghost",
                path: "/public-profile/profiles/gamer",
              },
            ],
          },
          {
            children: [
              {
                title: "Feeds",
                icon: "book",
                path: "/public-profile/profiles/feeds",
              },
              {
                title: "Plain",
                icon: "files",
                path: "/public-profile/profiles/plain",
              },
              {
                title: "Modal",
                icon: "mouse-square",
                path: "/public-profile/profiles/modal",
              },
              {
                title: "Freelancer",
                icon: "financial-schedule",
                path: "#",
                disabled: true,
              },
              {
                title: "Developer",
                icon: "technology-4",
                path: "#",
                disabled: true,
              },
              {
                title: "Team",
                icon: "users",
                path: "#",
                disabled: true,
              },
              {
                title: "Events",
                icon: "calendar-tick",
                path: "#",
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        title: "Other Pages",
        children: [
          {
            children: [
              {
                title: "Projects - 3 Columns",
                icon: "element-6",
                path: "/public-profile/projects/3-columns",
              },
              {
                title: "Projects - 2 Columns",
                icon: "element-4",
                path: "/public-profile/projects/2-columns",
              },
              {
                title: "Works",
                icon: "office-bag",
                path: "/public-profile/works",
              },
              {
                title: "Teams",
                icon: "people",
                path: "/public-profile/teams",
              },
              {
                title: "Network",
                icon: "icon",
                path: "/public-profile/network",
              },
              {
                title: "Activity",
                icon: "chart-line-up-2",
                path: "/public-profile/activity",
              },
              {
                title: "Campaigns - Card",
                icon: "element-11",
                path: "/public-profile/campaigns/card",
              },
            ],
          },
          {
            children: [
              {
                title: "Campaigns - List",
                icon: "kanban",
                path: "/public-profile/campaigns/list",
              },
              {
                title: "Empty",
                icon: "file-sheet",
                path: "/public-profile/empty",
              },
              {
                title: "Documents",
                icon: "document",
                path: "#",
                disabled: true,
              },
              {
                title: "Badges",
                icon: "award",
                path: "#",
                disabled: true,
              },
              {
                title: "Awards",
                icon: "gift",
                path: "#",
                disabled: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "My Account",
    children: [
      {
        title: "General Pages",
        children: [
          {
            title: "Integrations",
            icon: "technology-2",
            path: "/account/integrations",
          },
          {
            title: "Notifications",
            icon: "notification-1",
            path: "/account/notifications",
          },
          { title: "API Keys", icon: "key", path: "/account/api-keys" },
          { title: "Appearance", icon: "eye", path: "/account/appearance" },
          {
            title: "Invite a Friend",
            icon: "user-tick",
            path: "/account/invite-a-friend",
          },
          { title: "Activity", icon: "support", path: "/account/activity" },
          { title: "Brand", icon: "verify", disabled: true },
          { title: "Get Paid", icon: "euro", disabled: true },
        ],
      },
      {
        title: "Other pages",
        children: [
          {
            title: "Account Home",
            children: [
              { title: "Get Started + ", path: "/account/home/get-started" },
              { title: "User Profile", path: "/account/home/user-profile" },
              {
                title: "Company Profile",
                path: "/account/home/company-profile",
              },
              { title: "With Sidebar", path: "/account/home/settings-sidebar" },
              {
                title: "Enterprise",
                path: "/account/home/settings-enterprise",
              },
              { title: "Plain", path: "/account/home/settings-plain" },
              { title: "Modal", path: "/account/home/settings-modal" },
            ],
          },
          {
            title: "Billing",
            children: [
              { title: "Basic Billing", path: "/account/billing/basic" },
              { title: "Enterprise", path: "/account/billing/enterprise" },
              { title: "Plans", path: "/account/billing/plans" },
              { title: "Billing History", path: "/account/billing/history" },
              { title: "Tax Info", disabled: true },
              { title: "Invoices", disabled: true },
              { title: "Gateaways", disabled: true },
            ],
          },
          {
            title: "Security",
            children: [
              { title: "Get Started", path: "/account/security/get-started" },
              {
                title: "Security Overview",
                path: "/account/security/",
              },
              {
                title: "IP Addresses",
                path: "/account/security/allowed-ip-addresses",
              },
              {
                title: "Privacy Settings",
                path: "/account/security/privacy-settings",
              },
              {
                title: "Device Management",
                path: "/account/security/device-management",
              },
              {
                title: "Backup & Recovery",
                path: "/account/security/backup-and-recovery",
              },
              {
                title: "Current Sessions",
                path: "/account/security/current-sessions",
              },
              { title: "Security Log", path: "/account/security/security-log" },
            ],
          },
          {
            title: "Members & Roles",
            children: [
              { title: "Teams Starter", path: "/account/members/team-starter" },
              { title: "Teams", path: "/account/members/teams" },
              { title: "Team Info", path: "/account/members/team-info" },
              {
                title: "Members Starter",
                path: "/account/members/members-starter",
              },
              { title: "Team Members", path: "/account/members/team-members" },
              {
                title: "Import Members",
                path: "/account/members/import-members",
              },
              { title: "Roles", path: "/account/members/roles" },
              {
                title: "Permissions - Toggler",
                path: "/account/members/permissions-toggle",
              },
              {
                title: "Permissions - Check",
                path: "/account/members/permissions-check",
              },
            ],
          },
          {
            title: "Other Pages",
            children: [
              { title: "Integrations", path: "/account/integrations" },
              { title: "Notifications", path: "/account/notifications" },
              { title: "API Keys", path: "/account/api-keys" },
              { title: "Appearance", path: "/account/appearance" },
              { title: "Invite a Friend", path: "/account/invite-a-friend" },
              { title: "Activity", path: "/account/activity" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Network",
    children: [
      {
        title: "General Pages",
        children: [
          { title: "Get Started", icon: "flag", path: "/network/get-started" },
          { title: "Colleagues", icon: "users", path: "#", disabled: true },
          { title: "Donators", icon: "heart", path: "#", disabled: true },
          { title: "Leads", icon: "abstract-21", path: "#", disabled: true },
        ],
      },
      {
        title: "Other pages",
        children: [
          {
            title: "User Cards",
            children: [
              { title: "Mini Cards", path: "/network/user-cards/mini-cards" },
              { title: "Team Members", path: "/network/user-cards/team-crew" },
              { title: "Authors", path: "/network/user-cards/author" },
              { title: "NFT Users", path: "/network/user-cards/nft" },
              { title: "Social Users", path: "/network/user-cards/social" },
              { title: "Gamers", path: "#", disabled: true },
            ],
          },
          {
            title: "User Base",
            badge: "Datatables",
            children: [
              { title: "Team Crew", path: "/network/user-table/team-crew" },
              { title: "App Roster", path: "/network/user-table/app-roster" },
              {
                title: "Market Authors",
                path: "/network/user-table/market-authors",
              },
              { title: "SaaS Users", path: "/network/user-table/saas-users" },
              {
                title: "Store Clients",
                path: "/network/user-table/store-clients",
              },
              { title: "Visitors", path: "/network/user-table/visitors" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Authentication",
    children: [
      {
        title: "General pages",
        children: [
          {
            title: "Classic Layout",
            children: [
              { title: "Sign In", path: "/auth/classic/login" },
              { title: "Sign Up", path: "/auth/classic/signup" },
              { title: "2FA", path: "/auth/classic/2fa" },
              { title: "Check Email", path: "/auth/classic/check-email" },
              {
                title: "Reset Password",
                children: [
                  {
                    title: "Enter Email",
                    path: "/auth/classic/reset-password/enter-email",
                  },
                  {
                    title: "Check Email",
                    path: "/auth/classic/reset-password/check-email",
                  },
                  {
                    title: "Change Password",
                    path: "/auth/classic/reset-password/change",
                  },
                  {
                    title: "Password is Changed",
                    path: "/auth/classic/reset-password/changed",
                  },
                ],
              },
            ],
          },
          {
            title: "Branded Layout",
            children: [
              { title: "Sign In", path: "/auth/login" },
              { title: "Sign Up", path: "/auth/signup" },
              { title: "2FA", path: "/auth/2fa" },
              { title: "Check Email", path: "/auth/check-email" },
              {
                title: "Reset Password",
                children: [
                  {
                    title: "Enter Email",
                    path: "/auth/reset-password/enter-email",
                  },
                  {
                    title: "Check Email",
                    path: "/auth/reset-password/check-email",
                  },
                  {
                    title: "Change Password",
                    path: "/auth/reset-password/change",
                  },
                  {
                    title: "Password is Changed",
                    path: "/auth/reset-password/changed",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Other Pages",
        children: [
          {
            title: "Welcome Message",
            icon: "like-2",
            path: "/auth/welcome-message",
          },
          {
            title: "Account Deactivated",
            icon: "shield-cross",
            path: "/auth/account-deactivated",
          },
          { title: "Error 404", icon: "message-question", path: "/error/404" },
          { title: "Error 500", icon: "information", path: "/error/500" },
        ],
      },
    ],
  },
  {
    title: "Help",
    children: [
      {
        title: "Getting Started",
        icon: "coffee",
        path: "https://keenthemes.com/metronic/tailwind/docs/getting-started/installation",
      },
      {
        title: "Support Forum",
        icon: "information",
        children: [
          {
            title: "All Questions",
            icon: "questionnaire-tablet",
            path: "https://devs.keenthemes.com",
          },
          {
            title: "Popular Questions",
            icon: "star",
            path: "https://devs.keenthemes.com/popular",
          },
          {
            title: "Ask Question",
            icon: "message-question",
            path: "https://devs.keenthemes.com/question/create",
          },
        ],
      },
    ],
  },
];

export const MENU_ROOT: TMenuConfig = [
  {
    title: "Public Profile",
    icon: "profile-circle",
    rootPath: "/public-profile/",
    path: "public-profile/profiles/default",
    childrenIndex: 2,
  },
  {
    title: "Account",
    icon: "setting-2",
    rootPath: "/account/",
    path: "/",
    childrenIndex: 3,
  },
  {
    title: "Network",
    icon: "users",
    rootPath: "/network/",
    path: "network/get-started",
    childrenIndex: 4,
  },
  {
    title: "Authentication",
    icon: "security-user",
    rootPath: "/authentication/",
    path: "authentication/get-started",
    childrenIndex: 5,
  },
];

export const MENU_USER: TMenuConfig = [
  {
    title: "Dashboard",
    icon: "element-11",
    children: [
      {
        title: "Overview",
        path: "/dashboard/user/",
      },
      {
        title: "Activity",
        path: "/dashboard/user/activity",
      },
    ],
  },
  {
    heading: "Profile",
  },
  {
    title: "My Profile",
    icon: "profile-circle",
    children: [
      {
        title: "Profile View",
        path: "/dashboard/user/profile",
      },
      {
        title: "More Settings",
        path: "/dashboard/user/profile/settings",
      },
      {
        title: "Privacy",
        path: "/dashboard/user/profile/privacy",
      },
      {
        title: "More",
        collapse: true,
        collapseTitle: "Show less",
        expandTitle: "Show 2 more",
        dropdownProps: {
          placement: "right-start",
        },
        children: [
          {
            title: "Notifications",
            path: "/dashboard/user/profile/notifications",
          },
          {
            title: "Linked Accounts",
            path: "/dashboard/user/profile/linked-accounts",
          },
        ],
      },
    ],
  },
  { heading: "Files & Tools" },
  {
    title: "Uploads",
    icon: "cloud-add",
    children: [
      {
        title: "Document uploads",
        path: "/dashboard/user/document-upload",
        icon: "abstract-21",
        // children: [
        //   { title: "Get Started", icon: "flag", path: "/network/get-started" },
        //   { title: "Colleagues", icon: "users", path: "#", disabled: true },
        //   { title: "Donators", icon: "heart", path: "#", disabled: true },
        //   { title: "Leads", icon: "abstract-21", path: "#", disabled: true },
        // ],
      },
      // {
      //   title: "Other pages",
      //   children: [
      //     {
      //       title: "User Cards",
      //       children: [
      //         { title: "Mini Cards", path: "/network/user-cards/mini-cards" },
      //         { title: "Team Members", path: "/network/user-cards/team-crew" },
      //         { title: "Authors", path: "/network/user-cards/author" },
      //         { title: "NFT Users", path: "/network/user-cards/nft" },
      //         { title: "Social Users", path: "/network/user-cards/social" },
      //         { title: "Gamers", path: "#", disabled: true },
      //       ],
      //     },
      //     {
      //       title: "User Base",
      //       badge: "Datatables",
      //       children: [
      //         { title: "Team Crew", path: "/network/user-table/team-crew" },
      //         { title: "App Roster", path: "/network/user-table/app-roster" },
      //         {
      //           title: "Market Authors",
      //           path: "/network/user-table/market-authors",
      //         },
      //         { title: "SaaS Users", path: "/network/user-table/saas-users" },
      //         {
      //           title: "Store Clients",
      //           path: "/network/user-table/store-clients",
      //         },
      //         { title: "Visitors", path: "/network/user-table/visitors" },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
  {
    title: "Tools",
    icon: "calculator",
    children: [
      { title: "Tools list", path: "/network/tools/" },
      {
        title: "Mortgage Calculator",
        path: "/dashboard/user/network/tools/mortgage-calculator",
      },
      {
        title: "Credit calculator",
        path: "/dashboard/user/network/tools/credit-calculator",
      },
      {
        title: "Lenders calculator",
        path: "/dashboard/user/network/tools/lenders-calculator",
      },
      {
        title: "Path finder",
        path: "/dashboard/user/network/tools/path-finder",
      },
    ],
  },
  { heading: "CRM" },
  {
    title: "Leads and Connections",
    icon: "badge",
    children: [
      { title: "Connections", path: "/dashboard/user/crm" },
      {
        title: "Set up lead",
        path: "/dashboard/user/leads",
      },
    ],
  },

  {
    title: "Notifications",
    icon: "notification-on",
    path: "/dashboard/user/notifications",
  },

  {
    title: "Support",
    icon: "support",
    path: "/dashboard/user/support",
  },
];

export const MENU_BROKER: TMenuConfig = [
  {
    title: "Dashboard",
    icon: "element-11",
    children: [
      {
        title: "Overview",
        path: "/dashboard/broker/overview",
      },
      {
        title: "Leads",
        path: "/dashboard/broker/leads",
      },
      {
        title: "Performance",
        path: "/dashboard/broker/performance",
      },
    ],
  },
  {
    heading: "Accounts",
  },
  {
    title: "Profile",
    icon: "profile-circle",
    children: [
      {
        title: "Manage Clients",
        path: "/dashboard/broker/profile/manage",
      },
      {
        title: "Add New Client",
        path: "/dashboard/broker/profile/add",
      },
    ],
  },
  {
    title: "Reports",
    icon: "chart",
    children: [
      {
        title: "Monthly Reports",
        path: "/dashboard/broker/reports/monthly",
      },
      {
        title: "Yearly Reports",
        path: "/dashboard/broker/reports/yearly",
      },
    ],
  },
  {
    title: "Settings",
    icon: "setting-2",
    children: [
      {
        title: "Profile Settings",
        path: "/dashboard/broker/settings/profile",
      },
      {
        title: "Billing",
        path: "/dashboard/broker/settings/billing",
      },
    ],
  },
  { heading: "Leads" },
  {
    title: "Leads and Connections",
    icon: "badge",
    children: [
      { title: "Chats", path: "/dashboard/broker/crm" },

      {
        title: "Available Leads",
        path: "/dashboard/broker/leads",
      },
    ],
  },
  {
    title: "Purchases",
    icon: "shop",
    path: "/dashboard/broker/leads/purchased",
  },
  { heading: "Support" },

  {
    title: "Questions",
    icon: "question",
    path: "/dashboard/help/questions",
  },
  {
    title: "Support",
    icon: "support",
    path: "/dashboard/help/support",
  },
];

export const MENU_LENDER: TMenuConfig = [
  {
    title: "Dashboard",
    icon: "element-11",
    children: [
      {
        title: "Overview",
        path: "/dashboard/lender/overview",
      },
      {
        title: "Applications",
        path: "/dashboard/lender/applications",
      },
      {
        title: "Loan Statistics",
        path: "/dashboard/lender/statistics",
      },
    ],
  },
  {
    heading: "Loans",
  },
  {
    title: "Loan Management",
    icon: "money",
    children: [
      {
        title: "Active Loans",
        path: "/dashboard/lender/loans/active",
      },
      {
        title: "Pending Approvals",
        path: "/dashboard/lender/loans/pending",
      },
      {
        title: "Defaulted Loans",
        path: "/dashboard/lender/loans/defaulted",
      },
    ],
  },
  {
    title: "Reports",
    icon: "bar-chart",
    children: [
      {
        title: "Monthly Reports",
        path: "/dashboard/lender/reports/monthly",
      },
      {
        title: "Yearly Reports",
        path: "/dashboard/lender/reports/yearly",
      },
    ],
  },
  {
    title: "Settings",
    icon: "gear",
    children: [
      {
        title: "Profile Settings",
        path: "/dashboard/lender/settings/profile",
      },
      {
        title: "Billing",
        path: "/dashboard/lender/settings/billing",
      },
    ],
  },
];

export const getMenuConfig = (pathname: string) =>
  pathname.startsWith("/dashboard/user")
    ? MENU_USER
    : pathname.startsWith("/dashboard/broker")
    ? MENU_BROKER
    : MENU_LENDER;
