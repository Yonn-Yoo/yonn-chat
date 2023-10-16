'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FileUpload from '../file-upload';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is required',
  }),
});

export default function InitialModal() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  });
  const isLoading = form.formState.isSubmitting;

  useEffect(() => setIsMounted(true), []);

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/servers', values);

      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const refresh = () => {
    form.reset();
    router.refresh();
    window.location.reload();
  };

  return (
    <>
      {isMounted && (
        <Dialog open>
          <DialogContent className="bg-[#F8F9FA] text-black overflow-hidden p-0">
            <DialogHeader className="pt-6 px-5">
              <DialogTitle className="text-2xl text-center font-semibold">
                Customize your server!
              </DialogTitle>
              <DialogDescription className="text-center text-zinc-500">
                Give your server a personality with a name and an icon. You can
                always change it later!
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleOnSubmit)}
                className="space-y-6"
              >
                <div className="space-y-6 px-6">
                  <div className="flex items-center justify-center text-center">
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FileUpload
                              endpoint="serverImage"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="!relative">
                        <FormLabel className="text-xs font-bold text-zinc-500 dark:text-secondary/70">
                          Server name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-zinc-300/60 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            placeholder="Enter server name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="absolute -bottom-5 text-rose-500 dark:text-rose-400" />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                  <Button variant="primary" disabled={isLoading}>
                    Create!
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
