import { route } from '@/helpers/route';
import AdminLayout from '@/components/admin/admin-layout';
import { Achievement, PaginatedData } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    Trophy,
    Plus,
    Edit,
    Trash2,
    X,
    Save,
    AlertCircle,
    Image as ImageIcon,
} from 'lucide-react';
import { useState, useRef } from 'react';
import { toast } from 'sonner';

interface Props {
    achievements: PaginatedData<Achievement>;
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export default function AchievementsAdmin({ achievements }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Achievement | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Akademik' as 'Akademik' | 'Non Akademik',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageError(null);
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            setImageError('Format harus JPG/PNG/WEBP');
            setImageFile(null);
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }
        if (file.size > MAX_IMAGE_SIZE) {
            setImageError('Ukuran file maksimal 5MB');
            setImageFile(null);
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (imageError) return;

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) =>
            data.append(key, value),
        );
        if (imageFile) data.append('image', imageFile);

        if (editingItem) {
            data.append('_method', 'PUT');
            router.post(
                route('admin.achievements.update', { id: editingItem.id }),
                data,
                {
                    onSuccess: () => {
                        toast.success('Prestasi berhasil diupdate');
                        closeModal();
                    },
                    onError: (errors) => {
                        if (errors.image) setImageError(errors.image as string);
                    },
                },
            );
        } else {
            router.post(route('admin.achievements.store'), data, {
                onSuccess: () => {
                    toast.success('Prestasi berhasil ditambahkan');
                    closeModal();
                },
                onError: (errors) => {
                    if (errors.image) setImageError(errors.image as string);
                },
            });
        }
    };

    const handleEdit = (item: Achievement) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            description: item.description,
            category: item.category,
        });
        setImageFile(null);
        setImagePreview(item.image_url || null);
        setImageError(null);
        setShowModal(true);
    };

    const handleDelete = (id: number, title: string) => {
        if (!confirm(`Yakin hapus prestasi "${title}"?`)) return;
        router.delete(route('admin.achievements.destroy', { id }), {
            onSuccess: () => toast.success('Prestasi berhasil dihapus'),
        });
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setFormData({ title: '', description: '', category: 'Akademik' });
        setImageFile(null);
        setImagePreview(null);
        setImageError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Prestasi" />
            <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                            Manajemen Prestasi
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Kelola prestasi siswa
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-white transition hover:bg-secondary/90"
                    >
                        <Plus className="h-5 w-5" /> Tambah Prestasi
                    </button>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                    {achievements.data.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                            {achievements.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="overflow-hidden rounded-lg border border-gray-100 shadow-sm transition hover:shadow-md"
                                >
                                    {item.image_url ? (
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="h-48 w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-48 w-full items-center justify-center bg-gray-100">
                                            <ImageIcon className="h-12 w-12 text-gray-300" />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <span className="mb-2 inline-block rounded-full bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                                            {item.category}
                                        </span>
                                        <h3 className="mb-1 font-semibold text-gray-900">
                                            {item.title}
                                        </h3>
                                        <p className="line-clamp-2 text-sm text-gray-600">
                                            {item.description}
                                        </p>
                                        <div className="mt-3 flex gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="flex-1 rounded-lg bg-blue-50 py-2 text-blue-600 transition hover:bg-blue-100"
                                            >
                                                <Edit className="mx-auto h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        item.id,
                                                        item.title,
                                                    )
                                                }
                                                className="flex-1 rounded-lg bg-red-50 py-2 text-red-600 transition hover:bg-red-100"
                                            >
                                                <Trash2 className="mx-auto h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <Trophy className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                            <p className="text-gray-600">Belum ada prestasi</p>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center">
                    <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-xl bg-white shadow-xl sm:max-w-2xl sm:rounded-xl">
                        <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {editingItem
                                    ? 'Edit Prestasi'
                                    : 'Tambah Prestasi'}
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
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Judul *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                    placeholder="Masukkan judul prestasi"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Kategori *
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            category: e.target.value as any,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                >
                                    <option value="Akademik">Akademik</option>
                                    <option value="Non Akademik">
                                        Non Akademik
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Deskripsi *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    rows={4}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                    placeholder="Deskripsi prestasi"
                                />
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
                                {imageError && (
                                    <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                                        <AlertCircle className="h-4 w-4" />{' '}
                                        {imageError}
                                    </p>
                                )}
                                {imagePreview && (
                                    <div className="mt-3">
                                        <p className="mb-2 text-sm text-gray-500">
                                            Pratinjau:
                                        </p>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-32 w-32 rounded-lg border object-cover"
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
