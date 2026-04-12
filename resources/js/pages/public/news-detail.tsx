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
    ArrowLeft,
    Clock,
} from 'lucide-react';

interface Props {
    news: NewsType;
    relatedNews: NewsType[];
}

export default function NewsDetail({ news, relatedNews }: Props) {
    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    return (
        <>
            <Head title={`${news.title} - SDN Jinggotan`} />

            <section className="bg-linear-to-b from-primary-soft to-white py-16 pt-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main Article */}
                        <article className="lg:col-span-2">
                            {/* Breadcrumb */}
                            <nav className="mb-6 text-sm text-gray-500">
                                <Link
                                    href={route('public.home')}
                                    className="transition hover:text-primary"
                                >
                                    Beranda
                                </Link>
                                <span className="mx-2">/</span>
                                <Link
                                    href={route('public.news')}
                                    className="transition hover:text-primary"
                                >
                                    Berita
                                </Link>
                                <span className="mx-2">/</span>
                                <span className="text-gray-700">
                                    {news.title}
                                </span>
                            </nav>

                            {news.image_url && (
                                <img
                                    src={news.image_url}
                                    alt={news.title}
                                    className="mb-8 h-96 w-full rounded-2xl object-cover shadow-lg"
                                />
                            )}
                            <h1 className="mb-4 text-3xl leading-tight font-bold text-gray-900 md:text-4xl">
                                {news.title}
                            </h1>
                            <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    {formatDate(news.created_at)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    {Math.ceil(news.content.length / 1000)}{' '}
                                    menit baca
                                </span>
                            </div>
                            <div className="max-w-none leading-relaxed text-gray-700">
                                {news.content.split('\n').map(
                                    (paragraph, idx) =>
                                        paragraph.trim() && (
                                            <p
                                                key={idx}
                                                className="mb-4 break-words"
                                            >
                                                {paragraph}
                                            </p>
                                        ),
                                )}
                            </div>

                            {/* Back Link */}
                            <Link
                                href={route('public.news')}
                                className="mt-12 inline-flex items-center gap-2 text-primary transition hover:underline"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Kembali ke semua berita
                            </Link>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1">
                            {relatedNews.length > 0 && (
                                <div>
                                    <h3 className="mb-6 text-lg font-bold text-gray-900">
                                        Berita Terbaru
                                    </h3>
                                    <div className="space-y-4">
                                        {relatedNews.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={route(
                                                    'public.news.show',
                                                    {
                                                        slug: item.slug,
                                                    },
                                                )}
                                                className="group flex gap-4 rounded-xl p-3 transition hover:bg-primary/5"
                                            >
                                                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-primary/5">
                                                    {item.image_url ? (
                                                        <img
                                                            src={item.image_url}
                                                            alt={item.title}
                                                            className="h-full w-full object-cover transition group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center">
                                                            <Calendar className="h-5 w-5 text-primary/30" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs text-gray-400">
                                                        {formatDate(
                                                            item.created_at,
                                                        )}
                                                    </p>
                                                    <h4 className="line-clamp-2 text-sm font-medium text-gray-800 transition group-hover:text-primary">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}
