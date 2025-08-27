"use client";
import { GetCategoriesResponseType } from "@/app/api/categories/route";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash, TrendingDown, TrendingUp } from "lucide-react";
import CreateCategoryDialog from "../../dashboard/_components/CreateCategoryDialog";
import { DeleteCategory } from "../../_actions/categories";
import { DeleteCategorySchemaType } from "@/schema/categories";
import { toast } from "sonner";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

interface Props {
  type: TransactionType;
  onErrorFetching: (error: boolean) => void;
}

export default function CategoriesCard({ type, onErrorFetching }: Props) {
  const queryClient = useQueryClient();

  const { data, isFetching, isError } = useQuery<GetCategoriesResponseType>({
    queryKey: ["categories", type],
    queryFn: async () => {
      const res = await fetch(`/api/categories?type=${type}`);
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      return res.json();
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["categories", type],
    mutationFn: DeleteCategory,
    onMutate: () => {
      toast.loading("Deleting category...", { id: "delete-category" });
    },
    onSuccess: () => {
      toast.success("Category deleted successfully", { id: "delete-category" });

      queryClient.invalidateQueries({
        queryKey: ["categories", type],
      });
    },
    onError: () => {
      toast.error("Failed to delete category", { id: "delete-category" });
    },
  });

  const handleDeleteCategory = (category: DeleteCategorySchemaType) => {
    mutate({
      ...category,
    });
  };

  if (isError) {
    onErrorFetching(true);
    return null;
  }

  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <Card className="py-0 gap-0">
      <header className="flex flex-col md:flex-row justify-between gap-4 items-center border-seperate border-b p-4">
        <div className="flex flex-row gap-2 items-center">
          <div
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-lg",
              type === "income" ? "bg-emerald-400/10" : "bg-rose-400/10"
            )}
          >
            {type === "income" && (
              <TrendingUp size={24} className={"text-emerald-400"} />
            )}
            {type === "expense" && (
              <TrendingDown size={24} className={"text-rose-400"} />
            )}
          </div>
          <div>
            <h1>
              {type === "income" ? "Incomes categories" : "Expenses Categories"}
            </h1>
            <p>Sorted by name</p>
          </div>
        </div>
        <CreateCategoryDialog
          type={type}
          TriggerComponent={
            <Button className="cursor-pointer">
              <Plus size={24} />
              Create Category
            </Button>
          }
        />
      </header>
      <main className="flex flex-row flex-wrap gap-2 p-2">
        <SkeletonWrapper isLoading={isFetching}>
          {hasData &&
            data.map((category) => (
              <Card
                key={category.name}
                className="w-42 h-32 flex flex-col gap-1 items-center justify-between py-0 bg-background shadow-accent shadow-md"
              >
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <span role="img">{category.icon}</span>
                  <h1 className="truncate">{category.name}</h1>
                </div>
                <DeleteCategoryDialog
                  onConfirm={() =>
                    handleDeleteCategory({
                      name: category.name,
                      icon: category.icon,
                      type: type,
                    })
                  }
                >
                  <Button
                    className="cursor-pointer w-full border-t rounded-t-none hover:bg-rose-400/20"
                    variant="secondary"
                  >
                    <Trash size={16} />
                    Remove
                  </Button>
                </DeleteCategoryDialog>
              </Card>
            ))}
          {!hasData && (
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <h1 className="text-2xl">No categories found</h1>
              <p className="text-sm text-muted-foreground">
                Try creating a new category
              </p>
            </div>
          )}
        </SkeletonWrapper>
      </main>
    </Card>
  );
}
