'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().toLowerCase().email(),
  password: z.string().min(1),
});

const LoginClient = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await signIn('credentials', { redirect: false, ...data });
      toast.success('Logged In');
      return true;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message || 'Login Failed');
      return err;
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="rounded-md shadow-neutral-300 shadow-md border border-neutral-200 p-4 max-w-md w-full">
        <div className="my-8 flex flex-col items-center gap-2">
          <div className="text-xl font-medium">ADMIN PANEL</div>
          <div className="text-xl font-semibold">Login to your account</div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4">
              <Button className="w-full" type="submit">
                Login
              </Button>
            </div>
          </form>
        </Form>
        <div className="p-2">
          <div className="text-xs text-red-500 italic font-medium underline">[FOR TEST USER]</div>
          <div className="text-xs text-red-500 italic font-medium "> Email: "test@login.com" | Password: "password"</div>
        </div>
      </div>
    </div>
  );
};

export default LoginClient;
