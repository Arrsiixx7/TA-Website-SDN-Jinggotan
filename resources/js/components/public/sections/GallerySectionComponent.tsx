import { Link } from '@inertiajs/react';
import { route } from '@/helpers/route';
import { Gallery } from '@/types';
import { Trophy } from 'lucide-react';

interface GallerySectionComponentProps {
    galleries: Gallery[];
}

export default function GallerySectionComponent({
    galleries,
}: GallerySectionComponentProps) {
    if (galleries.length === 0) return null;

    return (
        <section className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Galeri Kegiatan
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Dokumentasi aktivitas sekolah
                        </p>
                    </div>
                    <Link
                        href={route('public.gallery')}
                        className="rounded-xl bg-primary px-5 py-2 text-sm text-white transition hover:bg-primary/90"
                    >
                        Lihat Semua
                    </Link>
                </div>
                {/* MAIN */}
                <div className="mb-10">
                    <div className="group relative overflow-hidden rounded-3xl">
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
                    </div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {galleries.slice(1, 5).map((gallery) => (
                        <div
                            key={gallery.id}
                            className="group overflow-hidden rounded-xl"
                        >
                            {gallery.image_url ? (
                                <img
                                    src={gallery.image_url}
                                    alt={gallery.title || 'Gallery'}
                                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex aspect-[4/3] w-full items-center justify-center bg-gray-100">
                                    <Trophy className="h-8 w-8 text-gray-300" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
