'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import toast from 'react-hot-toast';

import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Modal from '@/components/ui/modal';
import useStoreModal from '@/hooks/useStoreModal';
 ;
import axios from 'axios';

const formSchema = z.object({
  storeName: z.string().min(1),
});

const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const user = await getUser();
      const response = await axios.post('/api/stores');
      toast.success(response.message);
      window.location.assign(`/${response.data._id}`);
    } catch (error) {
      toast.error(error.response.message);
    }
  };

  return (
    <Modal
      title={'Create Store'}
      description={'Add a new store to manage products and categories'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Store Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
