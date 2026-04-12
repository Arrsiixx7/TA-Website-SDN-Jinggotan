import { Link } from '@inertiajs/react';
import { route } from '@/helpers/route';
import { GraduationCap, CalendarDays, Megaphone, Trophy } from 'lucide-react';

const features = [
    {
        icon: GraduationCap,
        title: 'Profil Sekolah',
        desc: 'Informasi lengkap mengenai sejarah, visi misi, dan struktur organisasi SD Negeri Jinggotan.',
        href: route('public.profile'),
    },
    {
        icon: CalendarDays,
        title: 'Kalender Akademik',
        desc: 'Jadwal kegiatan belajar, ujian, serta agenda penting sekolah.',
        href: route('public.academic'),
    },
    {
        icon: Megaphone,
        title: 'Pengumuman',
        desc: 'Informasi resmi terbaru untuk siswa, guru, dan wali murid.',
        href: route('public.news'),
    },
    {
        icon: Trophy,
        title: 'Prestasi',
        desc: 'Berbagai pencapaian siswa dalam bidang akademik dan non-akademik.',
        href: route('public.achievements'),
    },
];

export default function FeatureGrid() {
    return (
        <section className="relative z-30 -mt-16 pb-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((item, i) => (
                        <div
                            key={i}
                            className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            {/* ICON */}
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition duration-300 group-hover:bg-primary group-hover:text-white">
                                <item.icon size={24} strokeWidth={2} />
                            </div>

                            {/* TITLE */}
                            <h3 className="mb-2 text-lg font-semibold text-gray-800">
                                {item.title}
                            </h3>

                            {/* DESC */}
                            <p className="mb-5 text-sm leading-relaxed text-gray-600">
                                {item.desc}
                            </p>

                            {/* LINK */}
                            <Link
                                href={item.href}
                                className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3"
                            >
                                Selengkapnya →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
