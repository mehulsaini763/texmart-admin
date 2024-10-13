'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import AlertModal from '@/components/modals/AlertModal';
import { createCategory, deleteCategory, updateCategory } from '@/utils/category';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getUser } from '@/utils/auth';

const formScheme = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
  storeId: z.string().min(1),
});

const CategoryForm = ({ billboards, category }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = category ? 'Edit Category' : 'Create Category';
  const description = category ? 'Edit a Category' : 'Add a new Category';
  const action = category ? 'Save Changes' : 'Create';

  const form = useForm({
    resolver: zodResolver(formScheme),
    defaultValues: category || {
      name: '',
      billboardId: '',
      storeId: params.storeId,
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const user = await getUser();
      const response = category
        ? await updateCategory(params, { userId: user._id, data })
        : await createCategory(params, { userId: user._id, data });
      toast.success(response.message);
      router.push(`/${params.storeId}/categories`);
      router.refresh();
    } catch (error) {
      toast.error(error.response.message);

      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const user = await getUser();
      const response = await deleteCategory(params, { userId: user._id });
      toast.success(response.message);
      router.push(`/${params.storeId}/categories`);
      router.refresh();
    } catch (error) {
      setLoading(false);
      toast.error(error.response.message);
    }
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {category && (
          <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Category Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.defaultValue}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a Billboard" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.label} value={billboard._id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
