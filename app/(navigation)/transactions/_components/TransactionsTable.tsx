"use client";

import { UserSettings } from "@/lib/generated/prisma";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import { ArrowRightLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import CreateTransactionDialog from "../../dashboard/_components/CreateTransactionDialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { differenceInDays, startOfMonth } from "date-fns";
import { useState } from "react";
import { Currencies } from "@/lib/currencies";
import { TransactionDataSchemaType } from "@/schema/transactions";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { DeleteTransaction, EditTransaction } from "../_actions/transactions";

interface Props {
  userSettings: UserSettings;
}

export default function TransactionsTable({ userSettings }: Props) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const queryClient = useQueryClient();

  // Fetch transactions data query from api
  const { data, isFetching } = useQuery<TransactionDataSchemaType[]>({
    queryKey: [
      "overview",
      "transactions",
      dateRange.from.toISOString(),
      dateRange.to.toISOString(),
    ],
    queryFn: async () => {
      const res = await fetch(
        `/api/transactions?from=${dateRange.from.toISOString()}&to=${dateRange.to.toISOString()}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch transactions");
      }
      return res.json();
    },
  });

  // delete transactions(s) action using react-query useMutation
  const deleteMutation = useMutation({
    mutationFn: DeleteTransaction,
    onMutate: () => {
      return toast.loading("Deleting transaction(s)...", {
        id: "delete-transaction",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["overview", "transactions"] });
      toast.success("Transaction(s) deleted", {
        id: "delete-transaction",
      });
    },
    onError: () => {
      toast.error("Failed to delete transaction(s)", {
        id: "delete-transaction",
      });
    },
  });

  // delete transaction action using react-query useMutation
  const editMutation = useMutation({
    mutationFn: async (id: string) => {
      await EditTransaction(id);
    },
  });

  const columns = getColumns(
    userSettings.currency,
    deleteMutation.mutateAsync,
    editMutation.mutateAsync
  );

  const categories = Array.from(
    new Set(data?.map((transaction) => transaction.category))
  ).map((category) => ({
    label: category,
    value: category,
  }));

  const locale = Currencies.find(
    (c) => c.value === userSettings.currency
  )?.locale;

  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-4">
        <p className="text-muted-foreground text-md">Select a date range:</p>
        <DateRangePicker
          onUpdate={(values) => {
            const { from, to } = values.range;
            if (!from || !to) return;
            if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
              toast.error(
                `The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`
              );
              return;
            }

            setDateRange({ from, to });
          }}
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          align="start"
          locale={locale}
          showCompare={false}
        />
      </div>
      <div className="container mx-auto">
        <Card className="p-4 gap-4">
          <header className="flex flex-col md:flex-row md:justify-between gap-2">
            <div className="flex flex-row gap-2 items-center">
              <ArrowRightLeft />
              <p className="text-lg font-normal">Transactions</p>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <CreateTransactionDialog
                trigger={
                  <Button
                    size={"sm"}
                    className="border border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 cursor-pointer"
                  >
                    Add Income
                  </Button>
                }
                type={"income"}
              />
              <CreateTransactionDialog
                trigger={
                  <Button
                    size={"sm"}
                    className="border border-rose-500 bg-rose-950 text-white hover:bg-rose-700 cursor-pointer"
                  >
                    Add Expense
                  </Button>
                }
                type={"expense"}
              />
            </div>
          </header>
          <SkeletonWrapper isLoading={isFetching}>
            <div className="min-h-64 flex-1 flex flex-col">
              {hasData && (
                <DataTable
                  columns={columns}
                  data={data}
                  categories={categories}
                />
              )}
              {!hasData && (
                <div className="flex flex-col flex-1 items-center justify-center gap-2 text-center h-full">
                  <h1 className="text-2xl text-primary">
                    No transactions were found in this date range
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Tip: try adding a new transaction
                  </p>
                </div>
              )}
            </div>
          </SkeletonWrapper>
        </Card>
      </div>
    </div>
  );
}
