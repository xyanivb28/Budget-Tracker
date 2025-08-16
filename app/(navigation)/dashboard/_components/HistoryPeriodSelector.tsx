"use client";
import { GetHistoryPeriodsResponseType } from "@/app/api/stats/history-periods/route";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Period, Timeframe } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { Months } from "@/lib/months";

interface Props {
  period: Period;
  setPeriod: (period: Period) => void;
  timeframe: Timeframe;
  setTimeframe: (timeframe: Timeframe) => void;
}

export default function HistoryPeriodSelector({
  period,
  setPeriod,
  timeframe,
  setTimeframe,
}: Props) {
  const { data, isFetching } = useQuery<GetHistoryPeriodsResponseType>({
    queryKey: ["overview", "history", "periods"],
    queryFn: async () =>
      await fetch("/api/stats/history-periods").then((res) => res.json()),
  });

  return (
    <Tabs
      defaultValue={timeframe}
      onValueChange={(value) => setTimeframe(value as Timeframe)}
      className="flex flex-col md:flex-row-reverse gap-2"
    >
      <TabsList>
        <TabsTrigger value="year" className="cursor-pointer">
          Year
        </TabsTrigger>
        <TabsTrigger value="month" className="cursor-pointer">
          Month
        </TabsTrigger>
      </TabsList>
      <TabsContent value="year" className="flex flex-row gap-2">
        <YearSelector
          isFetching={isFetching}
          period={period}
          setPeriod={setPeriod}
          years={data || []}
        />
      </TabsContent>
      <TabsContent value="month" className="flex flex-row gap-2">
        <MonthSelector
          isFetching={isFetching}
          period={period}
          setPeriod={setPeriod}
          years={data || []}
        />
      </TabsContent>
    </Tabs>
  );
}

function YearSelector({
  period,
  setPeriod,
  years,
  isFetching,
}: {
  period: Period;
  setPeriod: (period: Period) => void;
  years: GetHistoryPeriodsResponseType;
  isFetching: boolean;
}) {
  return (
    <Select
      value={period.year.toString()}
      onValueChange={(value) =>
        setPeriod({ month: period.month, year: parseInt(value) })
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {isFetching ? (
          <LoaderCircle className="animate-spin duration-200 self-center w-full" />
        ) : (
          years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}

function MonthSelector({
  isFetching,
  period,
  setPeriod,
  years,
}: {
  isFetching: boolean;
  period: Period;
  setPeriod: (period: Period) => void;
  years: GetHistoryPeriodsResponseType;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Select
        value={period.year.toString()}
        onValueChange={(value) =>
          setPeriod({ month: period.month, year: parseInt(value) })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {isFetching ? (
            <LoaderCircle className="animate-spin duration-200 self-center w-full" />
          ) : (
            years?.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      <Select
        value={Months[period.month]}
        onValueChange={(value) =>
          setPeriod({ month: Months.indexOf(value), year: period.year })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {isFetching ? (
            <LoaderCircle className="animate-spin duration-200 self-center w-full" />
          ) : (
            Months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
