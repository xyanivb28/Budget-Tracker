"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TransactionDataSchemaType } from "@/schema/transactions";
import { Row } from "@tanstack/react-table";

interface DeleteTransactionDialogProps {
  transaction: TransactionDataSchemaType;
  table: any;
  onDelete: (ids: string[]) => void;
  children: React.ReactNode;
}

export function DeleteTransactionDialog({
  transaction,
  table,
  onDelete,
  children,
}: DeleteTransactionDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete these transactions?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              className="cursor-pointer"
              onClick={async () => {
                const rows = table.getSelectedRowModel().rows;
                console.log("selected rows", rows);

                const rowsId: string[] = rows.map(
                  (row: Row<TransactionDataSchemaType>) => row.original.id
                );

                console.log("rows id", rowsId);

                if (!rowsId.includes(transaction.id)) {
                  rowsId.push(transaction.id);
                }

                await onDelete(rowsId);
              }}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
