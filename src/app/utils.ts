import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function getRandomItems<T>(arr: T[], numItems: number): T[] {
  const result = [...arr];

  // Fisher-Yates shuffle
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  // Return the first `numItems` elements
  return result.slice(0, numItems);
}

export const checkWordsInString = (str: string, search: string) => {
  const lowercaseStr = str.toLowerCase();
  const wordsInSearch = (search.toLowerCase().match(/\w+/g) || []) as string[];
  // const wordsInStr = (lowercaseStr.match(/\w+/g) || []) as string[];

  for (const word of wordsInSearch) {
    if (!lowercaseStr.includes(word)) return false;
  }
  return true;
};
