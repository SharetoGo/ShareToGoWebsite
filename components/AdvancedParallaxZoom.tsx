'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface CardScrollExpandProps {
  imageSrc: string;
  title?: string;
  height?: string;
  imageAlt?: string;
}

export default function CardScrollExpand({
  imageSrc,
  height = "180vh",
  imageAlt = "App"
}: CardScrollExpandProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        let progress = (windowHeight - rect.top) / windowHeight;
        progress = Math.max(0, Math.min(1, progress));
        
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scale = 0.7 + scrollProgress * 0.3;
  const borderRadius = Math.max(0, 20 - scrollProgress * 20);
  const padding = Math.max(0, 50 - scrollProgress * 50);

  return (
    <div 
      ref={containerRef} 
      className="relative  overflow-hidden"
    >
      {/* STICKY CONTAINER */}
      <div 
        className="sticky h-screen w-full flex justify-center "
      >
        {/* PADDING DINÁMICO */}
        <div
          style={{
            padding: `${padding}px`,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'padding 0.08s ease-out',
          }}
        >
          {/* CONTENEDOR ESCALABLE - SIN espacios grises */}
          <div
            style={{
              width: `${scale * 100}%`,
              maxWidth: '100%',
              borderRadius: `${borderRadius}px`,
              overflow: 'hidden',
              aspectRatio: '21 / 9',
              willChange: 'width, border-radius',
              transition: 'ease-out, border-radius 0.08s ease-out',
              position: 'relative',
            }}
          >
            {/* IMAGEN */}
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              quality={90}
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 70vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
