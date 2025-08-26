"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { TransactionDataSchemaType } from "@/schema/transactions";
import { EditTransactionDialog } from "./EditTransactionDialog";
import { DeleteTransactionDialog } from "./DeleteTransactionDialog";

interface TransactionActionsProps {
  transaction: TransactionDataSchemaType;
  table: any;
}

export function TransactionActions({
  transaction,
  table,
}: TransactionActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <EditTransactionDialog transaction={transaction}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="cursor-pointer"
          >
            Edit
          </DropdownMenuItem>
        </EditTransactionDialog>
        <DeleteTransactionDialog transaction={transaction} table={table}>
          <DropdownMenuItem
            className="text-red-500 cursor-pointer"
            onSelect={(e) => e.preventDefault()}
          >
            Delete
          </DropdownMenuItem>
        </DeleteTransactionDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
