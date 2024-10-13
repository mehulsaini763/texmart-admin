"use client";

import useStoreModal from "@/hooks/useStoreModal";
import { useState } from "react";

import { useParams, useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const StoreSwitcher = ({ className, stores }) => {
  const { onOpen } = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = stores.map((store) => ({
    label: store.storeName,
    value: store._id,
  }));

  const currentStore = formattedItems.find(
    (store) => store.value === params.storeId
  );

  const onStoreSelect = (store) => router.push(`/${store.value}`);

  const [open, setOpen] = useState(false);
// onOpen(true)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Store"
          className={cn("w-[200px] justify-between", className)}
        >
          <Store className="h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Store..." />
            <CommandEmpty>No Store Found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className={cn('text-sm',currentStore.value === store.value && 'font-bold')}
                >
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandItem onSelect={onOpen}>
              <PlusCircle className="mx-2 h-4 w-4" />
              Create Store
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
