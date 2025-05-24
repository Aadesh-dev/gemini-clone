import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ERROR HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    // Native JavaScript error (e.g., TypeError, RangeError)
    console.error(`[Error]: ${error.message}`);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    // String error message
    console.error(`[Error]: ${error}`);
    throw new Error(`Error: ${error}`);
  } else {
    // Unknown or unexpected error type
    try {
      console.error(`[Unknown Error]:`, JSON.stringify(error, null, 2));
      throw new Error(`Unknown error: ${JSON.stringify(error)}`);
    } catch (serializationError) {
      console.error(`[Unknown Error]:`, error);
      throw new Error("An unknown error occurred, and it could not be serialized.");
    }
  }
};

export const generateRandomID = (length: number = 10): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let userId = "";
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    userId += chars[bytes[i] % chars.length];
  }
  return userId;
};

export const fixBrokenMarkdownTables = (text: string): string => {
  return text.replace(/(\|[^|\n]+\|)(?=\s*\|)/g, '$1\n');
}

