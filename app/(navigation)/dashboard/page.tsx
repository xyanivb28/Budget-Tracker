import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import CreateTransactionDialog from "./_components/CreateTransactionDialog";
import prisma from "@/lib/prisma";
import Overview from "./_components/Overview";
import { currentUser } from "@clerk/nextjs/server";

async function DashboardPage() {
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
    <div className="flex flex-col">
      <header className="flex md:flex-row flex-col border-t-1 border-b-1 border-border h-fit w-full items-center justify-between p-4 gap-4">
        <h1 className="text-2xl">Hello, {user.firstName} 👋</h1>
        <div className="flex flex-row gap-4">
          <CreateTransactionDialog
            trigger={
              <Button className="rounded-[6px] border border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 cursor-pointer">
                New income
              </Button>
            }
            type="income"
          />
          <CreateTransactionDialog
            trigger={
              <Button className="rounded-[6px] border border-rose-500 bg-rose-950 text-white hover:bg-rose-700 cursor-pointer">
                New expense
              </Button>
            }
            type="expense"
          />
        </div>
      </header>
      <Overview userSettings={userSettings} />
    </div>
  );
}

export default DashboardPage;
