import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function page() {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col p-4 border-t border-b border-separate">
        <h1 className="text-2xl font-semibold">Manage</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings
        </p>
      </header>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>
            Set your default currencey for transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>
    </div>
  );
}
