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
                {/* HEADER */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                        Visi & Misi
                    </h2>
                    <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary"></div>
                </div>

                <div className="grid items-center gap-10 lg:grid-cols-2">
                    {/* LEFT: IMAGE */}
                    <div className="group relative">
                        {visionMission.image_url ? (
                            <img
                                src={visionMission.image_url}
                                alt="Visi & Misi"
                                className="h-[320px] w-full rounded-3xl object-cover shadow-lg transition duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="flex h-[320px] w-full items-center justify-center rounded-3xl border border-primary/10 bg-linear-to-br from-primary/10 to-primary/5">
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

                    {/* RIGHT */}
                    <div className="space-y-6">
                        {/* VISI */}
                        <div className="rounded-2xl border border-primary/10 bg-gray-50 p-6 shadow-sm transition duration-300 hover:shadow-md">
                            <h3 className="mb-3 text-xl font-bold text-gray-800">
                                Visi
                            </h3>

                            <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                                {visionMission.vision}
                            </p>
                        </div>

                        {/* MISI */}
                        <div className="rounded-2xl border border-primary/10 bg-gray-50 p-6 shadow-sm transition duration-300 hover:shadow-md">
                            <h3 className="mb-3 text-xl font-bold text-gray-800">
                                Misi
                            </h3>

                            <ul className="space-y-2 text-sm text-gray-600 md:text-base">
                                {visionMission.mission
                                    .split('\n')
                                    .filter((item) => item.trim())
                                    .map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="mt-1 text-xs text-primary">
                                                ●
                                            </span>
                                            <span>{item}</span>
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
