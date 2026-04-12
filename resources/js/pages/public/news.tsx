import { Head, Link, router } from '@inertiajs/react';
import { route } from '@/helpers/route';
import { News as NewsType, PaginatedData } from '@/types';
import {
    Newspaper,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Megaphone,
    ArrowRight,
} from 'lucide-react';

interface Props {
    news: PaginatedData<NewsType>;
}

export default function News({ news }: Props) {
    const featuredItem = news.data[0] || null;
    const gridItems = news.data.slice(1);

    const goToPage = (page: number) => {
        router.visit(route('public.news', { page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Head title="Berita - SDN Jinggotan" />

            {/* BeritaHero */}
            <section className="bg-linear-to-b from-primary-soft to-white pt-36 pb-24">
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <span className="mb-6 inline-block rounded-full bg-primary-soft px-5 py-2 text-sm font-semibold text-primary">
                        Berita Sekolah
                    </span>
                    <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                        Informasi & Kegiatan{' '}
                        <span className="text-secondary">Terbaru</span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        Ikuti berbagai kegiatan, prestasi, dan informasi terbaru
                        dari SD Negeri Jinggotan.
                    </p>
                    <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-primary" />
                </div>
            </section>

            {/* Featured News */}
            {featuredItem && (
                <section className="bg-white pb-12">
                    <div className="mx-auto max-w-6xl px-6">
                        <Link
                            href={route('public.news.show', {
                                slug: featuredItem.slug,
                            })}
                            className="group block cursor-pointer overflow-hidden rounded-3xl border border-primary/10 bg-gray-50 shadow-sm transition duration-300 hover:shadow-xl"
                        >
                            <div className="grid md:grid-cols-2">
                                <div className="overflow-hidden">
                                    {featuredItem.image_url ? (
                                        <img
                                            src={featuredItem.image_url}
                                            alt={featuredItem.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full min-h-70 w-full items-center justify-center bg-primary/5">
                                            <Megaphone className="h-16 w-16 text-primary/20" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-10">
                                    <p className="mb-3 text-sm text-primary">
                                        {new Date(
                                            featuredItem.created_at,
                                        ).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                    <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                                        {featuredItem.title}
                                    </h2>
                                    <p className="mb-6 line-clamp-3 text-gray-600">
                                        {featuredItem.content.length > 120
                                            ? `${featuredItem.content.slice(0, 120)}...`
                                            : featuredItem.content}
                                    </p>
                                    <span className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition duration-300 group-hover:bg-primary/90">
                                        Baca Selengkapnya
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* NewsGrid */}
            <section className="bg-white pb-32">
                <div className="mx-auto max-w-6xl px-6">
                    {gridItems.length > 0 ? (
                        <>
                            <div className="grid gap-10 md:grid-cols-3">
                                {gridItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={route('public.news.show', {
                                            slug: item.slug,
                                        })}
                                        className="group cursor-pointer overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                                    >
                                        <div className="overflow-hidden">
                                            {item.image_url ? (
                                                <img
                                                    src={item.image_url}
                                                    alt={item.title}
                                                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-52 w-full items-center justify-center bg-primary/5">
                                                    <Megaphone className="h-12 w-12 text-primary/20" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-2 flex items-center gap-1.5 text-xs text-primary">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {new Date(
                                                    item.created_at,
                                                ).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </div>
                                            <h3 className="line-clamp-2 font-semibold text-gray-900 transition group-hover:text-primary">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {news.last_page > 1 && (
                                <div className="mt-16 flex items-center justify-center gap-3">
                                    <button
                                        disabled={news.current_page === 1}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-primary hover:text-white disabled:opacity-40"
                                        onClick={() =>
                                            goToPage(news.current_page - 1)
                                        }
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    {Array.from(
                                        { length: news.last_page },
                                        (_, i) => i + 1,
                                    ).map((page) => (
                                        <button
                                            key={page}
                                            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition ${
                                                page === news.current_page
                                                    ? 'bg-secondary text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'
                                            }`}
                                            onClick={() => goToPage(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        disabled={
                                            news.current_page === news.last_page
                                        }
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-primary hover:text-white disabled:opacity-40"
                                        onClick={() =>
                                            goToPage(news.current_page + 1)
                                        }
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-24 text-center">
                            <Newspaper className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                            <p className="text-lg text-gray-500">
                                Belum ada berita
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
