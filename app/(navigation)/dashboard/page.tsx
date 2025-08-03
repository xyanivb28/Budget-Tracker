"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CreateTransactionDialog from "./_components/CreateTransactionDialog";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex">
      <header className="flex md:flex-row flex-col border-t-1 border-b-1 border-border h-fit w-full items-center justify-between p-4 gap-4">
        <h1 className="text-2xl">Hello, {user.firstName} 👋</h1>
        <div className="flex flex-row gap-4">
          <CreateTransactionDialog
            trigger={
              <Button className="border border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 cursor-pointer">
                New income
              </Button>
            }
            type="income"
          />

          <CreateTransactionDialog
            trigger={
              <Button className="border border-rose-500 bg-rose-950 text-white hover:bg-rose-700 cursor-pointer">
                New expense
              </Button>
            }
            type="expense"
          />
        </div>
      </header>
    </div>
  );
}
