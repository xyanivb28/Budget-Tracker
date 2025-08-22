"use client";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import { UserSettings } from "@/lib/generated/prisma";
import { Card } from "@/components/ui/card";
import { ArrowRightLeft } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { TransactionDataSchemaType } from "@/schema/transactions";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { cn } from "@/lib/utils";

interface Props {
  userSettings: UserSettings;
}

export default function TransactionTable({ userSettings }: Props) {
  const { data, isFetching } = useQuery<TransactionDataSchemaType>({
    queryKey: ["overview", "transactions"],
    queryFn: async () => {
      const res = await fetch("/api/transactions");
      if (!res.ok) {
        throw new Error("Failed to fetch transactions");
      }
      return res.json();
    },
  });

  const columns = getColumns(userSettings.currency);

  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="container mx-auto">
      <SkeletonWrapper isLoading={isFetching}>
        <Card
          className={cn("p-4 gap-4 ", !hasData ? "min-h-64 flex flex-col" : "")}
        >
          <header className="flex flex-row justify-between">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-row gap-2 items-center justify-between w-full">
                <div className="flex flex-row gap-2 ">
                  <ArrowRightLeft />
                  <p className="text-lg font-normal">Transactions</p>
                </div>
                <Link
                  href="/transactions"
                  className="underline font-medium flex items-start gap-1 text-muted-foreground hover:text-primary mr-2"
                >
                  Show more &#8594;
                </Link>
              </div>
              <p className="text-muted-foreground">
                Here are your recent transactions
              </p>
            </div>
          </header>
          {hasData && <DataTable columns={columns} data={data} />}
          {!hasData && (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center h-full">
              <h1 className="text-2xl text-primary">
                No recent transactions were found
              </h1>
              <p className="text-muted-foreground text-sm">
                Tip: try adding a new transaction
              </p>
            </div>
          )}
        </Card>
      </SkeletonWrapper>
    </div>
  );
}
