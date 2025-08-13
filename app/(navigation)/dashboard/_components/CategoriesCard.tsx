"use client";
import { UserSettings } from "@/lib/generated/prisma";
import CategoriesTreemap from "./CategoriesTreemap";
import { Card } from "@/components/ui/card";
import { Blocks } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

interface Props {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}

export default function CategoriesCard({ userSettings, from, to }: Props) {
  const [selected, setSelected] = useState<"income" | "expense">("income");

  return (
    <Card className="flex flex-col items-start w-full sm:w-fit h-fit p-2 gap-2">
      <header className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-2 self-center">
          <Blocks width={24} height={24} className="text-foreground" />
          <p className="text-foreground text-lg font-normal">Categories</p>
        </div>
        <div className="flex flex-row gap-2">
          <Toggle
            pressed={selected === "income"}
            onPressedChange={() => setSelected("income")}
          >
            Income
          </Toggle>
          <Separator orientation="vertical" className="h-6 bg-border" />
          <Toggle
            pressed={selected === "expense"}
            onPressedChange={() => setSelected("expense")}
          >
            Expense
          </Toggle>
        </div>
      </header>
      <CategoriesTreemap
        selected={selected}
        userSettings={userSettings}
        from={from}
        to={to}
      />
    </Card>
  );
}
