import { makeAutoObservable } from "mobx";

class PageStore {
  public layout = {
    sidebar: { collapse: false, fixed: false, theme: "light" },
    header: { fixed: false },
  };
  public megaMenuEnabled = false;
  public headerSticky = false;
  public mobileSidebarOpen = false;
  public mobileMegaMenuOpen = false;
  public sidebarMouseLeave = false;

  constructor() {
    makeAutoObservable(this);
  }

  // public setSidebarMouseLeave(state: boolean) {
  //   this.sidebarMouseLeave = state;
  // }
  // public setMobileMegaMenuOpen(open: boolean) {
  //   this.mobileMegaMenuOpen = open;
  // }
  // public setMobileSidebarOpen(open: boolean) {
  //   this.mobileSidebarOpen = open;
  // }
  // public setMegaMenuEnabled(enabled: boolean) {
  //   this.megaMenuEnabled = enabled;
  // }
  // public setSidebarCollapse(collapse: boolean) {
  //   this.layout.sidebar.collapse = collapse;
  // }
  // public setSidebarTheme(mode: string) {
  //   this.layout.sidebar.theme = mode;
  // }
}

export const pageStore = new PageStore();
