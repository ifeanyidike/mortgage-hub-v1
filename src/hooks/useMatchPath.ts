import { usePathname, useRouter } from "next/navigation";

interface IUseMatchPath {
  match: boolean;
  isExternal: boolean;
}

const useMatchPath = (
  path: string,
  mode: "default" | "full" = "default"
): IUseMatchPath => {
  const pathname = usePathname();
  let match = false;

  if (mode === "default") {
    // Exact match
    match = pathname === path;
  } else if (mode === "full") {
    // Partial match
    match = pathname.startsWith(path);
  }

  return {
    match,
    isExternal: path.startsWith("http") || path.startsWith("//"),
  };
};

export { useMatchPath };
