'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import axios from 'axios';

import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import AlertModal from '@/components/modals/AlertModal';
import ImageUpload from '@/components/ui/image-upload';

const formScheme = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
  storeId: z.string().min(1),
});

const BillboardForm = ({ billboard }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = billboard ? 'Edit Billboard' : 'Create Billboard';
  const description = billboard ? 'Edit a Billboard' : 'Add a new Billboard';
  const action = billboard ? 'Save Changes' : 'Create';

  const form = useForm({
    resolver: zodResolver(formScheme),
    defaultValues: billboard || {
      label: '',
      imageUrl: '',
      storeId: params.storeId,
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = billboard
        ? (await axios.patch(`/api/stores/${params.storeId}/billboards/${params.billboardId}`, data)).data
        : (await axios.post(`/api/stores/${params.storeId}/billboards/`, data)).data;
      toast.success(response.message);
      router.push(`/${params.storeId}/billboards`);
      router.refresh();
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = (await axios.delete(`/api/stores/${params.storeId}/billboards/${params.billboardId}`)).data;
      toast.success(response.message);
      router.push(`/${params.storeId}/billboards`);
      router.refresh();
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading}>
        <div className="p-4 text-red-500 italic text-sm">
          [NOTE]: All Categories and Products related to this Billboard will be Deleted as well
        </div>
      </AlertModal>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {billboard && (
          <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Billboard Name..." {...field} />
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

export default BillboardForm;
