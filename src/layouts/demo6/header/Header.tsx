import { KeenIcon } from "@/app/dashboard-components";
import { Container } from "@/app/dashboard-components/container";
import { toAbsoluteUrl } from "@/app/utils";
import Link from "next/link";
import { useDemo6Layout } from "..";

const Header = () => {
  const { setMobileSidebarOpen } = useDemo6Layout();

  const handleMobileSidebarOpen = () => {
    setMobileSidebarOpen(true);
  };

  return (
    <header className="flex lg:hidden items-center fixed z-10 top-0 start-0 end-0 shrink-0 bg-[--tw-page-bg] dark:bg-[--tw-page-bg-dark] h-[--tw-header-height]">
      <Container className="flex items-center justify-between flex-wrap gap-3">
        <Link href="/">
          <img
            src={toAbsoluteUrl("/media/app/mini-logo-gray.svg")}
            className="dark:hidden min-h-[30px]"
          />
          <img
            src={toAbsoluteUrl("/media/app/mini-logo-gray-dark.svg")}
            className="hidden dark:block min-h-[30px]"
          />
        </Link>

        <button
          onClick={handleMobileSidebarOpen}
          className="btn btn-icon btn-light btn-clear btn-sm me-2"
        >
          <KeenIcon icon="menu" />
        </button>
      </Container>
    </header>
  );
};

export { Header };
