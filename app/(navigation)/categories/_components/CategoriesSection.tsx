"use client";

import { useState } from "react";
import CategoriesCard from "./CategoriesCard";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

export default function CategoriesSection() {
  const [errorFetching, setErrorFetching] = useState(false);

  if (errorFetching) {
    toast.error("Error fetching categories, try again later.", {
      id: `fetch-categories-error`,
    });

    return (
      <Card className="min-h-32 gap-2 flex flex-col items-center justify-center bg-destructive/10 border-separate">
        <h1 className="text-2xl">Failed the fetch categories</h1>
        <p className="text-sm text-muted-foreground">
          Try again at a different time
        </p>
      </Card>
    );
  }

  return (
    <>
      <CategoriesCard type="income" onErrorFetching={setErrorFetching} />
      <CategoriesCard type="expense" onErrorFetching={setErrorFetching} />
    </>
  );
}
