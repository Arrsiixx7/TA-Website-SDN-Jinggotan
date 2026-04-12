import { Link } from '@inertiajs/react';
import { route } from '@/helpers/route';
import { SchoolProfile } from '@/types';
import { Users, GraduationCap, Trophy, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
    schoolProfile?: SchoolProfile | null;
    stats?: {
        total_students: number;
        total_teachers: number;
        total_achievements: number;
    };
}

export default function HeroSection({
    schoolProfile,
    stats,
}: HeroSectionProps) {
    const schoolName = schoolProfile?.name || 'SD Negeri Jinggotan';

    return (
        <section className="relative overflow-hidden bg-linear-to-b from-primary-soft to-white pt-36 pb-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <span className="mb-6 inline-block rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
                            Selamat Datang
                        </span>
                        <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl">
                            {schoolName}
                        </h1>
                        <p className="mt-6 text-lg leading-relaxed text-gray-600">
                            SD Negeri Jinggotan berkomitmen untuk memberikan
                            pendidikan berkualitas dan membentuk generasi yang
                            cerdas, berkarakter, dan berprestasi.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <Link
                                href={route('public.ppdb')}
                                className="inline-flex items-center rounded-xl bg-secondary px-8 py-3 text-base font-semibold text-white shadow-md transition hover:bg-secondary/90"
                            >
                                Daftar Sekarang
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href={route('public.profile')}
                                className="inline-flex items-center rounded-xl border-2 border-primary px-8 py-3 text-base font-semibold text-primary transition hover:bg-primary hover:text-white"
                            >
                                Tentang Kami
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                                {stats?.total_students || 0}
                            </p>
                            <p className="text-xs text-gray-600">Siswa Aktif</p>
                        </div>
                        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                <GraduationCap className="h-6 w-6 text-green-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                                {stats?.total_teachers || 0}
                            </p>
                            <p className="text-xs text-gray-600">Guru</p>
                        </div>
                        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                                <Trophy className="h-6 w-6 text-yellow-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                                {stats?.total_achievements || 0}
                            </p>
                            <p className="text-xs text-gray-600">Prestasi</p>
                        </div>
                        <div className="hidden rounded-xl bg-white p-6 text-center shadow-sm lg:block">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                                {schoolProfile?.total_classes || 0}
                            </p>
                            <p className="text-xs text-gray-600">Kelas</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
