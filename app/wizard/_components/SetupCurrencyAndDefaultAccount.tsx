"use client";
import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Currency } from "@/lib/currencies";
import {
  defaultAccountSchema,
  defaultAccountSchemaType,
} from "@/schema/accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { createUserSettings } from "../_actions/userSettings";
import { toast } from "sonner";

const defaultCurrency: Currency = {
  value: "USD",
  label: "$ Dollar",
  locale: "en-US",
};

export default function SetupCurrencyAndDefaultAccount() {
  const [selectedOption, setSelectedOption] = useState<Currency | null>(
    defaultCurrency
  );

  const form = useForm<defaultAccountSchemaType>({
    resolver: zodResolver(defaultAccountSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["user-settings"],
    mutationFn: createUserSettings,
    onMutate: () => {
      toast.loading("Applying changes...", { id: "user-settings" });
    },
    onSuccess: () => {
      toast.success("Account created succesfully!", { id: "user-settings" });
    },
    onError: () => {
      toast.error("Something went wrong, try again later.", {
        id: "user-settings",
      });
    },
  });

  const onSubmit = useCallback(
    (values: defaultAccountSchemaType) => {
      if (!selectedOption) return;

      mutate({ account: values, selectedCurrency: selectedOption });
    },
    [mutate, selectedOption]
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Currency</CardTitle>
        <CardDescription>
          Set your default currencey for transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CurrencyComboBox
          selectedOption={selectedOption}
          onSelectedOptionChange={setSelectedOption}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your account display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full cursor-pointer">
              I&apos;m done! Take me to the dashboard
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
