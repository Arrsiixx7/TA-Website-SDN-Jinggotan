import { VisionMission } from '@/types';

interface VisionMissionSectionProps {
    visionMission: VisionMission | null;
}

export default function VisionMissionSection({
    visionMission,
}: VisionMissionSectionProps) {
    if (!visionMission) return null;

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                        Tentang Sekolah
                    </h2>
                    <p className="mt-2 text-sm font-medium text-primary">
                        Visi & Misi
                    </p>
                </div>

                <div className="grid items-center gap-10 lg:grid-cols-2">
                    {/* Left: Image */}
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
                                    <div className="text-sm font-semibold text-primary">
                                        Preview Gambar
                                    </div>
                                    <p className="mt-1 text-xs text-gray-400">
                                        (nanti dari galeri)
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Vision & Mission Content */}
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
                                    .filter((item) => item.trim() !== '')
                                    .map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                                            <span>
                                                {item.replace(/^\d+\.\s*/, '')}
                                            </span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
