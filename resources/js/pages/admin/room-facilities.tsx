import { route } from '@/helpers/route';
import AdminLayout from '@/components/admin/admin-layout';
import { RoomFacility } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    Wrench,
    Plus,
    Edit,
    Trash2,
    X,
    Save,
    ArrowUp,
    ArrowDown,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    facilities: RoomFacility[];
}

export default function RoomFacilitiesAdmin({ facilities }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<RoomFacility | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        icon_key: '',
        description: '',
        order: 0,
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            router.put(
                route('admin.room-facilities.update', {
                    id: editingItem.id,
                }),
                formData,
                {
                    onSuccess: () => {
                        toast.success('Fasilitas ruangan berhasil diupdate');
                        closeModal();
                    },
                },
            );
        } else {
            router.post(route('admin.room-facilities.store'), formData, {
                onSuccess: () => {
                    toast.success('Fasilitas ruangan berhasil ditambahkan');
                    closeModal();
                },
            });
        }
    };

    const handleEdit = (item: RoomFacility) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            icon_key: item.icon_key || '',
            description: item.description || '',
            order: item.order || 0,
            is_active: item.is_active,
        });
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus fasilitas ini?')) {
            router.delete(
                route('admin.room-facilities.destroy', { id }),
                {
                    onSuccess: () => {
                        toast.success('Fasilitas ruangan berhasil dihapus');
                    },
                },
            );
        }
    };

    const handleMove = (item: RoomFacility, direction: 'up' | 'down') => {
        const currentIndex = facilities.findIndex((f) => f.id === item.id);
        const targetIndex =
            direction === 'up' ? currentIndex - 1 : currentIndex + 1;

        if (targetIndex < 0 || targetIndex >= facilities.length) return;

        const targetItem = facilities[targetIndex];

        // Swap orders
        router.put(
            route('admin.room-facilities.update', { id: item.id }),
            {
                ...item,
                order: targetItem.order,
            },
            {
                onSuccess: () => {
                    router.put(
                        route('admin.room-facilities.update', {
                            id: targetItem.id,
                        }),
                        {
                            ...targetItem,
                            order: item.order,
                        },
                    );
                },
            },
        );
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setFormData({
            name: '',
            icon_key: '',
            description: '',
            order: 0,
            is_active: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Fasilitas Ruangan - Admin" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Fasilitas Ruangan
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola fasilitas standar dalam setiap ruang kelas
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
                    >
                        <Plus className="h-5 w-5" />
                        Tambah Fasilitas
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Nama Fasilitas
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Icon Key
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Deskripsi
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Urutan
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {facilities.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center">
                                            <Wrench className="mr-3 h-5 w-5 text-primary" />
                                            <span className="font-medium text-gray-900">
                                                {item.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {item.icon_key || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {item.description || '-'}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() =>
                                                    handleMove(item, 'up')
                                                }
                                                disabled={index === 0}
                                                className="rounded p-1 hover:bg-gray-100 disabled:opacity-30"
                                            >
                                                <ArrowUp className="h-4 w-4" />
                                            </button>
                                            <span className="text-sm text-gray-600">
                                                {item.order}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleMove(item, 'down')
                                                }
                                                disabled={
                                                    index ===
                                                    facilities.length - 1
                                                }
                                                className="rounded p-1 hover:bg-gray-100 disabled:opacity-30"
                                            >
                                                <ArrowDown className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-center">
                                        <span
                                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                item.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {item.is_active
                                                ? 'Aktif'
                                                : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() =>
                                                    handleEdit(item)
                                                }
                                                className="rounded p-1 text-blue-600 hover:bg-blue-50"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="rounded p-1 text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-full max-w-md rounded-lg bg-white p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {editingItem
                                        ? 'Edit Fasilitas'
                                        : 'Tambah Fasilitas'}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="rounded p-1 hover:bg-gray-100"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Nama Fasilitas
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Contoh: Meja & Kursi Ergonomis"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Icon Key
                                    </label>
                                    <select
                                        value={formData.icon_key}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                icon_key: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        <option value="">Pilih Icon</option>
                                        <option value="chair">
                                            Chair (Kursi)
                                        </option>
                                        <option value="board">
                                            Board (Papan)
                                        </option>
                                        <option value="projector">
                                            Projector
                                        </option>
                                        <option value="sun">
                                            Sun (Matahari)
                                        </option>
                                        <option value="book">
                                            Book (Buku)
                                        </option>
                                        <option value="fan">Fan (Kipas)</option>
                                    </select>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Pilih icon yang akan ditampilkan
                                    </p>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Contoh: Nyaman untuk belajar"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Urutan
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                order: parseInt(
                                                    e.target.value,
                                                ) || 0,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        min="0"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={formData.is_active}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                is_active: e.target.checked,
                                            })
                                        }
                                        className="rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label
                                        htmlFor="is_active"
                                        className="text-sm text-gray-700"
                                    >
                                        Aktif
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
                                    >
                                        <Save className="h-4 w-4" />
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
