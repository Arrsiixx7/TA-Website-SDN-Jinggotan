import { Head, Link, router } from '@inertiajs/react';
import { route } from '@/helpers/route';
import { Achievement as AchievementType, PaginatedData } from '@/types';
import {
    Trophy,
    ChevronLeft,
    ChevronRight,
    Search,
    Award,
    Medal,
    Star,
} from 'lucide-react';
import { useState, useMemo } from 'react';

interface Props {
    achievements: PaginatedData<AchievementType>;
}

export default function Achievements({ achievements }: Props) {
    const [filter, setFilter] = useState<string>('Semua');
    const [search, setSearch] = useState<string>('');

    const filteredData = useMemo(() => {
        return achievements.data.filter((item) => {
            const matchFilter = filter === 'Semua' || item.category === filter;
            const matchSearch =
                search === '' ||
                item.title.toLowerCase().includes(search.toLowerCase());
            return matchFilter && matchSearch;
        });
    }, [achievements.data, filter, search]);

    // Stats from data
    const stats = useMemo(() => {
        const total = achievements.data.length;
        const akademik = achievements.data.filter(
            (a) => a.category === 'Akademik',
        ).length;
        const nonAkademik = achievements.data.filter(
            (a) => a.category === 'Non Akademik',
        ).length;
        return { total, akademik, nonAkademik };
    }, [achievements.data]);

    const goToPage = (page: number) => {
        router.visit(route('public.achievements', { page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filters = ['Semua', 'Akademik', 'Non Akademik'];

    return (
        <>
            <Head title="Prestasi - SDN Jinggotan" />

            {/* PrestasiHero */}
            <section className="bg-linear-to-b from-primary-soft to-white pt-40 pb-24">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <span className="mb-6 inline-block rounded-full bg-primary-soft px-5 py-2 text-sm font-semibold text-primary">
                        Prestasi Sekolah
                    </span>
                    <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                        Pencapaian & Penghargaan{' '}
                        <span className="text-secondary">Siswa</span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        Berbagai prestasi akademik dan non-akademik yang telah
                        diraih oleh siswa-siswi SD Negeri Jinggotan.
                    </p>
                    <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-primary" />
                </div>
            </section>

            {/* Stats */}
            {stats.total > 0 && (
                <section className="bg-gray-50 py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            <div className="rounded-2xl border border-primary/10 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg md:rounded-3xl md:p-8">
                                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 md:h-12 md:w-12">
                                    <Trophy className="h-5 w-5 text-primary md:h-6 md:w-6" />
                                </div>
                                <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                    {stats.total}
                                </p>
                                <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-xs">
                                    Total Prestasi
                                </p>
                            </div>
                            <div className="rounded-2xl border border-primary/10 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg md:rounded-3xl md:p-8">
                                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 md:h-12 md:w-12">
                                    <Award className="h-5 w-5 text-primary md:h-6 md:w-6" />
                                </div>
                                <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                    {stats.akademik}
                                </p>
                                <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-xs">
                                    Akademik
                                </p>
                            </div>
                            <div className="rounded-2xl border border-primary/10 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg md:rounded-3xl md:p-8">
                                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 md:h-12 md:w-12">
                                    <Medal className="h-5 w-5 text-primary md:h-6 md:w-6" />
                                </div>
                                <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                    {stats.nonAkademik}
                                </p>
                                <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-xs">
                                    Non Akademik
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Filter & Search */}
            <section className="bg-white py-12">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Search */}
                    <div className="mb-6 flex justify-center">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari prestasi..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-full border border-gray-300 bg-white py-3 pr-5 pl-11 text-sm text-gray-800 placeholder-gray-400 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {filters.map((item) => (
                            <button
                                key={item}
                                onClick={() => setFilter(item)}
                                className={`rounded-full border border-primary/20 px-6 py-2.5 text-sm font-medium transition duration-300 ${
                                    filter === item
                                        ? 'bg-primary text-white'
                                        : 'text-gray-700 hover:bg-primary hover:text-white'
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* PrestasiGrid */}
            <section className="bg-white pb-32">
                <div className="mx-auto max-w-6xl px-6">
                    {filteredData.length > 0 ? (
                        <div className="grid gap-10 md:grid-cols-3">
                            {filteredData.map((item) => (
                                <Link
                                    key={item.id}
                                    href={route('public.achievements.show', {
                                        id: item.id,
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
                                            <div className="flex h-52 w-full items-center justify-center bg-linear-to-br from-primary/5 to-primary/10">
                                                <Star className="h-12 w-12 text-primary/20" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                            {item.category}
                                        </span>
                                        <h3 className="mt-3 line-clamp-2 text-lg leading-snug font-semibold text-gray-900 transition group-hover:text-primary">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 text-center">
                            <Trophy className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                            <p className="text-lg text-gray-500">
                                Prestasi tidak ditemukan
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {achievements.last_page > 1 && (
                        <div className="mt-16 flex items-center justify-center gap-3">
                            <button
                                disabled={achievements.current_page === 1}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-primary hover:text-white disabled:opacity-40"
                                onClick={() =>
                                    goToPage(achievements.current_page - 1)
                                }
                            >
                                <ChevronLeft size={18} />
                            </button>
                            {Array.from(
                                { length: achievements.last_page },
                                (_, i) => i + 1,
                            ).map((page) => (
                                <button
                                    key={page}
                                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition ${
                                        page === achievements.current_page
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
                                    achievements.current_page ===
                                    achievements.last_page
                                }
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-primary hover:text-white disabled:opacity-40"
                                onClick={() =>
                                    goToPage(achievements.current_page + 1)
                                }
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
