import { PropsWithChildren } from 'react';
import { Link, usePage } from '@inertiajs/react';
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
                className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-slate-900 shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
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

                    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
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
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <item.icon className="h-5 w-5 shrink-0" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                        <p className="mt-6 px-3 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
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
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <item.icon className="h-5 w-5 shrink-0" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="space-y-2 border-t border-slate-800 p-4">
                        <Link
                            href={route('public.home')}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Home className="h-5 w-5" /> Lihat Website
                        </Link>
                        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-red-600/10 hover:text-red-400">
                            <LogOut className="h-5 w-5" /> Keluar
                        </button>
                    </div>
                </div>
            </aside>

            <div className="lg:pl-64">
                <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white px-4 lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <span className="text-sm font-medium text-gray-900">
                        SDN Jinggotan
                    </span>
                    <div className="h-5 w-5" />
                </div>

                <main className="p-4 sm:p-6">{children}</main>
            </div>
        </div>
    );
}
