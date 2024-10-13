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
import { createColor, deleteColor, updateColor } from '@/utils/color';
import { getUser } from '@/utils/auth';

const formScheme = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
  storeId: z.string().min(1),
});

const ColorForm = ({ color }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = color ? 'Edit Color' : 'Create Color';
  const description = color ? 'Edit a Color' : 'Add a new Color';
  const action = color ? 'Save Changes' : 'Create';

  const form = useForm({
    resolver: zodResolver(formScheme),
    defaultValues: color || {
      name: '',
      value: '',
      storeId: params.storeId,
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const user = await getUser();
      const response = color
        ? await updateColor(params, { userId: user._id, data })
        : await createColor(params, { userId: user._id, data });
      toast.success(response.message);
      router.push(`/${params.storeId}/colors`);
      router.refresh();
    } catch (error) {
      toast.error(response.message);
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteColor(color);
      toast.success(response.message);
      router.push(`/${params.storeId}/colors`);
      router.refresh();
    } catch (error) {
      toast.error(error.response.message);
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        description={'[NOTE] : THIS COLOR WILL BE REMOVED FROM ALL THE PRODUCTS'}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {color && (
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
                    <Input disabled={loading} placeholder="Color Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input disabled={loading} placeholder="Value..." {...field} />
                      <div className="border p-4 rounded-full" style={{ backgroundColor: field.value }} />
                    </div>
                  </FormControl>
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

export default ColorForm;
