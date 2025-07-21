'use client';

import { useRef } from 'react';

interface ImageUploadInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  id?: string;
}

export default function ImageUploader({
  onChange,
  accept = 'image/*',
  id = 'image-upload',
}: ImageUploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      ref={inputRef}
      accept={accept}
      className='hidden'
      id={id}
      type='file'
      onChange={onChange}
    />
  );
}
