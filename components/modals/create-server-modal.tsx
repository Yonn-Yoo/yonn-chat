'use client';

import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FileUpload from '../file-upload';
import { Button } from '../ui/button';
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
import { Input } from '../ui/input';

const formSchema = z.object({
  name: z.string().min(1, {
    message: '서버 이름을 입력해주세요.',
  }),
  imageUrl: z.string().min(1, {
    message: '서버 이미지를 등록해주세요.',
  }),
});

export default function CreateServerModal() {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === 'createServer';
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    await axios
      .post('/api/servers', values)
      .then(handleSuccess)
      .catch(console.log);
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
            서버를 만들어주세요!
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            서버의 이름과 보여질 아이콘을 지정해주세요. 언제든 수정이
            가능합니다!
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
                      서버 이름
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/60 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="서버 이름을 입력해주세요."
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
                생성하기!
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
