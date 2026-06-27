import { Head, router } from '@inertiajs/react';
import { route } from '@/helpers/route';
import { Gallery as GalleryType, PaginatedData } from '@/types';
import {
    Image,
    X,
    ChevronLeft,
    ChevronRight,
    Trophy,
    ZoomIn,
} from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';

interface Props {
    galleries: PaginatedData<GalleryType>;
}

export default function Gallery({ galleries }: Props) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const allImages = galleries.data;
    const mainGallery = allImages[0];
    const gridGalleries = allImages.slice(1, 4);

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

    const goToPage = (page: number) => {
        router.visit(route('public.gallery', { page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Head title="Galeri - SDN Jinggotan" />

            {/* GalleryHero */}
            <section className="bg-linear-to-b from-primary-soft to-white pt-36 pb-24">
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <span className="mb-6 inline-block rounded-full bg-primary-soft px-5 py-2 text-sm font-semibold text-primary">
                        Galeri
                    </span>
                    <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                        Dokumentasi Kegiatan{' '}
                        <span className="text-secondary">Sekolah</span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        Kumpulan momen kegiatan, pembelajaran, dan aktivitas
                        siswa SD Negeri Jinggotan.
                    </p>
                    <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-primary" />
                </div>
            </section>

            {/* GalleryGrid */}
            <section className="bg-white pb-32">
                <div className="mx-auto max-w-7xl px-6">
                    {allImages.length > 0 ? (
                        <>
                            {/* Mobile: 4 cards stacked vertically, all clickable with lightbox */}
                            <div className="flex flex-col gap-4 md:hidden">
                                {/* Main card */}
                                {mainGallery && (
                                    <div
                                        className="group relative cursor-pointer overflow-hidden rounded-2xl"
                                        onClick={() => openModal(0)}
                                    >
                                        {mainGallery.image_url ? (
                                            <img
                                                src={mainGallery.image_url}
                                                alt={
                                                    mainGallery.title ||
                                                    'Gallery'
                                                }
                                                className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-48 w-full items-center justify-center bg-gray-100">
                                                <Trophy className="h-10 w-10 text-gray-300" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                                            <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-gray-800 shadow-lg">
                                                <ZoomIn className="h-3 w-3" />
                                                Lihat Foto
                                            </div>
                                        </div>
                                        {mainGallery.title && (
                                            <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/60 to-transparent p-3">
                                                <p className="text-xs font-semibold text-white">
                                                    {mainGallery.title}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Grid cards - 3 small cards */}
                                {gridGalleries.map((gallery, idx) => (
                                    <div
                                        key={gallery.id}
                                        className="group relative cursor-pointer overflow-hidden rounded-2xl"
                                        onClick={() => openModal(idx + 1)}
                                    >
                                        {gallery.image_url ? (
                                            <img
                                                src={gallery.image_url}
                                                alt={gallery.title || 'Gallery'}
                                                className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-40 w-full items-center justify-center bg-gray-100">
                                                <Trophy className="h-8 w-8 text-gray-300" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                                            <div className="rounded-full bg-white/90 p-2 shadow-lg">
                                                <ZoomIn className="h-4 w-4 text-gray-800" />
                                            </div>
                                        </div>
                                        {gallery.title && (
                                            <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/60 to-transparent p-3">
                                                <p className="text-xs font-medium text-white">
                                                    {gallery.title}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Desktop: Featured + Grid */}
                            <div className="hidden md:block">
                                {/* Featured Image */}
                                {mainGallery && (
                                    <div
                                        className="group relative mb-12 cursor-pointer overflow-hidden rounded-3xl"
                                        onClick={() => openModal(0)}
                                    >
                                        {mainGallery.image_url ? (
                                            <img
                                                src={mainGallery.image_url}
                                                alt={
                                                    mainGallery.title ||
                                                    'Gallery Image'
                                                }
                                                className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex aspect-video w-full items-center justify-center bg-gray-100">
                                                <Trophy className="h-16 w-16 text-gray-300" />
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
                                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                                    {allImages.slice(1).map((gallery, idx) => (
                                        <div
                                            key={gallery.id}
                                            className="group relative cursor-pointer overflow-hidden rounded-xl"
                                            onClick={() => openModal(idx + 1)}
                                        >
                                            {gallery.image_url ? (
                                                <img
                                                    src={gallery.image_url}
                                                    alt={
                                                        gallery.title ||
                                                        'Gallery'
                                                    }
                                                    className="aspect-4/3 w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex aspect-4/3 w-full items-center justify-center bg-gray-100">
                                                    <Trophy className="h-8 w-8 text-gray-300" />
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

                            {/* Pagination */}
                            {galleries.last_page > 1 && (
                                <div className="mt-16 flex items-center justify-center gap-3">
                                    <button
                                        disabled={galleries.current_page === 1}
                                        onClick={() =>
                                            goToPage(galleries.current_page - 1)
                                        }
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-primary hover:text-white disabled:opacity-40"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    {Array.from(
                                        { length: galleries.last_page },
                                        (_, i) => i + 1,
                                    ).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition ${
                                                page === galleries.current_page
                                                    ? 'bg-secondary text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        disabled={
                                            galleries.current_page ===
                                            galleries.last_page
                                        }
                                        onClick={() =>
                                            goToPage(galleries.current_page + 1)
                                        }
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-primary hover:text-white disabled:opacity-40"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-24 text-center">
                            <Image className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                            <p className="text-lg text-gray-500">
                                Belum ada foto galeri
                            </p>
                        </div>
                    )}
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
