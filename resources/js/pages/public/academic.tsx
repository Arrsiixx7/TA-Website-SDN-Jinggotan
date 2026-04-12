import { Head, Link } from '@inertiajs/react';
import { AcademicContent, Program, Extracurricular, Facility } from '@/types';
import {
    ArrowRight,
    BookOpen,
    Monitor,
    HeartPulse,
    Trophy,
} from 'lucide-react';

interface Props {
    academicContents: AcademicContent[];
    programs: Program[];
    extracurriculars: Extracurricular[];
    facilities: Facility[];
}

export default function Academic({
    academicContents,
    programs,
    extracurriculars,
    facilities,
}: Props) {
    const kurikulum =
        academicContents && academicContents.length > 0
            ? academicContents.filter((c) => c.type === 'kurikulum')
            : [
                  {
                      id: 1,
                      title: 'Kurikulum Merdeka',
                      description:
                          'Kurikulum terbaru yang fokus pada pengembangan kompetensi dan karakter siswa',
                      image_url: null,
                  },
                  {
                      id: 2,
                      title: 'Kurikulum 2013',
                      description:
                          'Kurikulum dengan pendekatan tematik integratif',
                      image_url: null,
                  },
              ];

    const fasilitas =
        facilities && facilities.length > 0
            ? facilities
            : [
                  {
                      id: 1,
                      name: 'Perpustakaan',
                      description:
                          'Koleksi buku lengkap untuk menunjang pembelajaran',
                      image_url: null,
                      slug: 'perpustakaan',
                      category: 'pendukung',
                  },
                  {
                      id: 2,
                      name: 'Lab Komputer',
                      description:
                          'Fasilitas komputer modern untuk pembelajaran TIK',
                      image_url: null,
                      slug: 'lab-komputer',
                      category: 'akademik',
                  },
                  {
                      id: 3,
                      name: 'Ruang Kelas',
                      description:
                          '12 ruang kelas yang nyaman dan dilengkapi fasilitas belajar',
                      image_url: null,
                      slug: 'ruang-kelas',
                      category: 'akademik',
                  },
                  {
                      id: 4,
                      name: 'Ekstrakurikuler',
                      description:
                          'Berbagai kegiatan ekstrakurikuler untuk pengembangan bakat',
                      image_url: null,
                      slug: 'ekskul',
                      category: 'umum',
                  },
              ];

    return (
        <>
            <Head title="Akademik - SDN Jinggotan" />

            {/* AkademikHero */}
            <section className="bg-linear-to-b from-primary-soft to-white pt-40 pb-32">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <span className="mb-8 inline-block rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
                        Akademik
                    </span>
                    <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
                        Sistem Pendidikan{' '}
                        <span className="text-secondary">Berkualitas</span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        SD Negeri Jinggotan menerapkan sistem pembelajaran yang
                        adaptif, kolaboratif, dan berorientasi pada penguatan
                        karakter serta kompetensi siswa.
                    </p>
                    <div className="mx-auto mt-10 h-1 w-20 rounded-full bg-primary" />
                </div>
            </section>

            {/* KurikulumSection */}
            <section className="bg-white">
                <div className="mx-auto max-w-7xl space-y-20 px-6 py-24">
                    {kurikulum.map((k) => (
                        <div
                            key={k.id}
                            className="grid items-center gap-16 md:grid-cols-2"
                        >
                            {/* Image - always left */}
                            <div>
                                {k.image_url ? (
                                    <img
                                        src={k.image_url}
                                        alt={k.title}
                                        className="h-[420px] w-full rounded-3xl object-cover shadow-lg"
                                    />
                                ) : (
                                    <div className="h-[420px] w-full rounded-3xl bg-gray-100" />
                                )}
                            </div>
                            {/* Text - always right */}
                            <div>
                                <p className="mb-3 font-semibold text-primary">
                                    Kurikulum
                                </p>
                                <h2 className="mb-4 text-3xl font-bold text-gray-900">
                                    {k.title}
                                </h2>
                                <p className="text-lg text-gray-600">
                                    {k.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ProgramUnggulan */}
            {programs && programs.length > 0 && (
                <section className="bg-gray-50 py-24">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <div className="mb-16">
                            <span className="text-sm font-semibold text-primary">
                                Program Unggulan
                            </span>
                            <h2 className="mt-3 text-3xl font-bold text-gray-900">
                                Program Prioritas Sekolah
                            </h2>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            {programs.map((item) => (
                                <div
                                    key={item.id}
                                    className="overflow-hidden rounded-2xl bg-white shadow"
                                >
                                    {item.image_url ? (
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="h-48 w-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-48 w-full bg-gray-100" />
                                    )}
                                    <div className="p-6 text-left">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* EkstrakurikulerSection */}
            {extracurriculars && extracurriculars.length > 0 && (
                <section className="bg-white py-28">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-16 text-center">
                            <p className="mb-3 font-semibold text-primary">
                                Ekstrakurikuler
                            </p>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Kegiatan Pengembangan Minat & Bakat
                            </h2>
                            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-primary" />
                        </div>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {extracurriculars.map((item) => (
                                <div
                                    key={item.id}
                                    className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                                                <span className="text-4xl font-bold text-primary/30">
                                                    {item.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 text-center">
                                        <h3 className="text-base font-semibold text-gray-900">
                                            {item.name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FasilitasSection */}
            <section className="bg-gray-50 py-24">
                <div className="mx-auto max-w-7xl px-6">
                    {/* HEADER */}
                    <div className="mb-16 flex items-start justify-between">
                        <div className="flex-1 text-center">
                            <p className="mb-3 font-semibold text-primary">
                                Fasilitas
                            </p>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Fasilitas Pendukung Pembelajaran
                            </h2>
                            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-primary" />
                        </div>

                        {/* Lihat Semua Button */}
                        <Link
                            href="/ruang-kelas"
                            className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
                        >
                            Lihat Semua
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* FACILITY CARDS - Show 4 items from "Umum" category */}
                    <div className="grid gap-8 md:grid-cols-4">
                        {fasilitas
                            .filter((item) => item.category === 'umum')
                            .slice(0, 4)
                            .map((item, index) => {
                                // Icon mapping for facilities
                                const iconMap: Record<
                                    string,
                                    React.ElementType
                                > = {
                                    perpustakaan: BookOpen,
                                    'ruang-guru': Monitor,
                                    'ruang-kepala-sekolah': Monitor,
                                    uks: HeartPulse,
                                    'lapangan-olahraga': Trophy,
                                    'lab-komputer': Monitor,
                                };

                                const IconComponent =
                                    iconMap[item.slug] || BookOpen;

                                return (
                                    <Link
                                        key={item.id}
                                        href={`/fasilitas/${item.slug}`}
                                        className="group cursor-pointer rounded-3xl border border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        {/* Icon Container */}
                                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                                            <IconComponent className="h-7 w-7 text-primary" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="mb-2 font-semibold text-gray-900">
                                            {item.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm leading-relaxed text-gray-500">
                                            {item.description}
                                        </p>
                                    </Link>
                                );
                            })}
                    </div>
                </div>
            </section>
        </>
    );
}
