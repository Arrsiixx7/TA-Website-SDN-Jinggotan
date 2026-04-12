import { route } from '@/helpers/route';
import AdminLayout from '@/components/admin/admin-layout';
import { Head, router } from '@inertiajs/react';
import { Calendar, Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Timeline {
    id: number;
    year: string;
    title: string;
    description: string | null;
    order: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    timelines: Timeline[];
}

export default function TimelinesAdmin({ timelines }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Timeline | null>(null);
    const [formData, setFormData] = useState({
        year: '',
        title: '',
        description: '',
        order: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            router.put(
                route('admin.timelines.update', { id: editingItem.id }),
                { ...formData, order: parseInt(formData.order) || 0 },
                {
                    onSuccess: () => {
                        toast.success('Timeline berhasil diupdate');
                        closeModal();
                    },
                },
            );
        } else {
            router.post(
                route('admin.timelines.store'),
                { ...formData, order: parseInt(formData.order) || 0 },
                {
                    onSuccess: () => {
                        toast.success('Timeline berhasil ditambahkan');
                        closeModal();
                    },
                },
            );
        }
    };

    const handleEdit = (item: Timeline) => {
        setEditingItem(item);
        setFormData({
            year: item.year,
            title: item.title,
            description: item.description || '',
            order: item.order.toString(),
        });
        setShowModal(true);
    };

    const handleDelete = (id: number, title: string) => {
        if (!confirm(`Yakin hapus timeline "${title}"?`)) return;
        router.delete(route('admin.timelines.destroy', { id }), {
            onSuccess: () => toast.success('Timeline berhasil dihapus'),
        });
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setFormData({ year: '', title: '', description: '', order: '' });
    };

    const sortedTimelines = [...timelines].sort(
        (a, b) => a.order - b.order || parseInt(b.year) - parseInt(a.year),
    );

    return (
        <AdminLayout>
            <Head title="Manajemen Timeline Sekolah" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Timeline Sejarah Sekolah
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Kelola perjalanan dan sejarah sekolah dari masa ke
                            masa
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingItem(null);
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-white transition hover:bg-secondary/90"
                    >
                        <Plus className="h-5 w-5" /> Tambah Timeline
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedTimelines.length > 0 ? (
                        sortedTimelines.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                            >
                                <div className="mb-3 flex items-start justify-between">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
                                        <Calendar className="h-4 w-4" />{' '}
                                        {item.year}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        Order: {item.order}
                                    </span>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    {item.title}
                                </h3>
                                {item.description && (
                                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                                        {item.description}
                                    </p>
                                )}
                                <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-sm text-blue-600 transition hover:bg-blue-100"
                                    >
                                        <Edit className="h-4 w-4" /> Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(item.id, item.title)
                                        }
                                        className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-100"
                                    >
                                        <Trash2 className="h-4 w-4" /> Hapus
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
                            <Calendar className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                            <p className="text-lg text-gray-600">
                                Belum ada data timeline
                            </p>
                            <p className="text-sm">
                                Klik tombol "Tambah Timeline" untuk memulai
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                        <div className="mb-6 flex items-center justify-between border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {editingItem
                                    ? 'Edit Timeline'
                                    : 'Tambah Timeline'}
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
                                    Tahun *
                                </label>
                                <input
                                    type="text"
                                    value={formData.year}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            year: e.target.value,
                                        })
                                    }
                                    placeholder="Contoh: 1998"
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                />
                            </div>
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
                                    placeholder="Contoh: Sekolah Didirikan"
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Deskripsi
                                </label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder="Deskripsi singkat tentang event ini"
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
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
                                    placeholder="0"
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Angka lebih kecil muncul lebih dulu
                                </p>
                            </div>
                            <div className="flex items-center justify-end gap-3 border-t pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-lg bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-lg bg-secondary px-6 py-2 text-sm font-medium text-white hover:bg-secondary/90"
                                >
                                    <Save className="h-4 w-4" />{' '}
                                    {editingItem ? 'Update' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
