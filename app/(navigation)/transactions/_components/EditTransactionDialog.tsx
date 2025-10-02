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
import {
  EditTransactionSchema,
  EditTransactionSchemaType,
  TransactionDataSchemaType,
} from "@/schema/transactions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CategoryPicker from "../../dashboard/_components/CategoryPicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TransactionType } from "@/lib/types";
import { DateToUTCDateStartOfDay } from "@/lib/helpers";
import { EditTransaction } from "../../_actions/transactions";

interface EditTransactionDialogProps {
  transaction: TransactionDataSchemaType;
  children: React.ReactNode;
}

export function EditTransactionDialog({
  transaction,
  children,
}: EditTransactionDialogProps) {
  const [transactionType, setTransactionType] = useState<TransactionType>(
    transaction.type
  );

  const queryClient = useQueryClient();

  const formDefaultValues = {
    id: transaction.id,
    description: transaction.description ?? "",
    date: transaction.date,
    category: `${transaction.category.split(" ")[1]}`,
    amount: transaction.amount ?? 0,
    type: transaction.type ?? "income",
  };

  const form = useForm<EditTransactionSchemaType>({
    resolver: zodResolver(
      EditTransactionSchema
    ) as Resolver<EditTransactionSchemaType>,
    defaultValues: formDefaultValues,
  });

  const handleCategoryChange = useCallback(
    (value: string) => {
      form.setValue("category", value);
    },
    [form]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: EditTransaction,
    onMutate: () => {
      toast.loading("Modifying transaction...", {
        id: "edit-transaction",
      });
    },
    onSuccess: () => {
      toast.success("Transaction modified successfully!", {
        id: "edit-transaction",
      });

      queryClient.invalidateQueries({
        queryKey: ["overview"],
        exact: false,
      });
    },
    onError: () => {
      toast.error("There was an error modifying the transaction.", {
        id: "edit-transaction",
      });
    },
  });

  const onSubmit = useCallback(
    (data: EditTransactionSchemaType) => {
      mutate({
        ...data,
        date: DateToUTCDateStartOfDay(data.date),
      });
    },
    [mutate]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Transaction description (optional)
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Transaction amount (required)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={(value: TransactionType) => {
                      field.onChange(value);
                      setTransactionType(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="income">income</SelectItem>
                      <SelectItem value="expense">expense</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Transaction type (required)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row items-start justify-between gap-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <CategoryPicker
                        {...field}
                        type={
                          transactionType === "income" ? "income" : "expense"
                        }
                        onChange={handleCategoryChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Transaction Category (required)
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Transaction date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[200px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value as Date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value as Date | undefined}
                          onSelect={(date) => field.onChange(date)}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select a date for this transaction
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={isPending}
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              className="cursor-pointer"
            >
              {isPending ? <Loader2 className="animate-spin " /> : "Save"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
