import { Head } from '@inertiajs/react';
import {
    CalendarDays,
    CheckCircle,
    GraduationCap,
    School,
    Users,
    Trophy,
} from 'lucide-react';
import heroBg from '@/assets/images/background_hero.png';

export default function PPDB() {
    const alasan = [
        {
            icon: School,
            title: 'Lingkungan Nyaman',
            desc: 'Suasana belajar aman, asri, dan mendukung perkembangan anak.',
        },
        {
            icon: Users,
            title: 'Guru Berpengalaman',
            desc: 'Tenaga pendidik profesional dan berdedikasi tinggi.',
        },
        {
            icon: Trophy,
            title: 'Prestasi Siswa',
            desc: 'Aktif dalam berbagai lomba akademik dan non-akademik.',
        },
    ];

    const syarat = [
        'Fotokopi Akta Kelahiran',
        'Fotokopi Kartu Keluarga',
        'Pas foto ukuran 3x4 (2 lembar)',
        'Usia minimal 6 tahun',
    ];

    const alur = [
        { title: 'Isi Formulir Pendaftaran' },
        { title: 'Verifikasi Data' },
        { title: 'Konfirmasi Sekolah' },
        { title: 'Daftar Ulang' },
    ];

    return (
        <>
            <Head title="PPDB - SDN Jinggotan" />

            {/* PPDBHero - Type A (Dark Overlay with bg image) */}
            <section
                className="relative flex min-h-[85vh] items-center bg-cover bg-center pb-16 md:min-h-[90vh]"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-center text-white">
                    <div className="mx-auto max-w-3xl">
                        <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm tracking-wide backdrop-blur-md">
                            PPDB 2026
                        </span>
                        <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                            Penerimaan Peserta Didik Baru
                        </h1>
                        <p className="mt-6 text-lg leading-relaxed text-white/90 md:text-xl">
                            Bergabung bersama SD Negeri Jinggotan dan wujudkan
                            masa depan pendidikan terbaik untuk anak Anda.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <a
                                href="https://wa.me/628123456789"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-2xl bg-secondary px-8 py-3 font-semibold text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-secondary/90"
                            >
                                Daftar Sekarang
                            </a>
                            <a
                                href="#alur"
                                className="rounded-2xl border border-white/70 px-8 py-3 font-semibold text-white transition duration-300 hover:bg-white hover:text-primary"
                            >
                                Lihat Alur
                            </a>
                        </div>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm">
                            {[
                                'Terakreditasi A',
                                'Guru Profesional',
                                'Lingkungan Nyaman',
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2"
                                >
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                                        ✓
                                    </span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 h-24 w-full bg-linear-to-b from-transparent to-white" />
            </section>

            {/* PPDBHighlight - Overlapping */}
            <section className="relative z-30 -mt-16 pb-16">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {[
                            {
                                title: 'Pendaftaran',
                                value: 'Juni 2026',
                                icon: CalendarDays,
                                highlight: false,
                            },
                            {
                                title: 'Status',
                                value: 'Dibuka',
                                icon: CheckCircle,
                                highlight: true,
                            },
                            {
                                title: 'Jenjang',
                                value: 'Sekolah Dasar',
                                icon: GraduationCap,
                                highlight: false,
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="mb-4 flex justify-center">
                                    <div
                                        className={`rounded-xl p-2 ${
                                            item.highlight
                                                ? 'bg-green-100'
                                                : 'bg-primary/10'
                                        }`}
                                    >
                                        <item.icon
                                            className={`h-5 w-5 ${
                                                item.highlight
                                                    ? 'text-green-600'
                                                    : 'text-primary'
                                            }`}
                                        />
                                    </div>
                                </div>
                                <p className="mb-1 text-sm text-gray-500">
                                    {item.title}
                                </p>
                                <h3
                                    className={`text-xl font-bold ${
                                        item.highlight
                                            ? 'text-green-600'
                                            : 'text-gray-900'
                                    }`}
                                >
                                    {item.value}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* KenapaPilihKami */}
            <section className="bg-gray-50 py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                            Kenapa Pilih Kami?
                        </h2>
                        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {alasan.map((item, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="mb-5 flex justify-center">
                                    <div className="rounded-xl bg-primary/10 p-3">
                                        <item.icon className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                                <h4 className="mb-3 text-lg font-semibold text-gray-800">
                                    {item.title}
                                </h4>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PPDBSyarat */}
            <section className="bg-white py-24">
                <div className="mx-auto max-w-3xl px-6">
                    <div className="mx-auto mb-16 max-w-2xl text-center">
                        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                            Syarat Pendaftaran
                        </h2>
                        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
                    </div>
                    <div className="mx-auto grid max-w-3xl gap-5 md:grid-cols-2">
                        {syarat.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-6 py-5 transition duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="mt-1">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <span className="leading-relaxed text-gray-700">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PPDBAlur */}
            <section id="alur" className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-16 text-center">
                        <p className="mb-3 font-semibold text-primary">
                            Alur Pendaftaran
                        </p>
                        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                            Proses Pendaftaran PPDB
                        </h2>
                        <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-primary" />
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                        {alur.map((item, idx) => (
                            <div
                                key={idx}
                                className="rounded-3xl border border-primary/10 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary font-bold text-white">
                                    {idx + 1}
                                </div>
                                <p className="font-semibold text-gray-900">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
