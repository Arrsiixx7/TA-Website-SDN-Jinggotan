import { Link } from '@inertiajs/react';
import { route } from '@/helpers/route';
import { News } from '@/types';
import { Megaphone } from 'lucide-react';

interface NewsSectionProps {
    news: News[];
}

export default function NewsSection({ news }: NewsSectionProps) {
    if (news.length === 0) return null;

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="relative mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                            Berita Terbaru
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Informasi dan kegiatan terbaru sekolah
                        </p>
                    </div>
                    {/* Lihat Semua Button - Desktop (top right) */}
                    <div className="absolute top-0 right-0 hidden md:block">
                        <Link
                            href={route('public.news')}
                            className="rounded-xl bg-primary px-5 py-2 text-sm text-white transition hover:bg-primary/90"
                        >
                            Lihat Semua
                        </Link>
                    </div>
                </div>

                {/* Mobile: Vertical Cards */}
                <div className="grid gap-4 md:hidden">
                    {news.slice(0, 3).map((item) => (
                        <Link
                            key={item.id}
                            href={route('public.news.show', {
                                slug: item.slug,
                            })}
                            className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
                        >
                            <div className="overflow-hidden">
                                {item.image_url ? (
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-48 w-full items-center justify-center bg-gray-100">
                                        <Megaphone className="h-10 w-10 text-gray-300" />
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-800">
                                    {item.title}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {item.content}
                                </p>
                                <span className="mt-3 inline-block text-sm font-semibold text-primary">
                                    Baca selengkapnya &rarr;
                                </span>
                            </div>
                        </Link>
                    ))}

                    {/* Lihat Semua Button - Mobile */}
                    <div className="flex justify-center pt-2">
                        <Link
                            href={route('public.news')}
                            className="rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
                        >
                            Lihat Semua Berita
                        </Link>
                    </div>
                </div>

                {/* Desktop: Grid Layout */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                    {news.slice(0, 3).map((item) => (
                        <Link
                            key={item.id}
                            href={route('public.news.show', {
                                slug: item.slug,
                            })}
                            className="group overflow-hidden rounded-2xl bg-gray-50 shadow-sm transition hover:shadow-md"
                        >
                            <div className="overflow-hidden">
                                {item.image_url ? (
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-48 w-full items-center justify-center bg-gray-100">
                                        <Megaphone className="h-10 w-10 text-gray-300" />
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="mb-1 line-clamp-2 font-semibold text-gray-800">
                                    {item.title}
                                </h3>
                                <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                                    {item.content}
                                </p>
                                <span className="mt-4 text-sm font-semibold text-primary">
                                    Baca selengkapnya &rarr;
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
