import { PropsWithChildren } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { route } from '@/helpers/route';
import logo from '@/assets/images/sdnjinggotanlogo.png';
import {
    LayoutDashboard,
    Mail,
    Users,
    Image,
    Newspaper,
    Trophy,
    Building2,
    Calendar,
    Settings,
    Home,
    Menu,
    LogOut,
    BookOpen,
    Star,
    Activity,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url } = usePage();

    const navigation = [
        {
            name: 'Dashboard',
            href: route('admin.dashboard'),
            icon: LayoutDashboard,
        },
        { name: 'Pesan', href: route('admin.messages.index'), icon: Mail },
        { name: 'Guru', href: route('admin.teachers.index'), icon: Users },
        { name: 'Berita', href: route('admin.news.index'), icon: Newspaper },
        {
            name: 'Prestasi',
            href: route('admin.achievements.index'),
            icon: Trophy,
        },
        { name: 'Galeri', href: route('admin.galleries.index'), icon: Image },
        {
            name: 'Fasilitas',
            href: route('admin.facilities.index'),
            icon: Building2,
        },
        {
            name: 'Timeline',
            href: route('admin.timelines.index'),
            icon: Calendar,
        },
        {
            name: 'Konten Akademik',
            href: route('admin.academic-contents.index'),
            icon: BookOpen,
        },
        {
            name: 'Program Unggulan',
            href: route('admin.programs.index'),
            icon: Star,
        },
        {
            name: 'Ekstrakurikuler',
            href: route('admin.extracurriculars.index'),
            icon: Activity,
        },
        {
            name: 'Profil Sekolah',
            href: route('admin.profile.edit'),
            icon: Settings,
        },
        {
            name: 'Kelola Admin',
            href: route('admin.admins.index'),
            icon: Users,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-30 w-56 transform bg-slate-900 transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex h-full flex-col">
                    <div className="flex h-16 items-center justify-between bg-slate-950 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                            <img
                                src={logo}
                                alt="SDN Jinggotan Logo"
                                className="h-8 w-8 rounded-lg object-cover"
                            />
                            <div>
                                <h1 className="text-sm font-bold text-white">
                                    SDN Jinggotan
                                </h1>
                                <p className="text-[10px] text-slate-400">
                                    Admin Panel
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-slate-400 hover:text-white lg:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>

                    <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
                        <p className="px-3 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                            Menu Utama
                        </p>
                        {navigation.slice(0, 4).map((item) => {
                            const isActive =
                                url === item.href ||
                                url === item.href + '/' ||
                                url.startsWith(item.href + '?');
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <item.icon className="h-4 w-4 shrink-0" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                        <p className="mt-4 px-3 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                            Konten
                        </p>
                        {navigation.slice(4).map((item) => {
                            const isActive =
                                url === item.href ||
                                url === item.href + '/' ||
                                url.startsWith(item.href + '?');
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <item.icon className="h-4 w-4 shrink-0" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="space-y-0.5 border-t border-slate-800 px-2 py-3">
                        <Link
                            href={route('public.home')}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Home className="h-4 w-4" /> Lihat Website
                        </Link>
                        <button
                            onClick={() => router.post(route('logout'))}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-red-600/10 hover:text-red-400"
                        >
                            <LogOut className="h-4 w-4" /> Keluar
                        </button>
                    </div>
                </div>
            </aside>

            <div className="pl-0 lg:pl-25">
                {/* Mobile top bar */}
                <div className="fixed top-0 right-0 left-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        <img
                            src={logo}
                            alt="SDN Jinggotan Logo"
                            className="h-7 w-7 rounded-lg"
                        />
                        <span className="text-sm font-semibold text-gray-900">
                            SDN Jinggotan
                        </span>
                    </div>
                    <div className="w-9" />
                </div>

                <main className="p-4 pt-16 sm:p-6">{children}</main>
            </div>
        </div>
    );
}
