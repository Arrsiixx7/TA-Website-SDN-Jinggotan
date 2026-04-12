import { Head } from '@inertiajs/react';
import { Trophy } from 'lucide-react';

interface Props {
    achievement: any;
}

export default function AchievementDetail({ achievement }: Props) {
    return (
        <>
            <Head title={`${achievement.title} - SDN Jinggotan`} />
            <section className="bg-white py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {achievement.image_url && (
                        <img
                            src={achievement.image_url}
                            alt={achievement.title}
                            className="mb-8 h-96 w-full rounded-xl object-cover"
                        />
                    )}
                    <span className="mb-4 inline-block rounded-full bg-primary-soft px-3 py-1 text-primary">
                        {achievement.category}
                    </span>
                    <h1 className="mb-6 text-4xl font-bold text-gray-900">
                        {achievement.title}
                    </h1>
                    <div className="prose prose-lg max-w-none whitespace-pre-line text-gray-700">
                        {achievement.description}
                    </div>
                </div>
            </section>
        </>
    );
}
