import { TMenuConfig, MenuSub } from "@/app/dashboard-components/menu";
import { MegaMenuSubDropdown } from "./components";

const MegaMenuSubHelp = (items: TMenuConfig) => {
  const helpItem = items[5];

  return (
    <MenuSub className="menu-default py-2.5 w-full max-w-[220px]">
      {helpItem.children && MegaMenuSubDropdown(helpItem.children)}
    </MenuSub>
  );
};

export { MegaMenuSubHelp };
