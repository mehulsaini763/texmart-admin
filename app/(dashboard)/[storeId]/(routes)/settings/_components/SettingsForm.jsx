'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import AlertModal from '@/components/modals/AlertModal';
import ApiAlert from '@/components/ui/api-alert';

const formScheme = z.object({
  storeName: z.string().min(1),
});

const SettingsForm = ({ store }) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formScheme),
    defaultValues: store,
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = (await axios.patch(`/api/stores/${params.storeId}`, data)).data;
      toast.success(response.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = (await axios.delete(`/api/stores/${params.storeId}`)).data;
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      router.push('/');
      router.refresh();
    }
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage Store Preferences" />
        <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Store Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert title="GET" description={`${process.env.NEXT_PUBLIC_BASE_URL}/api/stores/${params.storeId}`} variant="public" />
    </>
  );
};

export default SettingsForm;
