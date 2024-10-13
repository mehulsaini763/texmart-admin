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
import { createSize, deleteSize, updateSize } from '@/utils/size';
import { getUser } from '@/utils/auth';

const formScheme = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
  storeId: z.string().min(1),
});

const SizeForm = ({ size }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = size ? 'Edit Size' : 'Create Size';
  const description = size ? 'Edit a Size' : 'Add a new Size';
  const action = size ? 'Save Changes' : 'Create';

  const form = useForm({
    resolver: zodResolver(formScheme),
    defaultValues: size || {
      name: '',
      value: '',
      storeId: params.storeId,
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const user = await getUser();
      const response = size
        ? await updateSize(params, { userId: user._id, data })
        : await createSize(params, { userId: user._id, data });
      toast.success(response.message);
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
    } catch (error) {
      toast.error(error.response.message);
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteSize(size);
      toast.success(response.message);
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
    } catch (error) {
      toast.error(error.response.message);
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {size && (
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
                    <Input disabled={loading} placeholder="Size Name..." {...field} />
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
                    <Input disabled={loading} placeholder="Value..." {...field} />
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

export default SizeForm;
