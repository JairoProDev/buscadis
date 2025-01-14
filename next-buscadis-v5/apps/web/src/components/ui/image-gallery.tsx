'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from './dialog';
import { cn } from '@/lib/utils';

interface Props {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: Props) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image
          src={images[currentImage]}
          alt={`${alt} - Imagen ${currentImage + 1}`}
          fill
          className="object-cover cursor-pointer"
          onClick={() => setSelectedImage(currentImage)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white"
            >
              →
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2 mt-2">
          {images.map((image, index) => (
            <div
              key={image}
              className={cn(
                'relative aspect-video rounded-md overflow-hidden cursor-pointer',
                currentImage === index && 'ring-2 ring-primary'
              )}
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={image}
                alt={`${alt} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 20vw, 10vw"
              />
            </div>
          ))}
        </div>
      )}

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl p-0 bg-transparent">
          <div className="relative aspect-[3/2] w-full">
            {selectedImage !== null && (
              <Image
                src={images[selectedImage]}
                alt={`${alt} - Imagen ampliada ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 