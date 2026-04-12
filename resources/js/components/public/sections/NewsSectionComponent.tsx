import { Link } from '@inertiajs/react';
import { route } from '@/helpers/route';
import { News } from '@/types';
import { Megaphone, Calendar } from 'lucide-react';

interface NewsSectionComponentProps {
    news: News[];
}

export default function NewsSectionComponent({
    news,
}: NewsSectionComponentProps) {
    if (news.length === 0) return null;

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Berita Terbaru
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Informasi dan kegiatan terbaru sekolah
                        </p>
                    </div>
                    <Link
                        href={route('public.news')}
                        className="rounded-xl bg-primary px-5 py-2 text-sm text-white transition hover:bg-primary/90"
                    >
                        Lihat Semua
                    </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
