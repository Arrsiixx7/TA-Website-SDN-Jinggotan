/**
 * Simple route helper using direct URLs
 * This bypasses Wayfinder and uses hardcoded URLs
 */
const routes: Record<
    string,
    string | ((params?: Record<string, any>) => string)
> = {
    // Public routes
    'public.home': '/',
    'public.profile': '/profil',
    'public.teachers': '/guru',
    'public.news': '/berita',
    'public.news.show': (params) => `/berita/${params?.slug}`,
    'public.achievements': '/prestasi',
    'public.achievements.show': (params) => `/prestasi/${params?.id}`,
    'public.gallery': '/galeri',
    'public.contact': '/kontak',
    'public.contact.store': '/kontak',
    'public.academic': '/akademik',
    'public.students': '/siswa',
    'public.classrooms': '/ruang-kelas',
    'public.ppdb': '/spmb',
    'public.facilities.show': (params) => `/fasilitas/${params?.slug}`,

    // Admin routes
    'admin.dashboard': '/admin/dashboard',
    'admin.messages.index': '/admin/pesan',
    'admin.messages.show': (params) => `/admin/pesan/${params?.id}`,
    'admin.messages.mark-read': (params) => `/admin/pesan/${params?.id}/read`,
    'admin.teachers.index': '/admin/guru',
    'admin.teachers.store': '/admin/guru',
    'admin.teachers.update': (params) =>
        `/admin/guru/${params?.id || params?.teacher}`,
    'admin.teachers.destroy': (params) =>
        `/admin/guru/${params?.id || params?.teacher}`,
    'admin.news.index': '/admin/berita',
    'admin.news.store': '/admin/berita',
    'admin.news.update': (params) => `/admin/berita/${params?.id}`,
    'admin.news.destroy': (params) => `/admin/berita/${params?.id}`,
    'admin.achievements.index': '/admin/prestasi',
    'admin.achievements.store': '/admin/prestasi',
    'admin.achievements.update': (params) => `/admin/prestasi/${params?.id}`,
    'admin.achievements.destroy': (params) => `/admin/prestasi/${params?.id}`,
    'admin.galleries.index': '/admin/galeri',
    'admin.galleries.store': '/admin/galeri',
    'admin.galleries.update': (params) => `/admin/galeri/${params?.id}`,
    'admin.galleries.destroy': (params) => `/admin/galeri/${params?.id}`,
    'admin.facilities.index': '/admin/fasilitas',
    'admin.facilities.store': '/admin/fasilitas',
    'admin.facilities.update': (params) => `/admin/fasilitas/${params?.id}`,
    'admin.facilities.destroy': (params) => `/admin/fasilitas/${params?.id}`,
    'admin.profile.edit': '/admin/profil',
    'admin.profile.update': '/admin/profil',
    'admin.profile.vision-mission.update': '/admin/profil/vision-mission',
    'admin.timelines.index': '/admin/timeline',
    'admin.timelines.store': '/admin/timeline',
    'admin.timelines.update': (params) => `/admin/timeline/${params?.id}`,
    'admin.timelines.destroy': (params) => `/admin/timeline/${params?.id}`,
    'admin.admins.index': '/admin/admins',
    'admin.admins.store': '/admin/admins',
    'admin.admins.destroy': (params) =>
        `/admin/admins/${params?.id || params?.admin}`,
    'admin.admins.email': '/admin/admins/email',

    // Akademik Management
    'admin.academic-contents.index': '/admin/akademik/contents',
    'admin.academic-contents.store': '/admin/akademik/contents',
    'admin.academic-contents.update': (params) =>
        `/admin/akademik/contents/${params?.content}`,
    'admin.academic-contents.destroy': (params) =>
        `/admin/akademik/contents/${params?.content}`,

    'admin.programs.index': '/admin/akademik/programs',
    'admin.programs.store': '/admin/akademik/programs',
    'admin.programs.update': (params) =>
        `/admin/akademik/programs/${params?.program}`,
    'admin.programs.destroy': (params) =>
        `/admin/akademik/programs/${params?.program}`,

    'admin.extracurriculars.index': '/admin/akademik/extracurriculars',
    'admin.extracurriculars.store': '/admin/akademik/extracurriculars',
    'admin.extracurriculars.update': (params) =>
        `/admin/akademik/extracurriculars/${params?.extracurricular}`,
    'admin.extracurriculars.destroy': (params) =>
        `/admin/akademik/extracurriculars/${params?.extracurricular}`,

    // Auth routes (Fortify)
    login: '/login',
    logout: '/logout',
    register: '/register',
    welcome: '/welcome',
};

/**
 * Route helper function
 * Usage: route('public.home') or route('public.news.show', { slug: 'my-news' })
 * Supports query params: route('public.gallery', { page: 2 }) => '/galeri?page=2'
 */
export function route(name: string, params?: Record<string, any>): string {
    const routeDef = routes[name];

    if (!routeDef) {
        console.warn(`Route "${name}" not defined`);
        return '/';
    }

    let baseUrl: string;
    const isDynamicRoute = typeof routeDef === 'function';

    if (isDynamicRoute) {
        baseUrl = routeDef(params);
    } else {
        baseUrl = routeDef;
    }

    // Only convert params to query string for static routes (not dynamic function routes)
    if (!isDynamicRoute && params && Object.keys(params).length > 0) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                queryParams.append(key, String(value));
            }
        });
        const queryString = queryParams.toString();
        if (queryString) {
            baseUrl = `${baseUrl}?${queryString}`;
        }
    }

    return baseUrl;
}
