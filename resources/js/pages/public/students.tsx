import { Head, Link } from '@inertiajs/react';
import { route } from '@/helpers/route';
import { ClassDistribution, Achievement } from '@/types';

interface Props {
    classDistributions: ClassDistribution[];
    stats: {
        total_students: number;
        male_students: number;
        female_students: number;
        total_classes: number;
    };
    studentAchievements: Achievement[];
}

export default function Students({
    classDistributions,
    stats,
    studentAchievements,
}: Props) {
    const totalStudents = stats?.total_students || 0;
    const maleStudents = stats?.male_students || 0;
    const femaleStudents = stats?.female_students || 0;
    const totalClasses = stats?.total_classes || 1;
    const avgPerClass = Math.round(totalStudents / totalClasses);

    return (
        <>
            <Head title="Data Siswa - SDN Jinggotan" />

            {/* SiswaHero */}
            <section className="bg-linear-to-b from-primary-soft to-white pt-40 pb-24">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <span className="mb-6 inline-block rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">
                        Peserta Didik
                    </span>
                    <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                        Data & Perkembangan{' '}
                        <span className="text-secondary">Siswa</span>
                    </h1>
                    <p className="mt-6 leading-relaxed text-gray-600">
                        Informasi jumlah peserta didik, distribusi kelas, dan
                        capaian prestasi siswa SD Negeri Jinggotan.
                    </p>
                    <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-primary" />
                </div>
            </section>

            {/* SiswaStats */}
            <section className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-primary/10 bg-gray-50 p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg md:rounded-3xl md:p-10">
                            <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                {totalStudents}
                            </p>
                            <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-sm">
                                Total Siswa
                            </p>
                        </div>
                        <div className="rounded-2xl border border-primary/10 bg-gray-50 p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg md:rounded-3xl md:p-10">
                            <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                {maleStudents}
                            </p>
                            <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-sm">
                                Laki-laki
                            </p>
                        </div>
                        <div className="rounded-2xl border border-primary/10 bg-gray-50 p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg md:rounded-3xl md:p-10">
                            <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                {femaleStudents}
                            </p>
                            <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-sm">
                                Perempuan
                            </p>
                        </div>
                        <div className="rounded-2xl border border-primary/10 bg-gray-50 p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg md:rounded-3xl md:p-10">
                            <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                {avgPerClass}
                            </p>
                            <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-sm">
                                Rata-rata / Kelas
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SiswaDistribution */}
            <section className="bg-gray-50 py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mb-14 text-center">
                        <p className="mb-3 font-semibold text-primary">
                            Distribusi Siswa
                        </p>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Jumlah Siswa per Tingkat
                        </h2>
                        <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-primary" />
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {classDistributions && classDistributions.length > 0
                            ? classDistributions.map((dist, idx) => (
                                  <div
                                      key={idx}
                                      className="rounded-3xl border border-primary/10 bg-white p-10 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                  >
                                      <h3 className="mb-2 text-lg text-gray-600">
                                          {dist.class_name}
                                      </h3>
                                      <p className="text-4xl font-bold text-primary">
                                          {dist.total_students}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                          Siswa
                                      </p>
                                  </div>
                              ))
                            : [
                                  'Kelas 1',
                                  'Kelas 2',
                                  'Kelas 3',
                                  'Kelas 4',
                                  'Kelas 5',
                                  'Kelas 6',
                              ].map((kelas, idx) => (
                                  <div
                                      key={idx}
                                      className="rounded-3xl border border-primary/10 bg-white p-10 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                  >
                                      <h3 className="mb-2 text-lg text-gray-600">
                                          {kelas}
                                      </h3>
                                      <p className="text-4xl font-bold text-gray-300">
                                          -
                                      </p>
                                      <p className="text-sm text-gray-500">
                                          Siswa
                                      </p>
                                  </div>
                              ))}
                    </div>
                </div>
            </section>

            {/* Prestasi Siswa */}
            {studentAchievements && studentAchievements.length > 0 && (
                <section className="bg-white py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="mb-14 text-center">
                            <p className="mb-3 font-semibold text-primary">
                                Prestasi Siswa
                            </p>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Capaian Terbaru Siswa
                            </h2>
                            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-primary" />
                        </div>
                        <div className="mb-10 grid grid-cols-3 gap-8">
                            <div className="rounded-2xl bg-gray-50 p-6 text-center">
                                <h3 className="text-3xl font-bold text-primary">
                                    {studentAchievements.length}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Total Prestasi
                                </p>
                            </div>
                            <div className="rounded-2xl bg-gray-50 p-6 text-center">
                                <h3 className="text-3xl font-bold text-primary">
                                    {
                                        studentAchievements.filter(
                                            (a) => a.category === 'Akademik',
                                        ).length
                                    }
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Akademik
                                </p>
                            </div>
                            <div className="rounded-2xl bg-gray-50 p-6 text-center">
                                <h3 className="text-3xl font-bold text-primary">
                                    {
                                        studentAchievements.filter(
                                            (a) =>
                                                a.category === 'Non Akademik',
                                        ).length
                                    }
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Non Akademik
                                </p>
                            </div>
                        </div>
                        <div className="mb-14 grid gap-10 md:grid-cols-3">
                            {studentAchievements.slice(0, 3).map((item) => (
                                <Link
                                    key={item.id}
                                    href={route('public.achievements.show', {
                                        id: item.id,
                                    })}
                                    className="group overflow-hidden rounded-3xl bg-gray-50 transition hover:-translate-y-2"
                                >
                                    <div className="overflow-hidden">
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt={item.title}
                                                className="h-52 w-full object-cover transition group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-52 w-full items-center justify-center bg-primary/5" />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-semibold">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="text-sm text-gray-500">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center">
                            <Link
                                href={route('public.achievements')}
                                className="rounded-xl bg-primary px-6 py-3 text-white"
                            >
                                Lihat Semua Prestasi
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
