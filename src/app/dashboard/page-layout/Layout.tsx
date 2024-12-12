import useBodyClasses from "@/hooks/useBodyClasses";
import { Demo1LayoutProvider } from "@/layouts/demo1";
import { Main } from "./main";
import { observer } from "mobx-react-lite";
const Demo1Layout = observer(({ children }: { children: React.ReactNode }) => {
  // Using the useBodyClasses hook to set background styles for light and dark modes
  useBodyClasses(`
    [--tw-page-bg:#fefefe]
    [--tw-page-bg-dark:var(--tw-coal-500)]
    demo1 
    sidebar-fixed 
    header-fixed 
    bg-[--tw-page-bg]
    dark:bg-[--tw-page-bg-dark]
   
  `);
  // [--tw-page-bg-dark:var(--tw-coal-500)]
  // bg-[--tw-page-bg]
  // dark:bg-[--tw-page-bg-dark]
  //[--tw-page-bg-dark:var(--tw-dark-inverse-dark)]

  return (
    <Demo1LayoutProvider>
      <Main> {children}</Main>
    </Demo1LayoutProvider>
  );
});

export { Demo1Layout };
