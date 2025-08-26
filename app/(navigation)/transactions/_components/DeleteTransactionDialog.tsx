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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DeleteTransaction } from "../../_actions/transactions";

interface DeleteTransactionDialogProps {
  transaction: TransactionDataSchemaType;
  table: any;
  children: React.ReactNode;
}

export function DeleteTransactionDialog({
  transaction,
  table,
  children,
}: DeleteTransactionDialogProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
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
              disabled={isPending}
              onClick={async () => {
                const rows = table.getSelectedRowModel().rows;

                const rowsId: string[] = rows.map(
                  (row: Row<TransactionDataSchemaType>) => row.original.id
                );

                if (!rowsId.includes(transaction.id)) {
                  rowsId.push(transaction.id);
                }

                mutate(rowsId);
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
