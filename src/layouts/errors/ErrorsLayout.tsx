// import { Outlet } from 'react-router-dom';
import { PropsWithChildren } from "react";
import { ErrorsLayoutProvider } from "./ErrorsLayoutProvider";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-center grow h-screen">
      {children}
    </div>
  );
};

const ErrorsLayout = ({ children }: PropsWithChildren) => (
  <ErrorsLayoutProvider>
    <Layout>{children}</Layout>
  </ErrorsLayoutProvider>
);

export { ErrorsLayout };
