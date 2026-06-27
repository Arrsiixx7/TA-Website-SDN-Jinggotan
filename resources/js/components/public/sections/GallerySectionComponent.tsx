import { Gallery } from '@/types';
import { Trophy, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';

interface GallerySectionComponentProps {
    galleries: Gallery[];
}

export default function GallerySectionComponent({
    galleries,
}: GallerySectionComponentProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const allImages = galleries.slice(0, 5);

    const openModal = useCallback((index: number) => {
        setSelectedIndex(index);
    }, []);

    const closeModal = useCallback(() => {
        setSelectedIndex(null);
    }, []);

    const goNext = useCallback(() => {
        setSelectedIndex((prev) =>
            prev !== null ? (prev + 1) % allImages.length : null,
        );
    }, [allImages.length]);

    const goPrev = useCallback(() => {
        setSelectedIndex((prev) =>
            prev !== null
                ? (prev - 1 + allImages.length) % allImages.length
                : null,
        );
    }, [allImages.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, closeModal, goNext, goPrev]);

    if (galleries.length === 0) return null;

    return (
        <>
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Galeri Kegiatan
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Dokumentasi aktivitas sekolah
                        </p>
                    </div>
                    {/* MAIN */}
                    <div className="mb-10">
                        <div
                            className="group relative cursor-pointer overflow-hidden rounded-3xl"
                            onClick={() => openModal(0)}
                        >
                            {galleries[0]?.image_url ? (
                                <img
                                    src={galleries[0].image_url}
                                    alt={galleries[0].title || 'Gallery'}
                                    className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex aspect-[16/9] w-full items-center justify-center bg-gray-100">
                                    <Trophy className="h-16 w-16 text-gray-300" />
                                </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                                <div className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-medium text-gray-800 shadow-lg">
                                    <ZoomIn className="h-4 w-4" />
                                    Lihat Foto
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GRID - 4 columns on all screen sizes */}
                    <div className="grid grid-cols-4 gap-4">
                        {galleries.slice(1, 5).map((gallery, idx) => (
                            <div
                                key={gallery.id}
                                className="group relative cursor-pointer overflow-hidden rounded-xl"
                                onClick={() => openModal(idx + 1)}
                            >
                                {gallery.image_url ? (
                                    <img
                                        src={gallery.image_url}
                                        alt={gallery.title || 'Gallery'}
                                        className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex aspect-square w-full items-center justify-center bg-gray-100">
                                        <Trophy className="h-8 w-8 text-gray-300" />
                                    </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                                    <div className="rounded-full bg-white/90 p-2 shadow-lg">
                                        <ZoomIn className="h-4 w-4 text-gray-800" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedIndex !== null && allImages[selectedIndex] && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
                    onClick={closeModal}
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    {/* Close Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            closeModal();
                        }}
                        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
                    >
                        <X size={24} />
                    </button>

                    {/* Prev Button */}
                    {allImages.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goPrev();
                            }}
                            className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                        >
                            <ChevronLeft size={28} />
                        </button>
                    )}

                    {/* Next Button */}
                    {allImages.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goNext();
                            }}
                            className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                        >
                            <ChevronRight size={28} />
                        </button>
                    )}

                    {/* Image */}
                    <div
                        className="relative flex max-h-[85vh] max-w-[90vw] flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={
                                allImages[selectedIndex].image_url ||
                                '/storage/images/placeholder.jpg'
                            }
                            alt={
                                allImages[selectedIndex].title ||
                                'Gallery Image'
                            }
                            className="max-h-[80vh] max-w-full rounded-lg object-contain"
                        />
                        {allImages[selectedIndex].title && (
                            <p className="mt-4 text-center text-sm font-medium text-white/80">
                                {allImages[selectedIndex].title}
                            </p>
                        )}
                        {allImages.length > 1 && (
                            <p className="mt-2 text-center text-xs text-white/50">
                                {selectedIndex + 1} / {allImages.length}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
