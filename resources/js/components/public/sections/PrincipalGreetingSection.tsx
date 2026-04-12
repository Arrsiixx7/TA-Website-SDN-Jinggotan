import { SchoolProfile, Teacher } from '@/types';

interface PrincipalGreetingSectionProps {
    principal: Teacher | null;
    schoolProfile?: SchoolProfile | null;
}

export default function PrincipalGreetingSection({
    principal,
    schoolProfile,
}: PrincipalGreetingSectionProps) {
    // Gunakan data dari database jika ada, jika tidak pakai default
    const principalName = principal?.name || 'Ely Kusrini, S.Pd.';
    const principalPosition =
        principal?.position ||
        `Kepala ${schoolProfile?.name || 'SD Negeri Jinggotan'}`;
    const principalImage =
        principal?.image_url || '/storage/images/default-user.png';
    const greeting =
        schoolProfile?.principal_message ||
        "Assalamu'alaikum warahmatullahi wabarakatuh.\n\nSelamat datang di website resmi SD Negeri Jinggotan. Website ini kami hadirkan sebagai sarana informasi, komunikasi, serta transparansi sekolah kepada seluruh masyarakat.\n\nKami berkomitmen untuk menciptakan lingkungan belajar yang aman, nyaman, dan menyenangkan demi membentuk generasi yang cerdas, berkarakter, serta berakhlak mulia.\n\nWassalamu'alaikum warahmatullahi wabarakatuh.";

    const formatGreeting = (text: string) => {
        return text.split('\n').map((line, i) =>
            line === '' ? (
                <br key={i} />
            ) : (
                <span key={i}>
                    {line}
                    <br />
                </span>
            ),
        );
    };

    return (
        <section className="relative overflow-hidden bg-linear-to-b from-primary/5 via-white to-white py-24">
            <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
                {/* Foto */}
                <div className="flex justify-center lg:justify-start">
                    <div className="group relative">
                        {/* Glow Effect */}
                        <div className="absolute -inset-4 rounded-3xl bg-primary/20 opacity-60 blur-2xl transition duration-500 group-hover:opacity-80" />

                        <img
                            src={principalImage}
                            alt={principalName}
                            className="relative h-115 w-full max-w-md rounded-3xl object-cover shadow-2xl transition duration-500 group-hover:scale-105"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    '/storage/images/default-user.png';
                            }}
                        />
                    </div>
                </div>

                {/* Teks */}
                <div className="relative">
                    {/* Decorative Quote */}
                    <span className="absolute -top-10 -left-6 text-[120px] leading-none font-bold text-primary/10 select-none">
                        &ldquo;
                    </span>

                    <h2 className="relative text-3xl font-bold text-gray-800 md:text-4xl">
                        Sambutan Kepala Sekolah
                    </h2>

                    {/* Accent Line */}
                    <div className="my-6 h-1.5 w-24 rounded-full bg-primary" />

                    <p className="mb-8 text-lg leading-8 text-gray-600">
                        {formatGreeting(greeting)}
                    </p>

                    {/* Nama Kepala Sekolah */}
                    <div className="border-l-4 border-primary pl-5">
                        <p className="text-xl font-semibold text-primary">
                            {principalName}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            {principalPosition}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
