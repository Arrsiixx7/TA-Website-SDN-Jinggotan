import { Head } from '@inertiajs/react';
import { Teacher } from '@/types';
import { useState, useEffect } from 'react';

interface Props {
    principal: Teacher[];
    teachers: Teacher[];
    staff: Teacher[];
}

function GuruCard({ teacher }: { teacher: Teacher }) {
    const displayRole = teacher.class || teacher.position || teacher.role;
    return (
        <div className="overflow-hidden rounded-3xl bg-white text-center shadow">
            <div className="overflow-hidden">
                <img
                    src={
                        teacher.image_url || '/storage/images/default-user.png'
                    }
                    alt={teacher.name}
                    className="h-80 w-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            '/storage/images/default-user.png';
                    }}
                />
            </div>
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                    {teacher.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">
                    {displayRole}
                </p>
            </div>
        </div>
    );
}

export default function Teachers({ principal, teachers, staff }: Props) {
    const kepala = principal[0] || null;
    const totalGuru = (kepala ? 1 : 0) + teachers.length;
    const tendikCount = staff.length;
    const total = totalGuru + tendikCount;

    // Carousel state for GuruKelasSection
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (teachers.length === 0) return;
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % teachers.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [teachers.length]);

    const getPosition = (index: number) => {
        if (index === active) return 'center';
        if (index === (active - 1 + teachers.length) % teachers.length)
            return 'left';
        if (index === (active + 1) % teachers.length) return 'right';
        return 'hidden';
    };

    return (
        <>
            <Head title="Guru & Staff - SDN Jinggotan" />

            {/* GuruHero */}
            <section className="bg-linear-to-b from-primary-soft to-white pt-36 pb-24">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <span className="mb-6 inline-block rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">
                        Tenaga Pendidik
                    </span>
                    <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                        Guru & Tenaga{' '}
                        <span className="text-secondary">Kependidikan</span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        SD Negeri Jinggotan memiliki tenaga pendidik profesional
                        yang berdedikasi dalam membimbing, mendidik, dan
                        mengembangkan potensi siswa secara optimal.
                    </p>
                    <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-primary" />
                </div>
            </section>

            {/* GuruSummarySection */}
            <section className="bg-gray-50 py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg md:rounded-3xl md:p-10">
                            <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                {total}
                            </p>
                            <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-xs md:tracking-widest">
                                Total Tenaga Pendidik
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg md:rounded-3xl md:p-10">
                            <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                {kepala ? 1 : 0}
                            </p>
                            <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-xs md:tracking-widest">
                                Kepala Sekolah
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg md:rounded-3xl md:p-10">
                            <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                {teachers.length}
                            </p>
                            <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-xs md:tracking-widest">
                                Guru Kelas
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg md:rounded-3xl md:p-10">
                            <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                {tendikCount}
                            </p>
                            <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-xs md:tracking-widest">
                                Tenaga Kependidikan
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* KepalaSekolahSection */}
            {kepala && (
                <section className="bg-white py-16">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <p className="mb-2 text-sm font-medium text-primary">
                            Struktur Organisasi
                        </p>
                        <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
                            Kepala Sekolah
                        </h2>
                        <div className="mx-auto mb-8 h-1 w-16 rounded-full bg-primary" />
                        <div className="flex justify-center">
                            <div className="w-72">
                                <GuruCard teacher={kepala} />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* GuruKelasSection - Carousel */}
            {teachers.length > 0 && (
                <section className="relative overflow-hidden bg-gray-50 py-28">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-20 text-center">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Guru Kelas
                            </h2>
                            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
                        </div>
                        <div className="relative flex h-[500px] items-center justify-center">
                            {teachers.map((t, index) => {
                                const pos = getPosition(index);
                                return (
                                    <div
                                        key={t.id}
                                        className={`absolute transition-all duration-700 ${
                                            pos === 'center'
                                                ? 'z-30 translate-x-0 scale-110 opacity-100'
                                                : ''
                                        } ${
                                            pos === 'left'
                                                ? 'z-20 -translate-x-56 scale-90 opacity-40 blur-sm'
                                                : ''
                                        } ${
                                            pos === 'right'
                                                ? 'z-20 translate-x-56 scale-90 opacity-40 blur-sm'
                                                : ''
                                        } ${
                                            pos === 'hidden'
                                                ? 'pointer-events-none scale-75 opacity-0'
                                                : ''
                                        }`}
                                    >
                                        <div className="w-72">
                                            <GuruCard teacher={t} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* TendikSection */}
            {staff.length > 0 && (
                <section className="bg-white py-20 text-center">
                    <div className="mx-auto max-w-7xl px-6">
                        <h2 className="mb-12 text-3xl font-bold text-gray-900">
                            Tenaga Kependidikan
                        </h2>
                        <div className="mx-auto mb-8 h-1 w-16 rounded-full bg-primary" />
                        <div className="flex justify-center">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                {staff.map((s) => (
                                    <div key={s.id} className="w-72">
                                        <GuruCard teacher={s} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
