import { Tooltip } from "antd";
import Link from "next/link";
import React from "react";
import { BiLogoFacebookCircle, BiLogoInstagram } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

const List1 = [
  {
    text: "About Us",
    href: "#",
    placeholder: "Learn more about Mortgage Hub's background and values",
  },
  {
    text: "Our Mission",
    href: "#",
    placeholder: "Discover our commitment to making homeownership accessible",
  },
  {
    text: "Careers",
    href: "#",
    placeholder: "Explore job opportunities with us",
  },
  {
    text: "Contact Us",
    href: "#",
    placeholder: "Reach out to our support or corporate teams",
  },
  {
    text: "Privacy Policy",
    href: "#",
    placeholder: "Read about how we protect your data",
  },
  {
    text: "Terms of Use",
    href: "#",
    placeholder: "Review our service agreement and policies",
  },
  {
    text: "Security",
    href: "#",
    placeholder: "Learn about measures we take to keep your data safe",
  },
  {
    text: "Accessibility",
    href: "#",
    placeholder: "Information on site accessibility for all users",
  },
];

const List2 = [
  {
    text: "Mortgage Guide",
    href: "#",
    placeholder: "Your complete guide to understanding mortgages",
  },
  {
    text: "Lender Directory",
    href: "#",
    placeholder: "A list of trusted mortgage lenders",
  },
  {
    text: "Help Center",
    href: "#",
    placeholder: "Answers to frequently asked questions",
  },
  { text: "Blog", href: "#", placeholder: "Read industry insights and news" },
  {
    text: "Calculators",
    href: "#",
    placeholder: "Use tools to calculate mortgage costs",
  },
];

const List3 = [
  {
    text: "Loan Types",
    href: "#",
    placeholder: "Explore the various types of loans available",
  },
  {
    text: "First-Time Buyers",
    href: "#",
    placeholder: "Information tailored for first-time homebuyers",
  },
  {
    text: "Refinancing",
    href: "#",
    placeholder: "Options and tips for refinancing your mortgage",
  },
  {
    text: "Mortgage Rates",
    href: "#",
    placeholder: "View current mortgage interest rates",
  },
  {
    text: "Credit Score Help",
    href: "#",
    placeholder: "Resources to improve or manage your credit score",
  },
  {
    text: "Down Payment Aid",
    href: "#",
    placeholder: "Assistance options for down payments",
  },
  {
    text: "Homebuyer Tips",
    href: "#",
    placeholder: "Advice and tips for prospective homeowners",
  },
  {
    text: "Learning Hub",
    href: "#",
    placeholder: "Educational resources for understanding mortgages",
  },
  {
    text: "Webinars",
    href: "#",
    placeholder: "Register for expert-led webinars",
  },
  {
    text: "Contact Support",
    href: "#",
    placeholder: "Connect with our support team for help",
  },
];

const Footer = () => {
  return (
    <footer className="px-32 py-16 max-lg:px-16 bg-[#3EBA97] flex flex-col gap-14">
      <h3 className="font-bold text-3xl ">Mortgage Hub</h3>
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-y-12 gap-x-8">
        <ListItem title="Company" list={List1} />
        <ListItem title="Resources" list={List2} />
        <ListItem title="Popular Links" list={List3} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <BiLogoFacebookCircle size={35} />
          <FaXTwitter size={35} />
          <BiLogoInstagram size={35} />
        </div>
        <span className="font-semibold text-2xl">&copy; Mortgage Hub 2024</span>
        <p className="font-medium tex-xl">
          Mortgage Hub is committed to secure and supportive home financing.
        </p>
      </div>
    </footer>
  );
};

type Props = {
  title: string;
  list: Record<"text" | "href" | "placeholder", string>[];
};
const ListItem = (props: Props) => {
  const { title, list } = props;

  return (
    <div className="flex flex-col gap-8">
      <h4 className="font-semibold text-2xl">{title}</h4>
      <ul className="flex flex-col gap-4">
        {list.map((l) => (
          <li key={l.text}>
            <Tooltip placement="top" title={l.placeholder}>
              <Link
                className="border-b border-black text-xl font-medium"
                href={l.href}
              >
                {l.text}
              </Link>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
