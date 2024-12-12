import { TMenuBreadcrumbs, TMenuConfig } from "../types";

const useMenuBreadcrumbs = (
  pathname: string,
  items: TMenuConfig | null
): TMenuBreadcrumbs => {
  pathname = pathname.trim();

  const findParents = (items: TMenuConfig | null): TMenuBreadcrumbs => {
    if (!items) return [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.path && pathname === item.path) {
        // Exact match
        return [
          {
            title: item.title,
            path: item.path,
            active: true,
          },
        ];
      } else if (item.path && pathname.startsWith(item.path)) {
        // Partial match
        return [
          {
            title: item.title,
            path: item.path,
            active: pathname === item.path,
          },
        ];
      } else if (item.children) {
        const parents = findParents(item.children as TMenuConfig);

        if (parents.length > 0) {
          return [item, ...parents];
        }
      }
    }

    return [];
  };

  return findParents(items);
};

export { useMenuBreadcrumbs };
