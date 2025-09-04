import Logo from "@/components/Logo";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SetupCurrencyAndDefaultAccount from "./_components/SetupCurrencyAndDefaultAccount";

export default async function page() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.findFirst({
    where: {
      userId: user.id,
    },
  });

  //if user settings and default account (in userSettings) exist, redirect to dashboard.
  if (userSettings) {
    redirect("/dashboard");
  }

  return (
    <div className="container flex max-w-2xl flex-col items-center justify-between gap-4">
      <div>
        <h1 className="text-center text-3xl">
          Welcome, <span className="ml-2 font-bold">{user.firstName}! 👋</span>
        </h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          let&apos;s get started by setting up your currency and account
        </h2>
        <h3 className="mt-2 text-center text-sm text-muted-foreground"></h3>
      </div>

      <Separator />
      <SetupCurrencyAndDefaultAccount />
      <Separator />

      <div className="mt-8">
        <Logo />
      </div>
    </div>
  );
}
