import { Link } from '@inertiajs/react';
import { route } from '@/helpers/route';
import { SchoolProfile } from '@/types';
import heroBg from '@/assets/images/background_hero.png';

interface HeroSectionProps {
    schoolProfile: SchoolProfile | null;
    stats: {
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
    const tagline =
        'Mewujudkan generasi yang cerdas, berkarakter, dan berprestasi dalam lingkungan belajar yang nyaman dan asri.';

    return (
        <section
            className="relative flex min-h-[85vh] items-center bg-cover bg-center md:min-h-[90vh]"
            style={{ backgroundImage: `url(${heroBg})` }}
        >
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-black/20" />
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
                <div className="max-w-2xl text-white">
                    <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm tracking-wide backdrop-blur-md">
                        Website Resmi
                    </span>

                    <h1 className="text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
                        {schoolName}
                    </h1>

                    <p className="mt-6 text-lg leading-relaxed text-white/90 md:text-xl">
                        {tagline}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <Link
                            href={route('public.ppdb')}
                            className="rounded-2xl bg-secondary px-8 py-3 font-semibold text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-secondary/90"
                        >
                            PPDB 2026
                        </Link>
                        <Link
                            href={route('public.profile')}
                            className="rounded-2xl border border-white/70 px-8 py-3 font-semibold text-white transition duration-300 hover:bg-white hover:text-primary"
                        >
                            Profil Sekolah
                        </Link>
                    </div>
                </div>
            </div>

            {/* White fade at bottom - matches frontend exactly */}
            <div className="absolute bottom-0 left-0 h-24 w-full bg-linear-to-b from-transparent to-white" />
        </section>
    );
}
