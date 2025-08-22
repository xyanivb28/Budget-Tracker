import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import TransactionsTable from "./_components/TransactionsTable";

export default async function page() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  let userSettings = null;

  try {
    userSettings = await prisma.userSettings.findUnique({
      where: { userId: user.id },
    });
  } catch (err) {
    console.error("Failed to fetch user settings:", err);
    throw new Error("Database connection failed");
  }

  if (!userSettings) {
    redirect("/wizard");
  }

  return (
    <main className="p-4">
      <TransactionsTable userSettings={userSettings} />
    </main>
  );
}
