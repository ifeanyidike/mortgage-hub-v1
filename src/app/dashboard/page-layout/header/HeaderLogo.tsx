import Link from "next/link";
import { KeenIcon } from "@/app/dashboard-components/keenicons";
import { toAbsoluteUrl } from "@/app/utils";

import { useDemo1Layout } from "..";
import { pageStore } from "@/app/store/pageStore";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";

const HeaderLogo = observer(() => {
  const { megaMenuEnabled } = pageStore;

  const handleSidebarOpen = () => {
    runInAction(() => (pageStore.mobileSidebarOpen = true));
    // setMobileSidebarOpen(true);
  };

  const handleMegaMenuOpen = () => {
    // setMobileMegaMenuOpen(true);
    runInAction(() => (pageStore.mobileMegaMenuOpen = true));
  };

  return (
    <div className="flex gap-1 lg:hidden items-center -ms-1">
      <Link href="/" className="shrink-0">
        <img
          src={toAbsoluteUrl("/media/app/mini-logo.svg")}
          className="max-h-[25px] w-full"
          alt="mini-logo"
        />
      </Link>

      <div className="flex items-center">
        <button
          type="button"
          className="btn btn-icon btn-light btn-clear btn-sm"
          onClick={handleSidebarOpen}
        >
          <KeenIcon icon="menu" />
        </button>

        {megaMenuEnabled && (
          <button
            type="button"
            className="btn btn-icon btn-light btn-clear btn-sm"
            onClick={handleMegaMenuOpen}
          >
            <KeenIcon icon="burger-menu-2" />
          </button>
        )}
      </div>
    </div>
  );
});

export { HeaderLogo };