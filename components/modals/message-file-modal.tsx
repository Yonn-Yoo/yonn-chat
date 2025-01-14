'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FileUpload from '../file-upload';
import { Button } from '../ui/button';

import { useModal } from '@/hooks/use-modal-store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Form, FormControl, FormField, FormItem } from '../ui/form';

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: 'Attachment is required',
  }),
});

export default function MessageFileModal() {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const { apiUrl, query } = data;
  const isModalOpen = isOpen && type === 'messageFile';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      fileUrl: '',
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleOnClose = () => {
    form.reset();
    onClose();
  };

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    const url = qs.stringifyUrl({
      url: apiUrl || '',
      query,
    });

    function handleSuccess() {
      form.reset();
      router.refresh();
      onClose();
    }

    await axios
      .post(url, {
        ...values,
        content: values.fileUrl,
      })
      .then(handleSuccess)
      .catch(console.log);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOnClose}>
      <DialogContent className="bg-[#F8F9FA] text-black overflow-hidden p-0">
        <DialogHeader className="pt-6 px-5">
          <DialogTitle className="text-2xl text-center font-semibold">
            파일을 첨부해주세요!
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            아무 파일을 메시지로 보내주세요!
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
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading} className="w-full">
                보내기
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
