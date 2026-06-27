import { Head, Link } from '@inertiajs/react';
import { route } from '@/helpers/route';
import { SchoolProfile, VisionMission, Teacher } from '@/types';
import {
    Users,
    BookOpen,
    Trophy,
    GraduationCap,
    ChevronRight,
    School,
    Calendar,
} from 'lucide-react';

interface Props {
    schoolProfile: SchoolProfile | null;
    visionMission: VisionMission | null;
    principal: Teacher | null;
    teachers: Teacher[];
    staff: Teacher[];
    timelines: any[];
}

export default function Profile({
    schoolProfile,
    visionMission,
    principal,
    teachers,
    staff,
    timelines = [],
}: Props) {
    const displayTimelines =
        timelines.length > 0
            ? timelines.map((t: any) => ({
                  year: t.year,
                  title: t.title,
                  desc: t.description || '',
              }))
            : [
                  {
                      year: '1998',
                      title: 'Sekolah Didirikan',
                      desc: 'SD Negeri Jinggotan resmi berdiri.',
                  },
                  {
                      year: '2005',
                      title: 'Akreditasi A',
                      desc: 'Memperoleh akreditasi A pertama.',
                  },
                  {
                      year: '2015',
                      title: 'Renovasi Gedung',
                      desc: 'Penambahan ruang kelas dan perpustakaan.',
                  },
                  {
                      year: '2023',
                      title: 'Sekolah Digital',
                      desc: 'Mulai pembelajaran berbasis teknologi.',
                  },
              ];

    return (
        <>
            <Head title="Profil - SDN Jinggotan" />

            {/* ProfileHero */}
            <section className="bg-linear-to-b from-primary-soft to-white pt-28 pb-20">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <span className="mb-6 inline-block rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">
                        Profil Sekolah
                    </span>
                    <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                        SD Negeri{' '}
                        <span className="text-secondary">Jinggotan</span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        Sekolah dasar yang berkomitmen membentuk generasi
                        cerdas, berkarakter, dan berprestasi melalui pendidikan
                        yang berkualitas dan lingkungan belajar yang nyaman.
                    </p>
                    <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-primary" />
                </div>
            </section>

            {/* PrincipalGreeting */}
            <section className="bg-white py-24">
                <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
                    {/* Image */}
                    <div className="flex justify-center lg:justify-start">
                        <div className="group relative">
                            <div className="absolute -inset-4 rounded-3xl bg-primary/20 opacity-60 blur-2xl transition duration-500 group-hover:opacity-80" />
                            {principal?.image ? (
                                <img
                                    src={principal.image_url}
                                    alt={principal.name}
                                    className="relative h-[460px] w-full max-w-md rounded-3xl object-cover shadow-2xl transition duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="relative flex h-[460px] w-full max-w-md items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-white shadow-2xl">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="rounded-full bg-white/80 p-6 shadow-lg">
                                            <Users className="h-32 w-32 text-primary/50" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Text */}
                    <div className="relative">
                        <span className="absolute -top-10 -left-6 text-[120px] leading-none font-bold text-primary/10 select-none">
                            &ldquo;
                        </span>
                        <h2 className="relative text-3xl font-bold text-gray-800 md:text-4xl">
                            Sambutan Kepala Sekolah
                        </h2>
                        <div className="my-6 h-1.5 w-24 rounded-full bg-primary" />
                        <div className="mb-8 text-lg leading-8 text-gray-600">
                            {(
                                schoolProfile?.principal_message ||
                                "Assalamu'alaikum warahmatullahi wabarakatuh.\n\nSelamat datang di website resmi SD Negeri Jinggotan. Website ini kami hadirkan sebagai sarana informasi, komunikasi, serta transparansi sekolah kepada seluruh masyarakat.\n\nKami berkomitmen untuk menciptakan lingkungan belajar yang aman, nyaman, dan menyenangkan demi membentuk generasi yang cerdas, berkarakter, serta berakhlak mulia.\n\nWassalamu'alaikum warahmatullahi wabarakatuh."
                            )
                                .split('\n')
                                .map((line, i) =>
                                    line.trim() === '' ? (
                                        <br key={i} />
                                    ) : (
                                        <span key={i}>
                                            {line}
                                            <br />
                                        </span>
                                    ),
                                )}
                        </div>
                        <div className="border-l-4 border-primary pl-5">
                            <h4 className="text-xl font-semibold text-primary">
                                {principal?.name || 'Ely Kusrini, S.Pd.'}
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                                {principal?.position ||
                                    'Kepala SD Negeri Jinggotan'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SchoolStats */}
            <section className="bg-gray-50 py-24">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <div className="mb-16">
                        <p className="mb-3 font-semibold tracking-wide text-primary">
                            Statistik
                        </p>
                        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                            Statistik Sekolah
                        </h2>
                        <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-primary" />
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <Link
                            href={route('public.students')}
                            className="group block cursor-pointer rounded-2xl border border-primary/10 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg md:rounded-3xl md:p-10"
                        >
                            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition group-hover:bg-primary/20 md:mb-4 md:h-12 md:w-12">
                                <Users className="h-5 w-5 text-primary md:h-6 md:w-6" />
                            </div>
                            <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                {schoolProfile?.total_students || 0}
                            </p>
                            <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-xs md:tracking-widest">
                                Siswa Aktif
                            </p>
                        </Link>
                        <Link
                            href={route('public.teachers')}
                            className="group block cursor-pointer rounded-2xl border border-primary/10 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg md:rounded-3xl md:p-10"
                        >
                            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition group-hover:bg-primary/20 md:mb-4 md:h-12 md:w-12">
                                <GraduationCap className="h-5 w-5 text-primary md:h-6 md:w-6" />
                            </div>
                            <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                {schoolProfile?.total_teachers || 0}
                            </p>
                            <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-xs md:tracking-widest">
                                Tenaga Pendidik
                            </p>
                        </Link>
                        <Link
                            href={route('public.classrooms')}
                            className="group block cursor-pointer rounded-2xl border border-primary/10 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg md:rounded-3xl md:p-10"
                        >
                            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition group-hover:bg-primary/20 md:mb-4 md:h-12 md:w-12">
                                <School className="h-5 w-5 text-primary md:h-6 md:w-6" />
                            </div>
                            <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                {schoolProfile?.total_classes || 0}
                            </p>
                            <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-xs md:tracking-widest">
                                Ruang Kelas
                            </p>
                        </Link>
                        <Link
                            href={route('public.achievements')}
                            className="group block cursor-pointer rounded-2xl border border-primary/10 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg md:rounded-3xl md:p-10"
                        >
                            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition group-hover:bg-primary/20 md:mb-4 md:h-12 md:w-12">
                                <Trophy className="h-5 w-5 text-primary md:h-6 md:w-6" />
                            </div>
                            <p className="mb-2 text-4xl font-extrabold text-primary md:mb-3 md:text-5xl">
                                {schoolProfile?.total_achievements || 0}
                            </p>
                            <p className="text-[10px] tracking-wider text-gray-500 uppercase md:text-xs md:tracking-widest">
                                Prestasi Diraih
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* SchoolHistory */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <p className="mb-2 text-sm font-semibold text-primary">
                        Sejarah
                    </p>
                    <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
                        Perjalanan Awal Sekolah
                    </h2>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600 md:text-base">
                        SD Negeri Jinggotan berdiri sejak tahun 1985 dan telah
                        menjadi bagian penting dalam mencerdaskan kehidupan
                        masyarakat sekitar.
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                        Dengan dukungan tenaga pendidik profesional dan
                        fasilitas yang terus berkembang, sekolah ini terus
                        berinovasi dalam memberikan pendidikan yang berkualitas
                        dan relevan dengan perkembangan zaman.
                    </p>
                </div>
            </section>

            {/* SchoolTimeline */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-12 text-center">
                        <p className="mb-2 text-sm font-semibold text-primary">
                            Timeline
                        </p>
                        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                            Perjalanan Sekolah
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Perkembangan SD Negeri Jinggotan dari masa ke masa
                        </p>
                    </div>

                    <div className="relative mx-auto max-w-4xl">
                        {/* Center vertical line for desktop */}
                        <div className="absolute top-0 left-1/2 hidden h-full w-0.5 -translate-x-1/2 bg-gray-200 md:block" />

                        {/* Mobile: Simple vertical list */}
                        <div className="space-y-4 md:space-y-8">
                            {displayTimelines.map((item, index) => (
                                <div key={index} className="relative">
                                    {/* Mobile card */}
                                    <div className="md:hidden">
                                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                            <span className="font-bold text-primary">
                                                {item.year}
                                            </span>
                                            <h4 className="mt-1 text-base font-semibold text-gray-900">
                                                {item.title}
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Desktop: alternating left-right with center dot */}
                                    <div className="relative hidden md:flex md:gap-0">
                                        {/* Left side */}
                                        {index % 2 === 0 ? (
                                            <div className="flex w-5/12 items-center justify-end pr-8">
                                                <div className="w-full rounded-xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                                                    <span className="font-bold text-primary">
                                                        {item.year}
                                                    </span>
                                                    <h4 className="mt-1 text-base font-semibold text-gray-900">
                                                        {item.title}
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-600">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex w-5/12 items-center justify-end pr-8">
                                                <div className="invisible w-full rounded-xl bg-white p-6 shadow-sm">
                                                    <span className="font-bold text-primary">
                                                        {item.year}
                                                    </span>
                                                    <h4 className="mt-1 text-base font-semibold text-gray-900">
                                                        {item.title}
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-600">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Center column with dot */}
                                        <div className="relative w-2/12">
                                            {/* Vertical line */}
                                            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gray-200" />
                                            {/* Dot centered vertically */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-white" />
                                            </div>
                                        </div>

                                        {/* Right side */}
                                        {index % 2 === 1 ? (
                                            <div className="flex w-5/12 items-center justify-start pl-8">
                                                <div className="w-full rounded-xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                                                    <span className="font-bold text-primary">
                                                        {item.year}
                                                    </span>
                                                    <h4 className="mt-1 text-base font-semibold text-gray-900">
                                                        {item.title}
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-600">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex w-5/12 items-center justify-start pl-8">
                                                <div className="invisible w-full rounded-xl bg-white p-6 shadow-sm">
                                                    <span className="font-bold text-primary">
                                                        {item.year}
                                                    </span>
                                                    <h4 className="mt-1 text-base font-semibold text-gray-900">
                                                        {item.title}
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-600">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* VisionMission */}
            {visionMission && (
                <section className="bg-white py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-12 text-center">
                            <p className="mt-2 text-sm font-medium text-primary">
                                Visi & Misi
                            </p>
                            <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                                Arah Pengembangan Sekolah
                            </h2>
                            <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-primary" />
                        </div>
                        <div className="grid items-center gap-10 lg:grid-cols-2">
                            {/* Image */}
                            <div className="group relative">
                                {visionMission.image_url ? (
                                    <img
                                        src={visionMission.image_url}
                                        alt="Visi & Misi"
                                        className="h-80 w-full rounded-3xl object-cover shadow-lg transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-80 w-full items-center justify-center rounded-3xl border border-primary/10 bg-linear-to-br from-primary/10 to-primary/5">
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-primary">
                                                Preview Gambar
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Right: Visi & Misi Cards */}
                            <div className="space-y-4">
                                {/* Visi Card */}
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                                    <h3 className="mb-2 text-base font-bold text-gray-800">
                                        Visi
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {visionMission.vision}
                                    </p>
                                </div>
                                {/* Misi Card */}
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                                    <h3 className="mb-2 text-base font-bold text-gray-800">
                                        Misi
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        {visionMission.mission
                                            .split('\n')
                                            .filter((i) => i.trim() !== '')
                                            .map((item, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-2"
                                                >
                                                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                                                    <span>
                                                        {item.replace(
                                                            /^\d+\.\s*/,
                                                            '',
                                                        )}
                                                    </span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* OrganizationStructure */}
            {(teachers.length > 0 || staff.length > 0 || principal) && (
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="relative mb-8 text-center md:mb-12">
                            <p className="mb-2 text-sm font-medium text-primary">
                                Struktur Organisasi
                            </p>
                            <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                                Tim Pengelola Sekolah
                            </h2>
                            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
                            {/* Lihat Semua Button - Desktop (top right) */}
                            <Link
                                href={route('public.teachers')}
                                className="absolute top-0 right-0 hidden rounded-lg bg-primary px-5 py-2 text-sm text-white transition hover:bg-primary/90 md:block"
                            >
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[principal, ...teachers.slice(0, 2)].map(
                                (person, idx) =>
                                    person && (
                                        <div
                                            key={idx}
                                            className="rounded-2xl bg-white p-6 text-center shadow transition duration-300 hover:-translate-y-2 hover:shadow-lg md:p-8"
                                        >
                                            <img
                                                src={
                                                    person.image_url ||
                                                    '/storage/images/default-user.png'
                                                }
                                                alt={person.name}
                                                className="mx-auto mb-4 h-24 w-24 rounded-full object-cover shadow-md transition duration-300 hover:scale-105"
                                                onError={(e) => {
                                                    (
                                                        e.target as HTMLImageElement
                                                    ).src =
                                                        '/storage/images/default-user.png';
                                                }}
                                            />
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {person.name}
                                            </h4>
                                            <p className="mt-1 text-sm font-medium text-primary">
                                                {idx === 0 && principal
                                                    ? 'Kepala Sekolah'
                                                    : person.position ||
                                                      person.role}
                                            </p>
                                        </div>
                                    ),
                            )}
                        </div>
                        {/* Lihat Semua Button - Mobile */}
                        <div className="flex justify-center pt-6 md:hidden">
                            <Link
                                href={route('public.teachers')}
                                className="rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
                            >
                                Lihat Semua
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
