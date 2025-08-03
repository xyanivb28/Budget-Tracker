"use client";

import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/route";
import { UserSettings } from "@/lib/generated/prisma";
import { useQuery } from "@tanstack/react-query";

interface Props {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}

export default function StatsCards({ userSettings, from, to }: Props) {
  const statsQuery = useQuery<GetBalanceStatsResponseType>({
    queryKey: ["overview", "stats", from, to],
    queryFn: () =>
      fetch(`/api/stats/balance?from=${from}&to=${to}`).then((res) =>
        res.json()
      ),
  });

  return <div>Stats Cards</div>;
}
