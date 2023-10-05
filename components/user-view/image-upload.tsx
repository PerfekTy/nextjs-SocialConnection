"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  disabled: boolean;
  label: string;
  icon: React.ReactNode;
  onChange: (base64: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  disabled,
  label,
  onChange,
  icon,
}) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        setBase64(e.target.result);
        handleChange(e.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: { "image/jpeg": [], "image/png": [] },
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-2 text-center text-sm border-2 border-dotted rounded-md",
      })}
    >
      <Input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height={100} width={100} alt="Uploaded image" />
        </div>
      ) : (
        <span className="flex flex-col items-center">
          {icon}
          <p className="text-card-foreground">{label}</p>
        </span>
      )}
    </div>
  );
};
