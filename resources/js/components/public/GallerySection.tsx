import { Link } from '@inertiajs/react';
import { route } from '@/helpers/route';
import { Gallery } from '@/types';
import { Trophy, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';

interface GallerySectionProps {
    galleries: Gallery[];
}

export default function GallerySection({ galleries }: GallerySectionProps) {
    if (galleries.length === 0) return null;

    const mainGallery = galleries[0];
    const gridGalleries = galleries.slice(1, 4);
    const allImages = [mainGallery, ...gridGalleries].filter(Boolean);

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

    const handleMainClick = () => {
        if (mainGallery) openModal(0);
    };

    const handleGridClick = (idx: number) => {
        openModal(idx + 1);
    };

    return (
        <section className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                        Galeri Kegiatan
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Dokumentasi aktivitas sekolah
                    </p>
                </div>

                {/* Mobile: Vertical Cards (like news) */}
                <div className="grid gap-4 md:hidden">
                    {galleries.slice(0, 3).map((gallery) => (
                        <Link
                            key={gallery.id}
                            href={route('public.gallery')}
                            className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
                        >
                            <div className="overflow-hidden">
                                {gallery.image_url ? (
                                    <img
                                        src={gallery.image_url}
                                        alt={gallery.title || 'Gallery'}
                                        className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-48 w-full items-center justify-center bg-primary/5">
                                        <Trophy className="h-10 w-10 text-primary/20" />
                                    </div>
                                )}
                            </div>
                            {gallery.title && (
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-800">
                                        {gallery.title}
                                    </h3>
                                </div>
                            )}
                        </Link>
                    ))}

                    {/* Lihat Semua Button - Mobile */}
                    <div className="flex justify-center pt-2">
                        <Link
                            href={route('public.gallery')}
                            className="rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
                        >
                            Lihat Semua Galeri
                        </Link>
                    </div>
                </div>

                {/* Desktop: Featured + Grid */}
                <div className="hidden md:block">
                    {/* Featured Image */}
                    {mainGallery && (
                        <div
                            className="group relative mb-8 cursor-pointer overflow-hidden rounded-3xl"
                            onClick={handleMainClick}
                        >
                            {mainGallery.image_url ? (
                                <img
                                    src={mainGallery.image_url}
                                    alt={mainGallery.title || 'Gallery Image'}
                                    className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex aspect-video w-full items-center justify-center bg-primary/5">
                                    <Trophy className="h-16 w-16 text-primary/20" />
                                </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                                <div className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-medium text-gray-800 shadow-lg">
                                    <ZoomIn className="h-4 w-4" />
                                    Lihat Foto
                                </div>
                            </div>
                            {mainGallery.title && (
                                <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/60 to-transparent p-6">
                                    <p className="text-sm font-semibold text-white">
                                        {mainGallery.title}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Grid */}
                    <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
                        {gridGalleries.map((gallery, idx) => (
                            <div
                                key={gallery.id}
                                className="group relative cursor-pointer overflow-hidden rounded-xl"
                                onClick={() => handleGridClick(idx)}
                            >
                                {gallery.image_url ? (
                                    <img
                                        src={gallery.image_url}
                                        alt={gallery.title || 'Gallery'}
                                        className="aspect-4/3 w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex aspect-4/3 w-full items-center justify-center bg-primary/5">
                                        <Trophy className="h-8 w-8 text-primary/20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                                    <div className="rounded-full bg-white/90 p-3 shadow-lg">
                                        <ZoomIn className="h-5 w-5 text-gray-800" />
                                    </div>
                                </div>
                                {gallery.title && (
                                    <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/60 to-transparent p-4">
                                        <p className="text-xs font-medium text-white">
                                            {gallery.title}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal with Blur Backdrop */}
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
        </section>
    );
}
