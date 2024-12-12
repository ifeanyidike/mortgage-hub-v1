"use client";
import { PropsWithChildren } from "react";

import {
  LayoutProvider,
  LoadersProvider,
  MenusProvider,
  SettingsProvider,
  SnackbarProvider,
} from "@/providers";

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
  return (
    <SnackbarProvider>
      <SettingsProvider>
        <LayoutProvider>
          <LoadersProvider>
            <MenusProvider>{children}</MenusProvider>
          </LoadersProvider>
        </LayoutProvider>
      </SettingsProvider>
    </SnackbarProvider>
  );
};

export { ProvidersWrapper };
