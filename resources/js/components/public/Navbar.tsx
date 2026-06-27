import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { route } from '@/helpers/route';
import logo from '@/assets/images/sdnjinggotanlogo.png';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { url } = usePage();

    const navigation = [
        { name: 'Beranda', href: route('public.home') },
        { name: 'Profil', href: route('public.profile') },
        { name: 'Akademik', href: route('public.academic') },
        { name: 'Berita', href: route('public.news') },
        { name: 'Galeri', href: route('public.gallery') },
        { name: 'Kontak', href: route('public.contact') },
    ];

    const isActive = (path: string) => {
        // Strip query params from current URL for comparison
        const currentPath = url.split('?')[0];
        return currentPath === path || currentPath === path + '/';
    };

    return (
        <nav
            className="fixed top-0 left-0 z-50 w-full bg-white/30 shadow-sm"
            style={{ backdropFilter: 'blur(16px)' }}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link
                    href={route('public.home')}
                    className="flex items-center gap-3"
                >
                    <img
                        src={logo}
                        alt="SDN Jinggotan Logo"
                        className="h-11 w-11 rounded-2xl object-cover shadow-md"
                    />
                    <span className="text-lg font-semibold tracking-tight text-gray-800">
                        SD Negeri Jinggotan
                    </span>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden items-center gap-8 font-medium text-gray-700 md:flex">
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={`transition duration-300 hover:text-secondary ${
                                    isActive(item.href)
                                        ? 'font-semibold text-secondary'
                                        : ''
                                }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* SPMB Button */}
                <Link
                    href={route('public.ppdb')}
                    className="hidden rounded-xl bg-secondary px-5 py-2 font-semibold text-white shadow-md transition duration-300 hover:opacity-90 md:inline-block"
                >
                    SPMB
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-gray-700 md:hidden"
                >
                    {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className="border-t border-white/20 bg-white/70 px-6 py-6 shadow-sm md:hidden"
                    style={{ backdropFilter: 'blur(20px)' }}
                >
                    <div className="space-y-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block font-medium text-gray-700 transition hover:text-secondary ${
                                    isActive(item.href)
                                        ? 'font-semibold text-secondary'
                                        : ''
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href={route('public.ppdb')}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block rounded-xl bg-secondary py-3 text-center font-semibold text-white shadow-md"
                        >
                            SPMB
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
