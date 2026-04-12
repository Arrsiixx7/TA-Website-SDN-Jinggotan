import { Link } from '@inertiajs/react';
import {
    MapPin,
    Phone,
    Mail,
    Facebook,
    // Instagram,
    Youtube,
} from 'lucide-react';
import { route } from '@/helpers/route';

export default function Footer() {
    const navigation = [
        { name: 'Beranda', href: route('public.home') },
        { name: 'Profil', href: route('public.profile') },
        { name: 'Akademik', href: route('public.academic') },
        { name: 'Berita', href: route('public.news') },
        { name: 'Galeri', href: route('public.gallery') },
        { name: 'Kontak', href: route('public.contact') },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
                {/* Column 1 - School Info */}
                <div>
                    <h3 className="mb-4 text-xl font-bold text-white">
                        SD Negeri Jinggotan
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed">
                        Sekolah dasar yang berkomitmen menciptakan generasi
                        unggul, berkarakter, dan berbudaya melalui pendidikan
                        yang berkualitas.
                    </p>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.facebook.com/share/g/1BSvAqoJXK/"
                            className="transition hover:text-white"
                        >
                            <Facebook size={20} />
                        </a>
                        {/* <a href="#" className="transition hover:text-white">
                            <Instagram size={20} />
                        </a> */}
                        <a
                            href="http://www.youtube.com/@sdnegerijinggotan8017"
                            className="transition hover:text-white"
                        >
                            <Youtube size={20} />
                        </a>
                    </div>
                </div>

                {/* Column 2 - Navigation */}
                <div>
                    <h3 className="mb-4 font-semibold text-white">Navigasi</h3>
                    <ul className="space-y-3 text-sm">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="text-sm transition duration-200 hover:text-white"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3 - Contact */}
                <div>
                    <h3 className="mb-4 font-semibold text-white">
                        Kontak Kami
                    </h3>
                    <div className="space-y-4 text-sm">
                        <div className="flex items-start gap-3">
                            <MapPin
                                size={18}
                                className="mt-1 shrink-0 text-secondary"
                            />
                            <span className="text-sm">
                                Jl. Raya Bangsri-Keling KM.06
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone
                                size={18}
                                className="shrink-0 text-secondary"
                            />
                            <span className="text-sm">085229393771</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail
                                size={18}
                                className="shrink-0 text-secondary"
                            />
                            <span className="text-sm">
                                sdnjinggotan@yahoo.com
                            </span>
                        </div>
                    </div>
                </div>

                {/* Column 4 - Operating Hours */}
                <div>
                    <h3 className="mb-4 font-semibold text-white">
                        Jam Operasional
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li className="text-sm">
                            Senin - Kamis : 07.00 - 14.00
                        </li>
                        <li className="text-sm">Jumat : 07.00 - 11.00</li>
                        <li className="text-sm">Sabtu : 07.00 - 12.30</li>
                        <li className="text-sm">Minggu : Libur</li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 py-5 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} SD Negeri Jinggotan. All
                rights reserved.
            </div>
        </footer>
    );
}
