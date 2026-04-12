import { Head } from '@inertiajs/react';
import { News, Gallery, SchoolProfile, VisionMission, Teacher } from '@/types';
import HeroSection from '@/components/public/HeroSection';
import FeatureGrid from '@/components/public/FeatureGrid';
import PrincipalGreeting from '@/components/public/PrincipalGreeting';
import VisionMissionSection from '@/components/public/VisionMissionSection';
import NewsSection from '@/components/public/NewsSection';
import GallerySection from '@/components/public/GallerySection';

interface Props {
    news: News[];
    galleries: Gallery[];
    schoolProfile: SchoolProfile | null;
    visionMission: VisionMission | null;
    principal: Teacher | null;
    stats: {
        total_students: number;
        total_teachers: number;
        total_achievements: number;
    };
}

export default function Home({
    news,
    galleries,
    schoolProfile,
    visionMission,
    principal,
    stats,
}: Props) {
    return (
        <>
            <Head title="SDN Jinggotan - Beranda" />

            <HeroSection schoolProfile={schoolProfile} stats={stats} />
            <FeatureGrid />
            <PrincipalGreeting
                principal={principal}
                schoolProfile={schoolProfile}
            />
            <VisionMissionSection visionMission={visionMission} />
            <NewsSection news={news} />
            <GallerySection galleries={galleries} />
        </>
    );
}
