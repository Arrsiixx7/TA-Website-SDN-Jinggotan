import { route } from '@/helpers/route';
import AdminLayout from '@/components/admin/admin-layout';
import { Gallery, PaginatedData } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    Plus,
    Trash2,
    X,
    Upload,
    Clock,
    Pencil,
    AlertCircle,
    Save,
    Image as ImageIcon,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface Activity {
    id: number;
    text: string;
    timestamp: Date;
    type: 'upload' | 'update' | 'delete';
}

interface Props {
    galleries: PaginatedData<Gallery>;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function GalleriesAdmin({ galleries }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Gallery | null>(null);
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const logActivity = useCallback((text: string, type: Activity['type']) => {
        setActivities((prev) => [
            { id: Date.now(), text, timestamp: new Date(), type },
            ...prev.slice(0, 4),
        ]);
    }, []);

    const validateFile = (file: File): boolean => {
        if (!ALLOWED_TYPES.includes(file.type)) {
            setFileError('Format file harus JPEG, PNG, atau WEBP');
            return false;
        }
        if (file.size > MAX_FILE_SIZE) {
            setFileError('Ukuran file maksimal 5MB');
            return false;
        }
        setFileError(null);
        return true;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setImageFile(null);
            setPreview(null);
            setFileError(null);
            return;
        }
        if (validateFile(file)) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        } else {
            setImageFile(null);
            setPreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem && fileError) {
            toast.error('Perbaiki error file terlebih dahulu');
            return;
        }

        const data = new FormData();
        if (title) data.append('title', title);

        if (editingItem) {
            data.append('_method', 'PUT');
            router.post(
                route('admin.galleries.update', { id: editingItem.id }),
                data,
                {
                    onSuccess: () => {
                        logActivity(
                            `Update "${editingItem.title || 'Galeri'}"`,
                            'update',
                        );
                        toast.success('Galeri berhasil diupdate');
                        closeModal();
                    },
                },
            );
        } else {
            if (!imageFile) {
                toast.error('Pilih gambar terlebih dahulu');
                return;
            }
            data.append('image', imageFile);
            router.post(route('admin.galleries.store'), data, {
                onSuccess: () => {
                    logActivity(`Upload "${imageFile.name}"`, 'upload');
                    toast.success('Foto berhasil diupload');
                    closeModal();
                },
            });
        }
    };

    const handleEdit = (item: Gallery) => {
        setEditingItem(item);
        setTitle(item.title || '');
        setImagePreview(item.image_url || null);
        setImageFile(null);
        setFileError(null);
        setShowModal(true);
    };

    const handleDelete = (id: number, itemTitle?: string) => {
        if (!confirm(`Yakin hapus foto "${itemTitle || 'Galeri'}"?`)) return;
        router.delete(route('admin.galleries.destroy', { id }), {
            onSuccess: () => {
                logActivity(`Hapus "${itemTitle || 'Galeri'}"`, 'delete');
                toast.success('Foto berhasil dihapus');
            },
        });
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setTitle('');
        setImageFile(null);
        setPreview(null);
        setFileError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const activityIcon = (type: Activity['type']) => {
        if (type === 'upload')
            return <Upload className="h-4 w-4 text-green-600" />;
        if (type === 'update')
            return <Pencil className="h-4 w-4 text-blue-600" />;
        return <Trash2 className="h-4 w-4 text-red-600" />;
    };

    const formatTimestamp = (date: Date) =>
        date.toLocaleString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    return (
        <AdminLayout>
            <Head title="Manajemen Galeri" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Manajemen Galeri
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Kelola foto galeri sekolah
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingItem(null);
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-white transition hover:bg-secondary/90"
                    >
                        <Plus className="h-5 w-5" /> Upload Foto
                    </button>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <h2 className="text-lg font-semibold text-gray-900">
                            Aktivitas Terkini
                        </h2>
                    </div>
                    {activities.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            Belum ada aktivitas
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center gap-3 text-sm"
                                >
                                    <span className="shrink-0">
                                        {activityIcon(activity.type)}
                                    </span>
                                    <span className="flex-1 text-gray-700">
                                        {activity.text}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {formatTimestamp(activity.timestamp)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {galleries.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white py-16 shadow-sm">
                        <div className="mb-4 rounded-full bg-secondary/10 p-6">
                            <ImageIcon className="h-16 w-16 text-secondary" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900">
                            Belum Ada Galeri
                        </h3>
                        <p className="mb-6 max-w-sm text-center text-sm text-gray-600">
                            Mulai tambahkan foto-foto galeri sekolah Anda
                        </p>
                        <button
                            onClick={() => {
                                setEditingItem(null);
                                setShowModal(true);
                            }}
                            className="flex items-center gap-2 rounded-lg bg-secondary px-6 py-2 text-white transition hover:bg-secondary/90"
                        >
                            <Plus className="h-5 w-5" /> Upload Foto Pertama
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {galleries.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
                                >
                                    {item.image_url ? (
                                        <img
                                            src={item.image_url}
                                            alt={item.title || 'Gallery'}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                            <ImageIcon className="h-12 w-12 text-gray-300" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/40">
                                        <div className="flex gap-2 opacity-0 transition group-hover:opacity-100">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="rounded-full bg-white p-2 text-blue-600 transition hover:bg-blue-50"
                                            >
                                                <Upload className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        item.id,
                                                        item.title || undefined,
                                                    )
                                                }
                                                className="rounded-full bg-white p-2 text-red-600 transition hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                    {item.title && (
                                        <p className="absolute right-0 bottom-0 left-0 truncate rounded-b-xl bg-black/60 p-2 text-xs text-white">
                                            {item.title}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {galleries.last_page > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-4">
                                <button
                                    disabled={galleries.current_page === 1}
                                    onClick={() =>
                                        router.get(
                                            route('admin.galleries.index', {
                                                page:
                                                    galleries.current_page - 1,
                                            }),
                                            undefined,
                                            { preserveState: true },
                                        )
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-secondary hover:text-white disabled:opacity-40"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                {Array.from(
                                    { length: galleries.last_page },
                                    (_, i) => i + 1,
                                ).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() =>
                                            router.get(
                                                route('admin.galleries.index', {
                                                    page,
                                                }),
                                                undefined,
                                                { preserveState: true },
                                            )
                                        }
                                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition ${page === galleries.current_page ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-700 hover:bg-secondary hover:text-white'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    disabled={
                                        galleries.current_page ===
                                        galleries.last_page
                                    }
                                    onClick={() =>
                                        router.get(
                                            route('admin.galleries.index', {
                                                page:
                                                    galleries.current_page + 1,
                                            }),
                                            undefined,
                                            { preserveState: true },
                                        )
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-secondary hover:text-white disabled:opacity-40"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {editingItem ? 'Edit Foto' : 'Upload Foto'}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 p-4 sm:p-6"
                        >
                            {!editingItem && (
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Foto *
                                    </label>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleFileChange}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                        required
                                    />
                                    {fileError && (
                                        <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                                            <AlertCircle className="h-4 w-4" />
                                            {fileError}
                                        </p>
                                    )}
                                    {preview && (
                                        <div className="mt-3">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="max-h-48 max-w-full rounded-lg border object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Judul (opsional)
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    placeholder="Masukkan judul foto"
                                />
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
                                    className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary/90"
                                >
                                    <Save className="h-4 w-4" /> Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
