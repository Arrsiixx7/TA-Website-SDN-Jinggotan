import { route } from '@/helpers/route';
import AdminLayout from '@/components/admin/admin-layout';
import { Message, PaginatedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import {
    Mail,
    Search,
    CheckCircle,
    X,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    messages: PaginatedData<Message>;
    filters?: {
        filter?: string;
        search?: string;
    };
    unreadCount?: number;
}

export default function MessagesAdmin({
    messages,
    filters = { filter: 'all', search: '' },
    unreadCount = 0,
}: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [filter, setFilter] = useState(filters.filter || 'all');
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(
        null,
    );

    // Auto-open message modal from URL param (e.g. ?open=5)
    const page = usePage();
    const hasProcessedOpen = useRef(false);
    useEffect(() => {
        if (hasProcessedOpen.current) return;
        const openId = page.url.includes('open=')
            ? new URLSearchParams(page.url.split('?')[1] || '').get('open')
            : null;
        if (openId && messages.data.length > 0) {
            const msg = messages.data.find((m) => m.id === Number(openId));
            if (msg) {
                hasProcessedOpen.current = true;
                setSelectedMessage(msg);
                if (!msg.is_read) {
                    router.put(
                        route('admin.messages.mark-read', { id: msg.id }),
                        {},
                        {
                            preserveScroll: true,
                            preserveState: true,
                            onSuccess: () => {
                                toast.success('Pesan ditandai sudah dibaca');
                            },
                        },
                    );
                }
            }
        }
    }, [messages.data]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.messages.index'),
            { search, filter },
            {
                preserveState: true,
            },
        );
    };

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        router.get(
            route('admin.messages.index'),
            { search, filter: newFilter },
            {
                preserveState: true,
            },
        );
    };

    const markAsRead = (id: number) => {
        router.put(
            route('admin.messages.mark-read', { id }),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Pesan ditandai sudah dibaca');
                },
            },
        );
    };

    const openMessage = (msg: Message) => {
        setSelectedMessage(msg);
        if (!msg.is_read) {
            markAsRead(msg.id);
        }
    };

    const getInitial = (name: string) => name.charAt(0).toUpperCase();

    return (
        <AdminLayout>
            <Head title="Pesan Masuk" />

            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        Pesan Masuk
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Kelola pesan dari form kontak
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                        <span>
                            Total:{' '}
                            <b className="text-gray-900">{messages.total}</b>
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>
                            Belum dibaca:{' '}
                            <b className="text-red-600">{unreadCount}</b>
                        </span>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                    <form
                        onSubmit={handleSearch}
                        className="space-y-3 sm:space-y-4"
                    >
                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari nama atau pesan..."
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 pl-10 text-gray-900 transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                />
                            </div>

                            {/* Filter buttons */}
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleFilterChange('all')}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                                        filter === 'all'
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Semua
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleFilterChange('unread')}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                                        filter === 'unread'
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Belum Dibaca
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleFilterChange('read')}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                                        filter === 'read'
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Sudah Dibaca
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Messages List */}
                <div className="space-y-4">
                    {messages.data.length > 0 ? (
                        messages.data.map((message) => (
                            <div
                                key={message.id}
                                onClick={() => openMessage(message)}
                                className={`relative transform cursor-pointer rounded-lg p-4 shadow-sm transition hover:scale-[1.02] hover:shadow-md ${
                                    !message.is_read
                                        ? 'border-l-4 border-primary bg-blue-50'
                                        : 'bg-white'
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                                        {getInitial(message.name)}
                                    </div>

                                    {/* Content */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="truncate font-semibold text-gray-900">
                                                {message.name}
                                            </p>
                                            <span className="ml-2 shrink-0 text-xs text-gray-400">
                                                {new Date(
                                                    message.created_at,
                                                ).toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                        <div className="mt-1 line-clamp-1 text-sm text-gray-600">
                                            {message.message}
                                        </div>
                                        <div className="mt-2 flex items-center gap-2">
                                            {!message.is_read ? (
                                                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                                    Baru
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-500">
                                                    Sudah dibaca
                                                </span>
                                            )}
                                            <span className="text-xs text-gray-400">
                                                •
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {message.email}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Mark as read button */}
                                    <div className="shrink-0">
                                        {!message.is_read && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    markAsRead(message.id);
                                                }}
                                                className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                                                title="Tandai sudah dibaca"
                                            >
                                                <CheckCircle className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="rounded-lg bg-white py-10 text-center">
                            <Mail className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                            <p className="text-lg text-gray-600">
                                Inbox kosong
                            </p>
                            <p className="text-sm text-gray-500">
                                Tidak ada pesan yang cocok
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {messages.last_page > 1 && (
                        <div className="flex items-center justify-center gap-2">
                            <button
                                disabled={messages.current_page === 1}
                                onClick={() =>
                                    router.get(
                                        route('admin.messages.index', {
                                            page: messages.current_page - 1,
                                        }),
                                        undefined,
                                        { preserveState: true },
                                    )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-secondary hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            {Array.from(
                                { length: messages.last_page },
                                (_, i) => i + 1,
                            ).map((page) => (
                                <button
                                    key={page}
                                    onClick={() =>
                                        router.get(
                                            route('admin.messages.index', {
                                                page,
                                            }),
                                            undefined,
                                            { preserveState: true },
                                        )
                                    }
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition ${
                                        page === messages.current_page
                                            ? 'bg-secondary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-secondary hover:text-white'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                disabled={
                                    messages.current_page === messages.last_page
                                }
                                onClick={() =>
                                    router.get(
                                        route('admin.messages.index', {
                                            page: messages.current_page + 1,
                                        }),
                                        undefined,
                                        { preserveState: true },
                                    )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-secondary hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Message Detail Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                                    {getInitial(selectedMessage.name)}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {selectedMessage.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {selectedMessage.email}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="border-b" />

                        {/* Message Body */}
                        <div className="p-4">
                            <div className="rounded-lg bg-gray-50 p-3 text-sm whitespace-pre-line text-gray-700">
                                {selectedMessage.message}
                            </div>
                            <p className="mt-2 text-xs text-gray-400">
                                {new Date(
                                    selectedMessage.created_at,
                                ).toLocaleString('id-ID')}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="border-b" />

                        {/* Footer */}
                        <div className="flex justify-end p-4">
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
