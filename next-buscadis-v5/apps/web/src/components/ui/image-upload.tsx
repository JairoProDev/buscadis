'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface Props {
  value: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // en bytes
}

export function ImageUpload({ 
  value, 
  onChange, 
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024 // 5MB por defecto
}: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...value];
    
    acceptedFiles.forEach(file => {
      if (newFiles.length < maxFiles) {
        newFiles.push(file);
      }
    });
    
    onChange(newFiles);
  }, [value, onChange, maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize,
    maxFiles: maxFiles - value.length
  });

  const removeImage = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer',
          'transition-colors hover:border-primary/50',
          isDragActive && 'border-primary bg-primary/5',
          value.length >= maxFiles && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta las imágenes aquí...</p>
        ) : (
          <div className="space-y-2">
            <p>Arrastra y suelta imágenes aquí, o haz clic para seleccionar</p>
            <p className="text-sm text-gray-500">
              PNG, JPG o WEBP (máx. {maxSize / (1024 * 1024)}MB)
            </p>
            <p className="text-sm text-gray-500">
              {value.length} de {maxFiles} imágenes
            </p>
          </div>
        )}
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {value.map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 