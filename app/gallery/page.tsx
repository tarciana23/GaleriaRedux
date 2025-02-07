"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchImages } from "@/redux/slices/gallerySlice";
import Image from "next/image";

export default function Gallery() {
  const dispatch = useDispatch<AppDispatch>();
  const { images, loading, error } = useSelector(
    (state: RootState) => state.gallery
  );

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <main className="p-4 mt-8">
      {loading && <p>Carregando imagens...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image: any) => (
          <div
            key={image.id}
            className="relative w-full h-52 overflow-hidden rounded-lg shadow-lg border"
          >
            <Image
              src={image.url}
              alt={image.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
