import { redirect } from 'next/navigation'

export default function LogoutPage() {
  // Can also clear cookies or client storage here
  redirect("/app");
}