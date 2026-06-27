import { route } from '@/helpers/route';
import AdminLayout from '@/components/admin/admin-layout';
import { DashboardStats, ChartDataPoint, Message } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    Cell,
} from 'recharts';
import { useEffect, useRef, useState } from 'react';
import {
    Users,
    GraduationCap,
    Trophy,
    Image,
    Mail,
    Eye,
    CheckCircle,
    ArrowRight,
    UsersRound,
} from 'lucide-react';

interface Props {
    stats: DashboardStats;
    chartData: ChartDataPoint[];
    recentMessages: Message[];
}

const barColors = [
    '#3b82f6',
    '#22c55e',
    '#f59e0b',
    '#a855f7',
    '#6366f1',
    '#ef4444',
];

const statCards = [
    {
        title: 'Total Siswa',
        value: (stats: DashboardStats) => stats.total_students,
        icon: UsersRound,
        bgColor: 'bg-blue-500',
        lightBg: 'bg-blue-100',
        iconColor: 'text-white',
    },
    {
        title: 'Total Guru',
        value: (stats: DashboardStats) => stats.total_teachers,
        icon: GraduationCap,
        bgColor: 'bg-green-500',
        lightBg: 'bg-green-100',
        iconColor: 'text-white',
    },
    {
        title: 'Total Prestasi',
        value: (stats: DashboardStats) => stats.total_achievements,
        icon: Trophy,
        bgColor: 'bg-yellow-500',
        lightBg: 'bg-yellow-100',
        iconColor: 'text-white',
    },
    {
        title: 'Total Galeri',
        value: (stats: DashboardStats) => stats.total_galleries,
        icon: Image,
        bgColor: 'bg-purple-500',
        lightBg: 'bg-purple-100',
        iconColor: 'text-white',
    },
    {
        title: 'Total Pesan',
        value: (stats: DashboardStats) => stats.total_messages,
        icon: Mail,
        bgColor: 'bg-indigo-500',
        lightBg: 'bg-indigo-100',
        iconColor: 'text-white',
    },
    {
        title: 'Pesan Belum Dibaca',
        value: (stats: DashboardStats) => stats.unread_messages,
        icon: Eye,
        bgColor: 'bg-red-500',
        lightBg: 'bg-red-100',
        iconColor: 'text-white',
    },
];

export default function AdminDashboard({
    stats,
    chartData,
    recentMessages: initialMessages,
}: Props) {
    const [recentMessages, setRecentMessages] =
        useState<Message[]>(initialMessages);
    const [prevUnread, setPrevUnread] = useState(stats.unread_messages);

    // Auto-polling every 8 seconds
    useEffect(() => {
        const fetchDashboard = () => {
            router.reload({
                only: ['stats', 'chartData', 'recentMessages'],
                onSuccess: (page) => {
                    const props = page.props as unknown as Props;
                    const newUnread = props.stats.unread_messages;

                    if (newUnread > prevUnread) {
                        // Notification sound removed - file not available
                    }

                    setPrevUnread(newUnread);
                    setRecentMessages(props.recentMessages);
                },
            });
        };

        const interval = setInterval(fetchDashboard, 8000);
        return () => clearInterval(interval);
    }, [prevUnread]);

    const handleClickMessage = (msg: Message) => {
        router.visit(route('admin.messages.index', { open: msg.id }));
    };

    // Fallback data for area chart
    const safeChartData: { date: string; count: number }[] =
        chartData.length > 0
            ? chartData.map((item) => ({
                  date: new Date(item.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                  }),
                  count: item.count,
              }))
            : [
                  { date: 'Sen', count: 2 },
                  { date: 'Sel', count: 3 },
                  { date: 'Rab', count: 1 },
                  { date: 'Kam', count: 4 },
                  { date: 'Jum', count: 3 },
                  { date: 'Sab', count: 5 },
                  { date: 'Min', count: 6 },
              ];

    // Chart insights
    const totalMessages = safeChartData.reduce(
        (acc, item) => acc + item.count,
        0,
    );
    const avgMessages = Math.round(totalMessages / safeChartData.length);
    const peakDay = safeChartData.reduce(
        (max, item) => (item.count > max.count ? item : max),
        safeChartData[0],
    );
    const lowDay = safeChartData.reduce(
        (min, item) => (item.count < min.count ? item : min),
        safeChartData[0],
    );

    // Bar chart data from stats
    const barChartData = [
        { name: 'Siswa', total: stats.total_students },
        { name: 'Guru', total: stats.total_teachers },
        { name: 'Prestasi', total: stats.total_achievements },
        { name: 'Galeri', total: stats.total_galleries },
        { name: 'Pesan', total: stats.total_messages },
    ];

    return (
        <AdminLayout>
            <Head title="Dashboard Admin" />

            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            Dashboard
                        </h1>
                        <p className="mt-0.5 text-xs text-gray-500">
                            Selamat datang di panel admin SDN Jinggotan
                        </p>
                    </div>
                    <Link
                        href={route('admin.messages.index')}
                        className="relative flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:shadow-md"
                    >
                        <Mail className="h-4 w-4" />
                        Pesan
                        {stats.unread_messages > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {stats.unread_messages}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Stats Grid - 3 columns */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {statCards.map((stat) => (
                        <div
                            key={stat.title}
                            className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600">
                                        {stat.title}
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900">
                                        {stat.value(stats)}
                                    </p>
                                </div>
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.bgColor}`}
                                >
                                    <stat.icon
                                        className={`h-6 w-6 ${stat.iconColor}`}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid gap-3 lg:grid-cols-3">
                    {/* Area Chart - 7-day message trend */}
                    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm lg:col-span-2">
                        <div className="mb-4">
                            <h2 className="text-base font-semibold text-gray-900">
                                Tren Pesan
                            </h2>
                            <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">
                                <span>
                                    Total:{' '}
                                    <b className="text-gray-900">
                                        {totalMessages}
                                    </b>
                                </span>
                                <span>•</span>
                                <span>
                                    Avg:{' '}
                                    <b className="text-gray-900">
                                        {avgMessages}/hari
                                    </b>
                                </span>
                                <span className="text-amber-500">
                                    🔥 {peakDay.date}
                                </span>
                                <span className="text-gray-400">
                                    💤 {lowDay.date}
                                </span>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={safeChartData}>
                                <defs>
                                    <linearGradient
                                        id="colorMsg"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#3b82f6"
                                            stopOpacity={0.3}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#3b82f6"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f0f0f0"
                                />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12 }}
                                    stroke="#d1d5db"
                                />
                                <YAxis
                                    allowDecimals={false}
                                    tick={{ fontSize: 12 }}
                                    stroke="#d1d5db"
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    fill="url(#colorMsg)"
                                    animationDuration={800}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bar Chart - Stats overview */}
                    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                        <h2 className="mb-4 text-base font-semibold text-gray-900">
                            Statistik
                        </h2>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={barChartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f0f0f0"
                                />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12 }}
                                    stroke="#d1d5db"
                                />
                                <YAxis
                                    allowDecimals={false}
                                    tick={{ fontSize: 12 }}
                                    stroke="#d1d5db"
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    }}
                                />
                                <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                                    {barChartData.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                barColors[
                                                    index % barColors.length
                                                ]
                                            }
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Messages */}
                <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Pesan Terbaru
                        </h2>
                        <Link
                            href={route('admin.messages.index')}
                            className="flex items-center gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-800"
                        >
                            Lihat Semua
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentMessages.length > 0 ? (
                            recentMessages.map((message) => (
                                <div
                                    key={message.id}
                                    onClick={() => handleClickMessage(message)}
                                    className={`flex cursor-pointer items-start gap-4 p-4 transition hover:bg-gray-50 ${
                                        !message.is_read ? 'bg-blue-50/50' : ''
                                    }`}
                                >
                                    {/* Avatar */}
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                                            !message.is_read
                                                ? 'bg-blue-200 text-blue-700'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {message.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="truncate font-medium text-gray-900">
                                                {message.name}
                                            </p>
                                            {!message.is_read && (
                                                <span className="shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
                                                    Baru
                                                </span>
                                            )}
                                        </div>
                                        <p className="truncate text-sm text-gray-500">
                                            {message.email}
                                        </p>
                                        <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                                            {message.message}
                                        </p>
                                        <span className="mt-1 block text-xs text-gray-400">
                                            {new Date(
                                                message.created_at,
                                            ).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    <div className="shrink-0 pt-1">
                                        {message.is_read ? (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-blue-500" />
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-gray-500">
                                <Mail className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                                <p>Belum ada pesan</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
