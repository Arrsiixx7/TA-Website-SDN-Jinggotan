import { route } from '@/helpers/route';
import AdminLayout from '@/components/admin/admin-layout';
import { News as NewsType, PaginatedData } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import {
    Newspaper,
    Plus,
    Edit,
    Trash2,
    X,
    Save,
    Image as ImageIcon,
    Calendar,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useState, useRef } from 'react';
import { toast } from 'sonner';

interface Props {
    news: PaginatedData<NewsType>;
}

export default function NewsAdmin({ news }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingNews, setEditingNews] = useState<NewsType | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        content: '',
        image: null as File | null,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

        if (!allowedTypes.includes(file.type)) {
            setFileError('Format harus JPG, PNG, atau WEBP');
            setImageFile(null);
            setImagePreview(null);
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setFileError('Ukuran maksimal 5MB');
            setImageFile(null);
            setImagePreview(null);
            return;
        }

        setFileError('');
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (fileError) {
            toast.error('Perbaiki error pada file terlebih dahulu');
            return;
        }

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        if (editingNews) {
            formData.append('_method', 'PUT');
            router.post(
                route('admin.news.update', { id: editingNews.id }),
                formData,
                {
                    onSuccess: () => {
                        toast.success('Berita berhasil diupdate');
                        closeModal();
                    },
                },
            );
        } else {
            router.post(route('admin.news.store'), formData, {
                onSuccess: () => {
                    toast.success('Berita berhasil ditambahkan');
                    closeModal();
                },
            });
        }
    };

    const handleEdit = (item: NewsType) => {
        setEditingNews(item);
        setData('title', item.title);
        setData('content', item.content);
        setImagePreview(item.image_url || null);
        setImageFile(null);
        setFileError('');
        setShowModal(true);
    };

    const handleDelete = (id: number, title: string) => {
        if (!confirm(`Yakin hapus berita "${title}"?`)) return;
        router.delete(route('admin.news.destroy', { id }), {
            onSuccess: () => toast.success('Berita berhasil dihapus'),
        });
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingNews(null);
        reset();
        setImageFile(null);
        setImagePreview(null);
        setFileError('');
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Berita" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Manajemen Berita
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Kelola berita dan informasi sekolah
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-white transition hover:bg-secondary/90"
                    >
                        <Plus className="h-5 w-5" />
                        Tambah Berita
                    </button>
                </div>

                {/* News List */}
                <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                    {news.data.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {news.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start gap-4 p-6"
                                >
                                    {item.image_url ? (
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="h-20 w-28 shrink-0 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-20 w-28 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                            <ImageIcon className="h-8 w-8 text-gray-400" />
                                        </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate font-semibold text-gray-900">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(
                                                item.created_at,
                                            ).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                                            {item.content}
                                        </p>
                                    </div>
                                    <div className="flex shrink-0 gap-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                                            title="Edit"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    item.id,
                                                    item.title,
                                                )
                                            }
                                            className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                                            title="Hapus"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <Newspaper className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                            <p className="text-gray-600">Belum ada berita</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {news.last_page > 1 && (
                        <div className="flex items-center justify-center gap-2 border-t border-gray-100 px-6 py-4">
                            <button
                                disabled={news.current_page === 1}
                                onClick={() =>
                                    router.get(
                                        route('admin.news.index', {
                                            page: news.current_page - 1,
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
                                { length: news.last_page },
                                (_, i) => i + 1,
                            ).map((page) => (
                                <button
                                    key={page}
                                    onClick={() =>
                                        router.get(
                                            route('admin.news.index', {
                                                page,
                                            }),
                                            undefined,
                                            { preserveState: true },
                                        )
                                    }
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition ${
                                        page === news.current_page
                                            ? 'bg-secondary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-secondary hover:text-white'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                disabled={news.current_page === news.last_page}
                                onClick={() =>
                                    router.get(
                                        route('admin.news.index', {
                                            page: news.current_page + 1,
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {editingNews ? 'Edit Berita' : 'Tambah Berita'}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4 p-6">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Judul *
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                    placeholder="Masukkan judul berita"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.title}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Konten *
                                </label>
                                <textarea
                                    value={data.content}
                                    onChange={(e) =>
                                        setData('content', e.target.value)
                                    }
                                    rows={6}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                    placeholder="Tulis konten berita..."
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Tekan Enter untuk membuat paragraf baru.
                                    Teks akan otomatis rapi di halaman publik.
                                </p>
                                {errors.content && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.content}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Gambar
                                </label>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                />
                                {fileError && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {fileError}
                                    </p>
                                )}
                                {imageFile && !fileError && (
                                    <p className="mt-1 text-sm text-green-600">
                                        ✓ {imageFile.name}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    Max 5MB (JPEG, PNG, WebP)
                                </p>

                                {/* Image Preview */}
                                {imagePreview && (
                                    <div className="mt-3">
                                        <p className="mb-2 text-sm text-gray-500">
                                            Pratinjau:
                                        </p>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-32 w-48 rounded-lg border object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-end gap-3 border-t pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary/90 disabled:opacity-50"
                                >
                                    <Save className="h-4 w-4" />
                                    {processing
                                        ? 'Menyimpan...'
                                        : editingNews
                                          ? 'Update'
                                          : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
