import { Head } from '@inertiajs/react';
import { Facility, RoomFacility } from '@/types';
import { useState } from 'react';
import {
    BookOpen,
    Monitor,
    HeartPulse,
    Trophy,
    Users,
    Building2,
    GraduationCap,
} from 'lucide-react';

interface Props {
    facilities: Facility[];
    roomFacilities: RoomFacility[];
}

// Icon mapping for facilities
const iconMap: Record<string, React.ElementType> = {
    perpustakaan: BookOpen,
    'ruang-guru': Monitor,
    'ruang-kepala-sekolah': Building2,
    uks: HeartPulse,
    'lapangan-olahraga': Trophy,
    'lab-komputer': Monitor,
    'ruang-kelas': GraduationCap,
};

// Default icon
const DefaultIcon = Users;

export default function Classrooms({ facilities, roomFacilities }: Props) {
    console.log('roomFacilities:', roomFacilities);
    console.log('roomFacilities count:', roomFacilities?.length);

    const [activeCategory, setActiveCategory] = useState<string>('all');

    // Get all unique categories (backend already normalized to lowercase)
    const categories = Array.from(
        new Set(facilities.map((f) => f.category || 'umum')),
    );

    // Filter facilities by category
    const filteredFacilities =
        activeCategory === 'all'
            ? facilities
            : facilities.filter(
                  (f) => (f.category || 'umum') === activeCategory,
              );

    // Calculate stats
    const stats = {
        kelas: facilities.filter(
            (f) =>
                f.category === 'kelas' ||
                f.name.toLowerCase().includes('kelas'),
        ).length,
        lab: facilities.filter(
            (f) =>
                f.name.toLowerCase().includes('lab') ||
                f.name.toLowerCase().includes('komputer'),
        ).length,
        perpustakaan: facilities.filter(
            (f) =>
                f.name.toLowerCase().includes('perpustakaan') ||
                f.name.toLowerCase().includes('buku'),
        ).length,
    };

    return (
        <>
            <Head title="Ruang Kelas - SDN Jinggotan" />

            {/* RuangHero */}
            <section className="bg-linear-to-b from-primary-soft to-white pt-40 pb-28">
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <p className="mb-4 font-semibold tracking-wide text-primary">
                        Fasilitas Akademik
                    </p>
                    <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
                        Ruang Kelas & Sarana Pembelajaran
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-gray-600">
                        Lingkungan belajar yang nyaman, bersih, dan mendukung
                        proses pembelajaran siswa secara optimal dengan
                        fasilitas yang memadai untuk menunjang kegiatan belajar
                        mengajar.
                    </p>
                    <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-primary" />
                </div>
            </section>

            {/* RuangStats */}
            <section className="bg-gray-50 py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        <div className="rounded-3xl border border-primary/10 bg-white p-10 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <p className="mb-3 text-4xl font-extrabold text-primary">
                                {stats.kelas || 7}
                            </p>
                            <p className="text-sm tracking-wide text-gray-500">
                                Ruang Kelas
                            </p>
                        </div>
                        <div className="rounded-3xl border border-primary/10 bg-white p-10 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <p className="mb-3 text-4xl font-extrabold text-primary">
                                {stats.lab || 1}
                            </p>
                            <p className="text-sm tracking-wide text-gray-500">
                                Lab Komputer
                            </p>
                        </div>
                        <div className="rounded-3xl border border-primary/10 bg-white p-10 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <p className="mb-3 text-4xl font-extrabold text-primary">
                                {stats.perpustakaan || 1}
                            </p>
                            <p className="text-sm tracking-wide text-gray-500">
                                Perpustakaan
                            </p>
                        </div>
                        <div className="rounded-3xl border border-primary/10 bg-white p-10 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <p className="mb-3 text-4xl font-extrabold text-primary">
                                100<span className="ml-1 text-2xl">%</span>
                            </p>
                            <p className="text-sm tracking-wide text-gray-500">
                                Layak Pakai
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facility Cards with Filter */}
            <section className="bg-white py-28">
                <div className="mx-auto max-w-6xl px-6">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <p className="mb-3 font-semibold text-primary">
                            Fasilitas
                        </p>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Daftar Fasilitas Sekolah
                        </h2>
                        <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-primary" />
                    </div>

                    {/* Filter Tabs */}
                    <div className="mb-12 flex justify-center gap-3">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`rounded-full px-6 py-2.5 font-medium transition-all ${
                                activeCategory === 'all'
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Semua
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-full px-6 py-2.5 font-medium capitalize transition-all ${
                                    activeCategory === category
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {category === 'umum'
                                    ? 'Umum'
                                    : category === 'akademik'
                                      ? 'Akademik'
                                      : category === 'kelas'
                                        ? 'Kelas'
                                        : category}
                            </button>
                        ))}
                    </div>

                    {/* Facility Cards Grid - Same style as academic.tsx */}
                    <div className="grid gap-8 md:grid-cols-4">
                        {filteredFacilities.map((facility) => {
                            const IconComponent =
                                iconMap[facility.slug] || DefaultIcon;

                            return (
                                <div
                                    key={facility.id}
                                    className="group cursor-pointer rounded-3xl border border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    {/* Icon Container */}
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                                        <IconComponent className="h-7 w-7 text-primary" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="mb-2 font-semibold text-gray-900">
                                        {facility.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm leading-relaxed text-gray-500">
                                        {facility.description || '1 Ruang'}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* RuangFasilitasSection */}
            <section className="bg-gray-50 py-28">
                <div className="mx-auto max-w-6xl px-6">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <p className="mb-3 font-semibold text-primary">
                            Standar Fasilitas
                        </p>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Fasilitas dalam Setiap Ruang
                        </h2>
                        <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-primary" />
                        <p className="mx-auto mt-6 max-w-2xl text-gray-600">
                            Setiap ruang kelas dilengkapi dengan fasilitas
                            standar untuk menunjang proses pembelajaran yang
                            optimal
                        </p>
                    </div>

                    {/* Room Facilities Grid from Database */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {roomFacilities.map((item, idx) => {
                            // Icon mapping for room facilities
                            const facilityIcons: Record<
                                string,
                                React.ElementType
                            > = {
                                chair: BookOpen,
                                board: Monitor,
                                projector: Monitor,
                                sun: Trophy,
                                book: BookOpen,
                                fan: Users,
                                default: Users,
                            };
                            const IconComponent =
                                facilityIcons[item.icon_key || 'default'] ||
                                Users;

                            return (
                                <div
                                    key={item.id}
                                    className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
                                >
                                    {/* Icon */}
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 transition-all duration-300 group-hover:from-primary/20 group-hover:to-primary/10">
                                        <IconComponent className="h-6 w-6 text-primary" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">
                                            {item.name}
                                        </h3>
                                        {item.description && (
                                            <p className="mt-1 text-sm text-gray-500">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Check indicator */}
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                        <svg
                                            className="h-3.5 w-3.5 text-primary"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
