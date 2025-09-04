/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Currencies, Currency } from "@/lib/currencies";

interface Props {
  selectedOption: Currency | null;
  onSelectedOptionChange: (currency: Currency | null) => void;
}

export function CurrencyComboBox({
  selectedOption,
  onSelectedOptionChange,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start cursor-pointer"
          >
            {selectedOption ? <>{selectedOption.label}</> : <>Set currencey</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <OptionList
            setOpen={setOpen}
            setSelectedOption={onSelectedOptionChange}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedOption ? <>{selectedOption.label}</> : <>Set currencey</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only">Currency Selector</DrawerTitle>
        <div className="mt-4 border-t">
          <OptionList
            setOpen={setOpen}
            setSelectedOption={onSelectedOptionChange}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function OptionList({
  setOpen,
  setSelectedOption,
}: {
  setOpen: (open: boolean) => void;
  setSelectedOption: (status: Currency | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter currency..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {Currencies.map((currencey: Currency) => (
            <CommandItem
              className="cursor-pointer"
              key={currencey.value}
              value={currencey.value}
              onSelect={(value) => {
                setSelectedOption(
                  Currencies.find((priority) => priority.value === value) ||
                    null
                );
                setOpen(false);
              }}
            >
              {currencey.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
