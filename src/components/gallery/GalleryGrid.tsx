import { useState } from "react";
import { Lightbox } from "./Lightbox";
import { Reveal } from "@/components/ui/Reveal";

interface GalleryImage {
  src: string;
  alt: string;
  aspect?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <div className="columns-2 gap-4 space-y-4 md:columns-3 lg:columns-4 lg:gap-6 lg:space-y-6">
        {images.map((img, i) => (
          <Reveal key={i} delay={i * 50}>
            <div
              role="button"
              tabIndex={0}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-mist shadow-lg shadow-navy/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-aqua/10"
              onClick={() => setLightboxIndex(i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxIndex(i); } }}
            >
              <div className={`relative w-full ${img.aspect || "aspect-[3/4]"}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-deep/0 transition-colors duration-500 group-hover:bg-deep/30">
                <span className="translate-y-4 rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  View Full
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Lightbox
        images={images}
        currentIndex={Math.max(0, lightboxIndex)}
        isOpen={lightboxIndex >= 0}
        onClose={() => setLightboxIndex(-1)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
