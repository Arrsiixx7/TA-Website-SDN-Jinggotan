import { Head, Link } from '@inertiajs/react';
import { route } from '@/helpers/route';
import { ArrowLeft, Calendar } from 'lucide-react';

interface Props {
    achievement: any;
}

export default function AchievementDetail({ achievement }: Props) {
    return (
        <>
            <Head title={`${achievement.title} - SDN Jinggotan`} />

            {/* Hero Section */}
            <section className="bg-linear-to-b from-primary-soft to-white pt-36 pb-0">
                <div className="mx-auto max-w-4xl px-6">
                    {/* Back Button - Top Left */}
                    <Link
                        href={route('public.achievements')}
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:underline"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Prestasi
                    </Link>

                    {/* Content - Center */}
                    <div className="text-center">
                        <span className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-primary shadow-sm">
                            {achievement.category}
                        </span>
                        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                            {achievement.title}
                        </h1>
                        {achievement.created_at && (
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    {new Date(
                                        achievement.created_at,
                                    ).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="bg-white py-8">
                <div className="mx-auto max-w-4xl px-6">
                    {achievement.image_url && (
                        <img
                            src={achievement.image_url}
                            alt={achievement.title}
                            className="mb-10 h-80 w-full rounded-2xl object-cover shadow-md md:h-96"
                        />
                    )}
                    {/* Auto-paragraph description */}
                    <div className="prose prose-lg max-w-none text-gray-700">
                        {achievement.description
                            ?.split('\n')
                            .map((paragraph: string, index: number) =>
                                paragraph.trim() ? (
                                    <p key={index} className="mb-4 last:mb-0">
                                        {paragraph}
                                    </p>
                                ) : null,
                            )}
                    </div>
                </div>
            </section>
        </>
    );
}
