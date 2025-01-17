'use client';

import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChannelType } from '@prisma/client';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
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
      message: '채널 이름을 입력해주세요.',
    })
    .refine((name) => name !== 'general', {
      message: '채널 이름은 "general"이 될 수 없습니다. 🥲',
    }),
  type: z.nativeEnum(ChannelType),
});

export default function CreateChannelModal() {
  const { isOpen, onClose, type, data } = useModal();
  const { channelType } = data;
  const router = useRouter();
  const params = useParams();
  const isModalOpen = isOpen && type === 'createChannel';
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: channelType || ChannelType.TEXT,
    },
  });
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (channelType) {
      form.setValue('type', channelType);
    }
  }, [channelType, form]);

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    const url = qs.stringifyUrl({
      url: '/api/channels',
      query: {
        serverId: params?.serverId,
      },
    });

    await axios.post(url, values).then(handleSuccess).catch(console.log);
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
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOnClose}>
      <DialogContent className="bg-[#F8F9FA] text-black overflow-hidden p-0">
        <DialogHeader className="pt-6 px-5">
          <DialogTitle className="text-2xl text-center font-semibold">
            채널 생성
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
                      채널 이름
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/60 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="채널 이름을 입력해주세요."
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
                    <FormLabel>채널 타입</FormLabel>
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
                생성하기!
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
