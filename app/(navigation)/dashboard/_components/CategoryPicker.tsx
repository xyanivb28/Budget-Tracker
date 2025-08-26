"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Category } from "@/lib/generated/prisma";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CommandEmpty } from "cmdk";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import CreateCategoryDialog from "./CreateCategoryDialog";

interface Props {
  type: TransactionType;
  onChange: (value: string) => void;
  value?: string;
}

export default function CategoryPicker({ type, onChange, value }: Props) {
  const [open, setOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(value ?? "");

  useEffect(() => {
    if (!categoryValue) return;
    onChange(categoryValue);
  }, [onChange, categoryValue]);

  const categories = useQuery<Category[]>({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const selectedCategory = categories.data?.find(
    (category: Category) => category.name === value
  );

  const handleCategoryCreated = useCallback(
    (category: Category) => {
      setCategoryValue(category.name);
      setOpen((prev) => !prev);
    },
    [setCategoryValue, setOpen]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between cursor-pointer"
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            "Select category"
          )}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <CreateCategoryDialog
            type={type}
            onCategoryCreated={handleCategoryCreated}
          />
          <CommandGroup>
            {categories.isFetching && (
              <LoaderCircle className="animate-spin duration-300 w-full text-center" />
            )}
            {!categories.isFetching && (
              <>
                <CommandEmpty className="flex flex-col items-center justify-center h-full p-2">
                  <p className="text-md">No categories found.</p>
                  <p className="text-sm text-muted-foreground">
                    Tip: try creating a category
                  </p>
                </CommandEmpty>
                <CommandList>
                  {categories.data?.map((category: Category) => (
                    <CommandItem
                      key={category.name}
                      onSelect={() => {
                        setCategoryValue(category.name);
                        setOpen((prev) => !prev);
                      }}
                      className="flex flex-row justify-between"
                    >
                      <CategoryRow category={category} />
                      <Check
                        className={cn(
                          "mr-2 w-4 h-4 opacity-0",
                          value === category.name && "opacity-100"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandList>
              </>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function CategoryRow({ category }: { category: Category }) {
  return (
    <div className="flex item-center gap-2">
      <span role="img">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  );
}
