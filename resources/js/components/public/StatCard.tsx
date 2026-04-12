import { useCountUp } from '@/hooks/use-count-up';

interface StatCardProps {
    number: number;
    label: string;
    suffix?: string;
}

export default function StatCard({ number, label, suffix = '' }: StatCardProps) {
    const count = useCountUp(number, 2000);

    return (
        <div className="rounded-3xl border border-primary/10 bg-white p-12 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer">
            <div className="mx-auto mb-6 h-6 w-8 rounded-full bg-primary" />

            <h3 className="mb-4 text-5xl font-extrabold text-primary md:text-6xl">
                {count}
                {suffix}
            </h3>

            <p className="text-[10px] uppercase tracking-widest text-gray-500">
                {label}
            </p>
        </div>
    );
}
