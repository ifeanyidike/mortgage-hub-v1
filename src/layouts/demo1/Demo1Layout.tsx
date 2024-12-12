import useBodyClasses from "@/hooks/useBodyClasses";
import { Demo1LayoutProvider } from "@/layouts/demo1";
import { Main } from "./main";
const Demo1Layout = ({ children }: { children: React.ReactNode }) => {
  // Using the useBodyClasses hook to set background styles for light and dark modes
  useBodyClasses(`
    [--tw-page-bg:#fefefe]
    [--tw-page-bg-dark:var(--tw-dark-inverse-dark)]
    demo1 
    sidebar-fixed 
    header-fixed 
   
  `);
  //[--tw-page-bg-dark:var(--tw-coal-500)]
  // bg-[--tw-page-bg]
  // dark:bg-[--tw-page-bg-dark]

  return (
    <Demo1LayoutProvider>
      <Main> {children}</Main>
    </Demo1LayoutProvider>
  );
};

export { Demo1Layout };
