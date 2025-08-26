"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Currencies } from "@/lib/currencies";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { TransactionDataSchemaType } from "@/schema/transactions";
import { cn } from "@/lib/utils";
import { TransactionActions } from "./TransactionActions";

export const columns: ColumnDef<TransactionDataSchemaType>[] = [];

export function getColumns(
  userCurrency: string | undefined
): ColumnDef<TransactionDataSchemaType>[] {
  const currencyObj =
    Currencies.find((c) => c.value === userCurrency) ?? Currencies[0];
  const { locale, value: currency } = currencyObj;

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" className="ps-2" />
      ),
      cell: ({ row }) => {
        const date: Date = row.getValue("date");
        const formatted = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(new Date(date));

        return <span>{formatted}</span>;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "type",
      header: "Type",
      filterFn: (row, columnId, filterValues) => {
        if (!filterValues?.length) return true;
        return filterValues.includes(row.getValue(columnId));
      },
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
      filterFn: (row, columnId, filterValues) => {
        if (!filterValues?.length) return true;
        return filterValues.includes(row.getValue(columnId));
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Amount"
          className="place-self-end"
        />
      ),
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
    {
      id: "actions",
      cell: ({ row, table }) => (
        <TransactionActions transaction={row.original} table={table} />
      ),
    },
  ];
}
