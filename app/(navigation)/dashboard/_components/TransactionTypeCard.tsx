import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

interface Props {
  title: string;
  numberOfTransactions: number;
  amount: number;
  currency?: string;
}

export default function TransactionTypeCard({
  title,
  numberOfTransactions,
  amount,
  currency,
}: Props) {
  return (
    <Card>
      <CardHeader>
        {title === "Balance" && (
          <CardTitle className="text-3xl font-semibold flex flex-row gap-2 items-center">
            <div className="flex w-10 h-10 bg-purple-600/25 rounded-sm justify-center items-center">
              <Wallet width={24} height={24} className="text-purple-500" />
            </div>
            <div className="flex flex-col">
              <p>{title}</p>
              <p className="text-xs text-muted-foreground">
                {numberOfTransactions} Transactions
              </p>
            </div>
          </CardTitle>
        )}
        {title === "Income" && (
          <CardTitle className="text-3xl font-semibold flex flex-row gap-2 items-center">
            <div className="flex w-10 h-10 bg-emerald-800/25 rounded-sm justify-center items-center">
              <TrendingUp width={24} height={24} className="text-emerald-500" />
            </div>
            <div className="flex flex-col">
              <p>{title}</p>
              <p className="text-xs text-muted-foreground">
                {numberOfTransactions} Transactions
              </p>
            </div>
          </CardTitle>
        )}
        {title === "Expense" && (
          <CardTitle className="text-3xl font-semibold flex flex-row gap-2 items-center">
            <div className="flex w-10 h-10 bg-rose-800/25 rounded-sm justify-center items-center">
              <TrendingDown width={24} height={24} className="text-rose-500" />
            </div>
            <div className="flex flex-col">
              <p>{title}</p>
              <p className="text-xs text-muted-foreground">
                {numberOfTransactions} Transactions
              </p>
            </div>
          </CardTitle>
        )}
      </CardHeader>
      <CardContent className="text-3xl">
        {currency}
        {amount.toFixed(2)}
      </CardContent>
    </Card>
  );
}
