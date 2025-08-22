"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TransactionDataSchemaType } from "@/schema/transactions";

interface EditTransactionDialogProps {
  transaction: TransactionDataSchemaType;
  onEdit: (id: string) => void;
  children: React.ReactNode; // trigger
}

export function EditTransactionDialog({
  transaction,
  onEdit,
  children,
}: EditTransactionDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        {/* Replace with your custom form */}
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Placeholder form for editing transaction <b>{transaction.id}</b>.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => onEdit(transaction.id)}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
