'use client';

import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChannelType } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
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
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Channel name is required.',
    })
    .refine((name) => name !== 'general', {
      message: 'Channel name cannot be "general" 🥲',
    }),
  type: z.nativeEnum(ChannelType),
});

export default function EditChannelModal() {
  const { isOpen, onClose, type, data } = useModal();
  const { channel, server } = data;
  const router = useRouter();
  const isModalOpen = isOpen && type === 'editChannel';
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: channel?.type || ChannelType.TEXT,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    const url = qs.stringifyUrl({
      url: `/api/channels/${channel?.id}`,
      query: {
        serverId: server?.id,
      },
    });

    await axios.patch(url, values).then(handleSuccess).catch(console.log);
  };

  const handleSuccess = () => {
    refresh();
    onClose();
  };

  const refresh = () => {
    form.reset();
    router.refresh();
  };

  const handleOnClose = () => {
    if (channel) {
      form.setValue('name', channel.name);
      form.setValue('type', channel.type);
    }
    onClose();
  };

  useEffect(() => {
    if (channel) {
      form.setValue('name', channel.name);
      form.setValue('type', channel.type);
    }
  }, [channel, form]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOnClose}>
      <DialogContent className="bg-[#F8F9FA] text-black overflow-hidden p-0">
        <DialogHeader className="pt-6 px-5">
          <DialogTitle className="text-2xl text-center font-semibold">
            Edit channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="space-y-6"
          >
            <div className="space-y-6 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="!relative">
                    <FormLabel className="text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Channel name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/60 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute -bottom-5 text-rose-500 dark:text-rose-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Type</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-300/60 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                          <SelectValue placeholder="Select a channel type" />
                          <SelectContent className="bg-zinc-100 border-0 shadow-2xl text-black">
                            {Object.values(ChannelType).map((type) => (
                              <SelectItem
                                key={type}
                                value={type}
                                className={`capitalize hover:!bg-indigo-400 ${
                                  type === field.value &&
                                  '!bg-indigo-500 text-white'
                                }`}
                              >
                                {type.toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectTrigger>
                      </FormControl>
                    </Select>
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
  );
}
