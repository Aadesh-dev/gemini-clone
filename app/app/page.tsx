"use client";

import { redirect } from "next/navigation";
//import { generateRandomID } from "@/lib/utils";
import { generateId } from 'ai';

export default function AppHome() {
  const chatId = generateId();
  redirect(`/app/${chatId}`);
}
