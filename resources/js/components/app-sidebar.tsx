import { Link, router } from '@inertiajs/react';
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
    LogOut,
    BookOpen,
    Star,
    Activity,
    Wrench,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    useSidebar,
} from '@/components/ui/sidebar';
import { route } from '@/helpers/route';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
        icon: LayoutDashboard,
    },
    { title: 'Pesan', href: route('admin.messages.index'), icon: Mail },
    { title: 'Guru & Staff', href: route('admin.teachers.index'), icon: Users },
    { title: 'Berita', href: route('admin.news.index'), icon: Newspaper },
    {
        title: 'Prestasi',
        href: route('admin.achievements.index'),
        icon: Trophy,
    },
    { title: 'Galeri', href: route('admin.galleries.index'), icon: Image },
    {
        title: 'Fasilitas',
        href: route('admin.facilities.index'),
        icon: Building2,
    },
    {
        title: 'Fasilitas Ruangan',
        href: route('admin.facilities.index'),
        icon: Wrench,
    },
    { title: 'Timeline', href: route('admin.timelines.index'), icon: Calendar },
];

const contentNavItems: NavItem[] = [
    {
        title: 'Konten Akademik',
        href: route('admin.academic-contents.index'),
        icon: BookOpen,
    },
    {
        title: 'Program Unggulan',
        href: route('admin.programs.index'),
        icon: Star,
    },
    {
        title: 'Ekstrakurikuler',
        href: route('admin.extracurriculars.index'),
        icon: Activity,
    },
];

const settingsNavItems: NavItem[] = [
    {
        title: 'Profil Sekolah',
        href: route('admin.profile.edit'),
        icon: Settings,
    },
    { title: 'Kelola Admin', href: route('admin.admins.index'), icon: Users },
];

function NavSection({ items, label }: { items: NavItem[]; label: string }) {
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    return (
        <SidebarGroup>
            {!isCollapsed && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild tooltip={item.title}>
                            <Link href={item.href} prefetch>
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('admin.dashboard')} prefetch>
                                <AppLogo />
                                <span className="text-lg font-semibold">
                                    Admin Panel
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavSection items={mainNavItems} label="Menu Utama" />
                <NavSection items={contentNavItems} label="Konten" />
                <NavSection items={settingsNavItems} label="Pengaturan" />
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href={route('public.home')}>
                                <Home className="h-4 w-4" />
                                <span>Lihat Website</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <button
                                type="button"
                                onClick={() => router.post(route('logout'))}
                                className="flex w-full items-center gap-2 text-left text-red-500 hover:text-red-600"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Keluar</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
