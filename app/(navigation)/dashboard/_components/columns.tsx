"use client";

import { Currencies } from "@/lib/currencies";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionDataSchemaType } from "@/schema/transactions";
import { cn } from "@/lib/utils";

// This type is used to define the shape of our data.

export function getColumns(
  userCurrency: string | undefined
): ColumnDef<TransactionDataSchemaType>[] {
  const currencyObj =
    Currencies.find((c) => c.value === userCurrency) ?? Currencies[0];
  const { locale, value: currency } = currencyObj;

  return [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date: Date = row.getValue("date");
        const formatted = new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(new Date(date));

        return <span>{formatted}</span>;
      },
    },

    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type: "income" | "expense" = row.getValue("type");

        const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

        return (
          <div className="flex flex-row gap-2 items-center">
            <div
              className={cn(
                "rounded-full w-2 h-2",
                type === "income" ? "bg-emerald-500" : "bg-rose-500"
              )}
            />
            <p>{capitalizedType}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <div className="w-full flex justify-end">
            <Button
              variant="ghost"
              className="flex items-center gap-1"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Amount
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat(locale, {
          style: "currency",
          currency,
        }).format(amount);
        return (
          <div className="w-full flex justify-end font-medium pe-2">
            {formatted}
          </div>
        );
      },
    },
  ];
}
