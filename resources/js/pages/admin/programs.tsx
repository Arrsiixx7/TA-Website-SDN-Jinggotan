import { route } from '@/helpers/route';
import AdminLayout from '@/components/admin/admin-layout';
import { Program } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    Star,
    Plus,
    Edit,
    Trash2,
    X,
    Save,
    Image as ImageIcon,
} from 'lucide-react';
import { useState, useRef } from 'react';
import { toast } from 'sonner';

interface Props {
    programs: Program[];
}

export default function ProgramsAdmin({ programs }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Program | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        order: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) =>
            data.append(key, value),
        );
        if (imageFile) data.append('image', imageFile);

        if (editingItem) {
            data.append('_method', 'PUT');
            router.post(
                route('admin.programs.update', { program: editingItem.id }),
                data,
                {
                    onSuccess: () => {
                        toast.success('Program berhasil diupdate');
                        closeModal();
                    },
                },
            );
        } else {
            router.post(route('admin.programs.store'), data, {
                onSuccess: () => {
                    toast.success('Program berhasil ditambahkan');
                    closeModal();
                },
            });
        }
    };

    const handleEdit = (item: Program) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            description: item.description,
            order: item.order.toString(),
        });
        setImagePreview(item.image_url || null);
        setImageFile(null);
        setShowModal(true);
    };

    const handleDelete = (id: number, title: string) => {
        if (!confirm(`Yakin hapus "${title}"?`)) return;
        router.delete(route('admin.programs.destroy', { program: id }), {
            onSuccess: () => toast.success('Program berhasil dihapus'),
        });
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setFormData({ title: '', description: '', order: '' });
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Program Unggulan" />
            <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                            Program Unggulan
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Kelola program prioritas sekolah
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 text-white transition hover:bg-secondary/90"
                    >
                        <Plus className="h-5 w-5" /> Tambah Program
                    </button>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                    {programs.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {programs.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 p-4"
                                >
                                    {item.image_url ? (
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="h-16 w-16 rounded-lg object-cover sm:h-20 sm:w-20"
                                        />
                                    ) : (
                                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 sm:h-20 sm:w-20">
                                            <Star className="h-6 w-6 text-gray-400" />
                                        </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate font-medium text-gray-900">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {item.description?.slice(0, 60)}...
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
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
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <Star className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                            <p className="text-gray-600">
                                Belum ada program unggulan
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center">
                    <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-xl bg-white shadow-xl sm:max-w-lg sm:rounded-xl">
                        <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
                            <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                                {editingItem
                                    ? 'Edit Program'
                                    : 'Tambah Program'}
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
                                    placeholder="Masukkan judul program"
                                />
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
                                    placeholder="Masukkan deskripsi program"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Urutan (Order)
                                </label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            order: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    placeholder="0"
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
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setImageFile(file);
                                            setImagePreview(
                                                URL.createObjectURL(file),
                                            );
                                        }
                                    }}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                />
                                {imagePreview && (
                                    <div className="mt-3">
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
