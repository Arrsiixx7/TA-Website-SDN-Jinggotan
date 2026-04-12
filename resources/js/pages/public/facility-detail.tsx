import { Head } from '@inertiajs/react';

interface Props {
    facility: any;
}

export default function FacilityDetail({ facility }: Props) {
    return (
        <>
            <Head title={`${facility.name} - SDN Jinggotan`} />
            <section className="bg-white py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">
                        {facility.name}
                    </h1>
                    <span className="mb-6 inline-block rounded-full bg-primary-soft px-3 py-1 text-primary capitalize">
                        {facility.category}
                    </span>
                    {facility.description && (
                        <p className="text-lg text-gray-700">
                            {facility.description}
                        </p>
                    )}
                </div>
            </section>
        </>
    );
}
