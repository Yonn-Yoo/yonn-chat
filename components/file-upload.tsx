'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import '@uploadthing/react/styles.css';
import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';

type FileUploadProps = {
  onChange: (url?: string) => void;
  value: string;
  endpoint: 'messageFile' | 'serverImage';
};

export default function FileUpload({
  onChange,
  value,
  endpoint,
}: FileUploadProps) {
  const fileType = value?.split('.').pop();

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-24 w-24">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange('')}
          className="bg-rose-400 text-white p-1.5 rounded-full absolute top-0 right-0"
          type="button"
        >
          <X className="w-4 h-4"></X>
        </button>
      </div>
    );
  }

  if (value && fileType === 'pdf') {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline line-clamp-1"
        >
          {value}
        </a>
        <button
          onClick={() => onChange('')}
          className="bg-rose-400 hover:bg-rose-400/80 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-xl"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={console.log}
    />
  );
}
