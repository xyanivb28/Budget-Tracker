"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleAlert } from "lucide-react";
import { redirect } from "next/navigation";

export default function error() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="w-100">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex flex-row gap-4 items-center">
            <div className="rounded-full flex items-center justify-center w-[48px] h-[48px] bg-rose-200">
              <CircleAlert height={24} width={24} className="text-rose-500" />
            </div>
            Error loading dashboard
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent className="flex flex-row gap-4 justify-between">
          <p>Something went wrong...</p>
          <Button className="cursor-pointer" onClick={() => redirect("/")}>
            Return home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
