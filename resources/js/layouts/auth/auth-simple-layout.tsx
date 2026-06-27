import { Link } from '@inertiajs/react';
import { welcome } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import logo from '@/assets/images/sdnjinggotanlogo.png';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-linear-to-b from-primary-soft to-white p-6 md:p-10">
            <div className="relative z-10 w-full max-w-md">
                <div className="flex flex-col gap-6">
                    {/* Logo and Brand */}
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={welcome()}
                            className="flex flex-col items-center gap-3"
                        >
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg">
                                <img
                                    src={logo}
                                    alt="SDN Jinggotan Logo"
                                    className="h-14 w-14 object-contain"
                                />
                            </div>
                            <div className="text-center">
                                <h1 className="text-xl font-bold text-gray-900">
                                    SDN Jinggotan
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Admin Panel
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Form Card */}
                    <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
                        <div className="mb-6 text-center">
                            <h2 className="text-xl font-bold text-gray-900">
                                {title}
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">
                                {description}
                            </p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
