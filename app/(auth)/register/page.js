"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import axios from "axios";
import toast from "react-hot-toast";
import { register } from "@/util/actions/authActions";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const formSchema = z.object({
  avatar: z
    .instanceof(FileList, { message: "Choose an Image" })
    .optional()
    .refine(
      (files) => files[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),

  fullName: z.string().min(3),
  email: z.string().toLowerCase().email(),
  password: z.string().min(1),
});

const RegisterPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: "",
      fullName: "",
      email: "",
      password: "",
    },
  });

  const fileRef = form.register("avatar");

  const onSubmit = async (data) => {
    const response = await register({ ...data, avatar: data.avatar[0] });
    if (response.success) {
      toast.success(response.data.message);
    } else toast.error(err.response.data);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="rounded-md shadow-neutral-300 shadow-md border border-neutral-200 p-4 max-w-md w-full">
        <div className="my-2 flex flex-col items-center gap-2">
          <div className="text-xl font-medium">ADMIN PANEL</div>
          <div className="text-lg font-semibold">Register user to store</div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" {...fileRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input type="password" {...field} />
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
      </div>
    </div>
  );
};

export default RegisterPage;
