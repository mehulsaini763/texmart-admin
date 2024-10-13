"use client";

import { useParams, useRouter } from "next/navigation";

import { columns } from "./ProductColumns";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

const ProductClient = ({ products }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <Heading
          title={`Products (${products.length})`}
          description="Manage products for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={products} searchKey={"name"} />
      <Heading title={"API"} description={"API calls for Products"} />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductClient;
