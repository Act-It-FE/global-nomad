// hooks/useImageUpload.ts
import { useState } from 'react';

export interface UseImageUploadOptions {
  defaultImage?: string;
  onUpload?: (url: string) => void; // 업로드 후 콜백
  uploadFn: (file: File) => Promise<string>; // 어떤 업로드 API를 사용할지 외부에서 주입
}

export function useImageUpload({
  defaultImage = '/images/profile-default.svg',
  onUpload,
  uploadFn,
}: UseImageUploadOptions) {
  const [previewUrl, setPreviewUrl] = useState<string>(defaultImage);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);
    setIsUploading(true);

    try {
      const uploadedUrl = await uploadFn(file);
      URL.revokeObjectURL(tempUrl);
      setPreviewUrl(uploadedUrl);
      onUpload?.(uploadedUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      URL.revokeObjectURL(tempUrl);
      setPreviewUrl(defaultImage);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    previewUrl,
    isUploading,
    handleChange,
  };
}
