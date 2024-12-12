import { EditableUserData, UserData } from "@/types/general";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import _ from "lodash";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Documents } from "@/types/db";

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

export function isSubsetMatching(
  child: EditableUserData,
  parent: UserData
): boolean {
  return Object.keys(child).every((key) => {
    const typedKey = key as keyof EditableUserData;
    const childValue = _.get(child, typedKey);
    const parentValue = _.get(parent, typedKey);

    return _.isEqual(childValue, parentValue);
  });
}

export const formatMessageDateIntl = (
  sentAt: Date | null | undefined
): string => {
  if (!sentAt) return "";

  const messageDate = new Date(sentAt);
  const now = new Date();

  const diffMs = now.getTime() - messageDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (diffDays === 0) {
    return `Today at ${timeFormatter.format(messageDate)}`;
  } else if (diffDays === 1) {
    return `Yesterday at ${timeFormatter.format(messageDate)}`;
  } else if (diffDays <= 7) {
    return `${diffDays} days ago`;
  } else if (diffDays <= 30) {
    return `${Math.round(diffDays / 7)} weeks ago`;
  } else if (diffDays <= 365) {
    return `${Math.round(diffDays / 30)} months ago`;
  } else {
    return `${Math.round(diffDays / 365)} years ago`;
    // return dateFormatter.format(messageDate);
  }
  // } else {
  //   return `${dateFormatter.format(messageDate)} at ${timeFormatter.format(
  //     messageDate
  //   )}`;
  // }
};

export const formatMessageDateIntlShort = (
  sentAt: Date | null | undefined
): string => {
  if (!sentAt) return "";

  const messageDate = new Date(sentAt);
  const now = new Date();

  const diffMs = now.getTime() - messageDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (diffDays === 0) {
    return timeFormatter.format(messageDate);
  } else if (diffDays <= 7) {
    return `${diffDays} days ago`;
  } else if (diffDays <= 30) {
    return `${Math.round(diffDays / 7)} weeks ago`;
  } else if (diffDays <= 365) {
    return `${Math.round(diffDays / 30)} months ago`;
  } else {
    return `${Math.round(diffDays / 365)} years ago`;
    // return dateFormatter.format(messageDate);
  }
};

export function isBeforeYesterday(date: Date | undefined): boolean {
  if (!date) return true;
  const now = new Date();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  return new Date(date) < yesterday;
}

export const downPaymentSources = {
  savings: "Personal Savings",
  gift: "Gift from Family/Friends",
  loan: "Loan or Line of Credit",
  rrsp: "RRSP (Home Buyers' Plan)",
  inheritance: "Inheritance",
  investment: "Proceeds from Investments",
  property_sale: "Proceeds from Sale of Property",
  grants: "Government Grants or Assistance",
  business_profits: "Business Profits",
  other: "Other",
};

export const propertyTypes = {
  detached: "Detached House",
  semi_detached: "Semi-Detached House",
  townhouse: "Townhouse (Rowhouse)",
  condo: "Condominium (Condo)",
  duplex: "Duplex",
  triplex: "Triplex",
  bungalow: "Bungalow",
  cottage: "Cottage (Cabin)",
  mobile_home: "Mobile Home",
  tiny_home: "Tiny Home",
  laneway_house: "Laneway House",
  secondary_suite: "Secondary Suite (Basement Suite/In-Law Suite)",
  penthouse: "Penthouse",
  mansion: "Mansion",
  estate: "Estate Home",
  farmhouse: "Farmhouse",
  acreage: "Acreage",
  ranch: "Ranch",
  co_op: "Co-Op Housing",
  heritage_home: "Heritage Home",
  vacation_property: "Vacation Property",
  eco_friendly: "Eco-Friendly Home",
};

export async function streamToBuffer(
  stream: ReadableStream<Uint8Array>
): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const { value, done: streamDone } = await reader.read();
    if (value) chunks.push(value);
    done = streamDone;
  }

  return Buffer.concat(chunks);
}

export const fetchCoordinates = async (location: string) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    location
  )}&format=json&limit=1`;

  try {
    const response = await axios.get(url);
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    } else {
      alert("Location not found");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }
};

export const formatCurrency = (amount: number | undefined | null) =>
  amount
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "CAD",
      }).format(amount)
    : "";

export const handleDownloadAllAsZip = async (
  files: Documents[] | null | undefined,
  username: string,
  setDownloading: (e: boolean) => void
) => {
  if (!files) return;
  const zip = new JSZip();
  setDownloading(true);

  const addFileToZip = async (file: { name: string; url: string }) => {
    try {
      // Fetch file as ArrayBuffer (suitable for binary data)
      const response = await fetch(file.url);
      if (!response.ok) throw new Error(`Failed to fetch ${file.name}`);
      const arrayBuffer = await response.arrayBuffer();
      const ext = file.url.split(".").pop() || "";

      // Add the file to the ZIP archive with binary encoding
      zip.file(`${file.name}${ext ? `.${ext}` : ""}`, arrayBuffer);
    } catch (error) {
      console.error(`Error adding ${file.name} to zip:`, error);
    }
  };

  // Fetch all files and add to the ZIP in parallel
  await Promise.all(files.map((file) => addFileToZip(file)));

  try {
    // Generate the ZIP file as a Blob
    const zipBlob = await zip.generateAsync({ type: "blob" });

    // Save the ZIP file using file-saver
    saveAs(zipBlob, `${username || ""}-files.zip`);
  } catch (error) {
    console.error("Error generating zip file:", error);
  } finally {
    setDownloading(false);
  }
};

export const downloadSingleFile = (file: Documents) => {
  const link = document.createElement("a");
  link.target = "_blank";
  link.href = file.url;
  link.download = file.name || "file";
  link.click();
};
