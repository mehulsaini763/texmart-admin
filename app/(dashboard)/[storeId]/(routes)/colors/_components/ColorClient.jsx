"use client";

import { useParams, useRouter } from "next/navigation";

import { columns } from "./ColorColumns";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

const ColorClient = ({ colors }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <Heading
          title={`Colors (${colors.length})`}
          description="Manage Colors for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={colors} searchKey={"name"} />
      <Heading title={"API"} description={"API calls for Colors"} />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};

export default ColorClient;
