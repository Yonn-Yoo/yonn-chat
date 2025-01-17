'use client';

import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import EmojiPicker from '../emoji-picker';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';

type Props = {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: 'conversation' | 'channel';
};

const formSchema = z.object({
  content: z.string().min(1),
});

export default function ChatInput({ apiUrl, query, name, type }: Props) {
  const { onOpen } = useModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });
  const loading = form.formState.isSubmitting;

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    const url = qs.stringifyUrl({
      url: apiUrl,
      query,
    });

    await axios.post(url, values).then(handleSuccess).catch(console.log);

    function handleSuccess() {
      form.reset();
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => onOpen('messageFile', { apiUrl, query })}
                    className="absolute top-7 left-8 h-6 w-6 bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    autoComplete="off"
                    spellCheck={false}
                    disabled={loading}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`${
                      type === 'conversation' ? name : `#${name}`
                    }에 메시지를 보내주세요.`}
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
