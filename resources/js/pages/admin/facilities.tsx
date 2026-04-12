import { route } from '@/helpers/route';
import AdminLayout from '@/components/admin/admin-layout';
import { Facility, RoomFacility } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    Building2,
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
    facilities: Facility[];
    roomFacilities: RoomFacility[];
}

export default function FacilitiesAdmin({ facilities, roomFacilities }: Props) {
    const [activeTab, setActiveTab] = useState<'school' | 'room'>('school');

    // School Facility State
    const [showSchoolModal, setShowSchoolModal] = useState(false);
    const [editingSchool, setEditingSchool] = useState<Facility | null>(null);
    const [schoolFormData, setSchoolFormData] = useState({
        name: '',
        category: '',
        description: '',
    });

    // Room Facility State
    const [showRoomModal, setShowRoomModal] = useState(false);
    const [editingRoom, setEditingRoom] = useState<RoomFacility | null>(null);
    const [roomFormData, setRoomFormData] = useState({
        name: '',
        icon_key: '',
        description: '',
        order: 0,
        is_active: true,
    });

    // School Facility Handlers
    const handleSchoolSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingSchool) {
            router.put(
                route('admin.facilities.update', { id: editingSchool.id }),
                schoolFormData,
                {
                    onSuccess: () => {
                        toast.success('Fasilitas berhasil diupdate');
                        closeSchoolModal();
                    },
                },
            );
        } else {
            router.post(route('admin.facilities.store'), schoolFormData, {
                onSuccess: () => {
                    toast.success('Fasilitas berhasil ditambahkan');
                    closeSchoolModal();
                },
            });
        }
    };

    const handleEditSchool = (item: Facility) => {
        setEditingSchool(item);
        setSchoolFormData({
            name: item.name,
            category: item.category,
            description: item.description || '',
        });
        setShowSchoolModal(true);
    };

    const handleDeleteSchool = (id: number, name: string) => {
        if (!confirm(`Yakin hapus fasilitas "${name}"?`)) return;
        router.delete(route('admin.facilities.destroy', { id }), {
            onSuccess: () => toast.success('Fasilitas berhasil dihapus'),
        });
    };

    const closeSchoolModal = () => {
        setShowSchoolModal(false);
        setEditingSchool(null);
        setSchoolFormData({ name: '', category: '', description: '' });
    };

    // Room Facility Handlers
    const handleRoomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingRoom) {
            router.put(
                route('admin.facilities.room.update', {
                    id: editingRoom.id,
                }),
                roomFormData,
                {
                    onSuccess: () => {
                        toast.success('Fasilitas ruangan berhasil diupdate');
                        closeRoomModal();
                    },
                },
            );
        } else {
            router.post(route('admin.facilities.room.store'), roomFormData, {
                onSuccess: () => {
                    toast.success('Fasilitas ruangan berhasil ditambahkan');
                    closeRoomModal();
                },
            });
        }
    };

    const handleEditRoom = (item: RoomFacility) => {
        setEditingRoom(item);
        setRoomFormData({
            name: item.name,
            icon_key: item.icon_key || '',
            description: item.description || '',
            order: item.order || 0,
            is_active: item.is_active,
        });
        setShowRoomModal(true);
    };

    const handleDeleteRoom = (id: number, name: string) => {
        if (!confirm(`Yakin hapus fasilitas "${name}"?`)) return;
        router.delete(route('admin.facilities.room.destroy', { id }), {
            onSuccess: () =>
                toast.success('Fasilitas ruangan berhasil dihapus'),
        });
    };

    const handleMoveRoom = (item: RoomFacility, direction: 'up' | 'down') => {
        const currentIndex = roomFacilities.findIndex((f) => f.id === item.id);
        const targetIndex =
            direction === 'up' ? currentIndex - 1 : currentIndex + 1;

        if (targetIndex < 0 || targetIndex >= roomFacilities.length) return;

        const targetItem = roomFacilities[targetIndex];

        router.put(
            route('admin.facilities.room.update', { id: item.id }),
            { ...item, order: targetItem.order },
            {
                onSuccess: () => {
                    router.put(
                        route('admin.facilities.room.update', {
                            id: targetItem.id,
                        }),
                        { ...targetItem, order: item.order },
                    );
                },
            },
        );
    };

    const closeRoomModal = () => {
        setShowRoomModal(false);
        setEditingRoom(null);
        setRoomFormData({
            name: '',
            icon_key: '',
            description: '',
            order: 0,
            is_active: true,
        });
    };

    const groupedFacilities = facilities.reduce(
        (acc, f) => {
            const key = f.category.toLowerCase();
            if (!acc[key]) acc[key] = [];
            acc[key].push(f);
            return acc;
        },
        {} as Record<string, Facility[]>,
    );

    return (
        <AdminLayout>
            <Head title="Manajemen Fasilitas" />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Manajemen Fasilitas
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Kelola fasilitas sekolah dan ruangan
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('school')}
                        className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-all ${
                            activeTab === 'school'
                                ? 'border-secondary text-secondary'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <Building2 className="h-4 w-4" />
                        Fasilitas Sekolah
                    </button>
                    <button
                        onClick={() => setActiveTab('room')}
                        className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-all ${
                            activeTab === 'room'
                                ? 'border-secondary text-secondary'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <Wrench className="h-4 w-4" />
                        Fasilitas Ruangan
                    </button>
                </div>

                {/* School Facilities Tab */}
                {activeTab === 'school' && (
                    <div className="space-y-6">
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowSchoolModal(true)}
                                className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-white transition hover:bg-secondary/90"
                            >
                                <Plus className="h-5 w-5" /> Tambah Fasilitas
                            </button>
                        </div>

                        {Object.entries(groupedFacilities).map(
                            ([category, items]) => (
                                <div
                                    key={category}
                                    className="rounded-xl border border-gray-100 bg-white shadow-sm"
                                >
                                    <div className="border-b border-gray-100 px-6 py-4">
                                        <h2 className="text-lg font-semibold text-gray-900 capitalize">
                                            {category}
                                        </h2>
                                    </div>
                                    <div className="divide-y divide-gray-50">
                                        {items.map((f) => (
                                            <div
                                                key={f.id}
                                                className="flex items-center justify-between p-4"
                                            >
                                                <div>
                                                    <h3 className="font-medium text-gray-900">
                                                        {f.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {f.description}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEditSchool(f)
                                                        }
                                                        className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteSchool(
                                                                f.id,
                                                                f.name,
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
                                </div>
                            ),
                        )}
                    </div>
                )}

                {/* Room Facilities Tab */}
                {activeTab === 'room' && (
                    <div className="space-y-6">
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowRoomModal(true)}
                                className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-white transition hover:bg-secondary/90"
                            >
                                <Plus className="h-5 w-5" /> Tambah Fasilitas
                                Ruangan
                            </button>
                        </div>

                        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Nama Fasilitas
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Icon
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Deskripsi
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Urutan
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {roomFacilities.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <Wrench className="mr-3 h-5 w-5 text-primary" />
                                                    <span className="font-medium text-gray-900">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {item.icon_key || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {item.description || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button
                                                        onClick={() =>
                                                            handleMoveRoom(
                                                                item,
                                                                'up',
                                                            )
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
                                                            handleMoveRoom(
                                                                item,
                                                                'down',
                                                            )
                                                        }
                                                        disabled={
                                                            index ===
                                                            roomFacilities.length -
                                                                1
                                                        }
                                                        className="rounded p-1 hover:bg-gray-100 disabled:opacity-30"
                                                    >
                                                        <ArrowDown className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap">
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
                                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEditRoom(item)
                                                        }
                                                        className="rounded p-1 text-blue-600 hover:bg-blue-50"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteRoom(
                                                                item.id,
                                                                item.name,
                                                            )
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
                    </div>
                )}
            </div>

            {/* School Facility Modal */}
            {showSchoolModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {editingSchool
                                    ? 'Edit Fasilitas'
                                    : 'Tambah Fasilitas'}
                            </h2>
                            <button
                                onClick={closeSchoolModal}
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form
                            onSubmit={handleSchoolSubmit}
                            className="space-y-4 p-6"
                        >
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Nama *
                                </label>
                                <input
                                    type="text"
                                    value={schoolFormData.name}
                                    onChange={(e) =>
                                        setSchoolFormData({
                                            ...schoolFormData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                    placeholder="Masukkan nama fasilitas"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Kategori *
                                </label>
                                <input
                                    type="text"
                                    value={schoolFormData.category}
                                    onChange={(e) =>
                                        setSchoolFormData({
                                            ...schoolFormData,
                                            category: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                    placeholder="Contoh: Kelas, Akademik, Umum"
                                    list="category-suggestions"
                                />
                                <datalist id="category-suggestions">
                                    <option value="akademik" />
                                    <option value="umum" />
                                    <option value="kelas" />
                                </datalist>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={schoolFormData.description}
                                    onChange={(e) =>
                                        setSchoolFormData({
                                            ...schoolFormData,
                                            description: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    placeholder="Deskripsi fasilitas"
                                />
                            </div>
                            <div className="flex items-center justify-end gap-3 border-t pt-4">
                                <button
                                    type="button"
                                    onClick={closeSchoolModal}
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

            {/* Room Facility Modal */}
            {showRoomModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {editingRoom
                                    ? 'Edit Fasilitas Ruangan'
                                    : 'Tambah Fasilitas Ruangan'}
                            </h2>
                            <button
                                onClick={closeRoomModal}
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form
                            onSubmit={handleRoomSubmit}
                            className="space-y-4 p-6"
                        >
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Nama Fasilitas *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={roomFormData.name}
                                    onChange={(e) =>
                                        setRoomFormData({
                                            ...roomFormData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    placeholder="Contoh: Meja & Kursi Ergonomis"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Icon
                                </label>
                                <select
                                    value={roomFormData.icon_key}
                                    onChange={(e) =>
                                        setRoomFormData({
                                            ...roomFormData,
                                            icon_key: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                >
                                    <option value="">Pilih Icon</option>
                                    <option value="chair">Chair (Kursi)</option>
                                    <option value="board">Board (Papan)</option>
                                    <option value="projector">Projector</option>
                                    <option value="sun">Sun (Matahari)</option>
                                    <option value="book">Book (Buku)</option>
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
                                    value={roomFormData.description}
                                    onChange={(e) =>
                                        setRoomFormData({
                                            ...roomFormData,
                                            description: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    placeholder="Contoh: Nyaman untuk belajar"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Urutan
                                </label>
                                <input
                                    type="number"
                                    value={roomFormData.order}
                                    onChange={(e) =>
                                        setRoomFormData({
                                            ...roomFormData,
                                            order:
                                                parseInt(e.target.value) || 0,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    min="0"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={roomFormData.is_active}
                                    onChange={(e) =>
                                        setRoomFormData({
                                            ...roomFormData,
                                            is_active: e.target.checked,
                                        })
                                    }
                                    className="rounded border-gray-300 text-secondary focus:ring-secondary"
                                />
                                <label
                                    htmlFor="is_active"
                                    className="text-sm text-gray-700"
                                >
                                    Aktif
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 border-t pt-4">
                                <button
                                    type="button"
                                    onClick={closeRoomModal}
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
