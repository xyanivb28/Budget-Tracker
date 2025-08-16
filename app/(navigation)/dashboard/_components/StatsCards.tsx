"use client";
import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/route";
import { UserSettings } from "@/lib/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { ReactNode, useCallback, useMemo } from "react";
import { GetFormatterForCurrency } from "@/lib/helpers";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import CountUp from "react-countup";

interface Props {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}

export default function StatsCards({ userSettings, from, to }: Props) {
  console.log("from", from);
  console.log("to", to);

  const { data, isFetching } = useQuery<GetBalanceStatsResponseType>({
    queryKey: ["overview", "stats", from.toISOString(), to.toISOString()],
    queryFn: async () => {
      const res = await fetch(
        `/api/stats/balance?from=${from.toISOString()}&to=${to.toISOString()}`
      );
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const income = data?.income || 0;
  const expense = data?.expense || 0;
  const expensesTransactionsAmount = data?.expensesTransactionsAmount || 0;
  const incomesTransactionsAmount = data?.incomesTransactionsAmount || 0;

  const balance = income - expense;
  const balanceTransactionAmount =
    incomesTransactionsAmount + expensesTransactionsAmount;

  return (
    <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap py-4">
      <SkeletonWrapper isLoading={isFetching}>
        <StatCard
          formatter={formatter}
          title="Balance"
          value={balance}
          numberOfTransactions={balanceTransactionAmount}
          icon={
            <Wallet className="h-12 w-12 items-center rounded-lg p-2 text-purple-500 bg-purple-400/10" />
          }
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={isFetching}>
        <StatCard
          formatter={formatter}
          title="Income"
          value={income}
          numberOfTransactions={incomesTransactionsAmount}
          icon={
            <TrendingUp className="h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
          }
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={isFetching}>
        <StatCard
          formatter={formatter}
          title="Expense"
          value={expense}
          numberOfTransactions={expensesTransactionsAmount}
          icon={
            <TrendingDown className="h-12 w-12 items-center rounded-lg p-2 text-rose-500 bg-rose-400/10" />
          }
        />
      </SkeletonWrapper>
    </div>
  );
}

function StatCard({
  formatter,
  value,
  title,
  icon,
  numberOfTransactions,
}: {
  formatter: Intl.NumberFormat;
  icon: ReactNode;
  title: string;
  value: number;
  numberOfTransactions: number;
}) {
  const formatFn = useCallback(
    (value: number) => {
      return formatter.format(value);
    },
    [formatter]
  );

  return (
    <Card className="flex flex-col h-fit w-full gap-2 p-4">
      <div className="flex flex-row gap-2 items-center">
        {icon}
        <div className="flex flex-col items-start">
          <p className="text-xl">{title}</p>
          <p className="text-muted-foreground">
            {numberOfTransactions} Transactions
          </p>
        </div>
      </div>
      <CountUp
        preserveValue
        redraw={false}
        end={value}
        decimals={2}
        formattingFn={formatFn}
        className="text-2xl"
      />
    </Card>
  );
}
