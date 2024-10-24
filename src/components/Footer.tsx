import { Facebook, Instagram, X } from "@/app/assets/SvgComponents";
import {
  FacebookFilled,
  InstagramOutlined,
  TwitterOutlined,
  XFilled,
} from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import { BiLogoFacebookCircle, BiLogoInstagram } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

const List1 = [
  { text: "Odignis vendae", href: "#" },
  { text: "Nes dolori cust,", href: "#" },
  { text: "ommoluptas", href: "#" },
  { text: "ipsuntur", href: "#" },
  { text: "Maxim", href: "#" },
  { text: "Oluptat lab id", href: "#" },
  { text: "Maionse quatio", href: "#" },
  { text: "Tempor autempor", href: "#" },
];

const List2 = [
  { text: "Odignis vendae", href: "#" },
  { text: "Nes dolori cust,", href: "#" },
  { text: "ommoluptas", href: "#" },
  { text: "ipsuntur", href: "#" },
  { text: "Maxim", href: "#" },
];

const List3 = [
  { text: "Odignis vendae", href: "#" },
  { text: "Nes dolori cust,", href: "#" },
  { text: "cust", href: "#" },
  { text: "ommoluptas", href: "#" },
  { text: "ipsuntur", href: "#" },
  { text: "Maxim strega poalim nustro", href: "#" },
  { text: "fortuno", href: "#" },
  { text: "Oluptat lab id", href: "#" },
  { text: "Maionse quatio", href: "#" },
  { text: "Tempor autempor", href: "#" },
];

const Footer = () => {
  return (
    <footer className="px-32 py-16 max-lg:px-16 bg-[#3EBA97] flex flex-col gap-14">
      <h3 className="font-bold text-3xl ">Mortgage Hub</h3>
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-y-12 gap-x-8">
        <ListItem title="Num quist" list={List1} />
        <ListItem title="Dicesto um tonour" list={List2} />
        <ListItem title="Neoanoma" list={List3} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <BiLogoFacebookCircle size={35} />
          <FaXTwitter size={35} />
          <BiLogoInstagram size={35} />
        </div>
        <span className="font-semibold text-2xl">&copy; Mortgage Hub 2024</span>
        <p className="font-medium tex-xl">
          Odignis vendae nes dolori cust, ommoluptas ipsuntur maxim oluptat lab
          id maionse quatio. Vendae nes dolori cust, sit ateum.
        </p>
      </div>
    </footer>
  );
};

type Props = {
  title: string;
  list: Record<"text" | "href", string>[];
};
const ListItem = (props: Props) => {
  const { title, list } = props;
  return (
    <div className="flex flex-col gap-8">
      <h4 className="font-semibold text-2xl">{title}</h4>
      <ul className="flex flex-col gap-4">
        {list.map((l) => (
          <li key={l.text}>
            <Link
              className="border-b border-black text-xl font-medium"
              href={l.href}
            >
              {l.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
