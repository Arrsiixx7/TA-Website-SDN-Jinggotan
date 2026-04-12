import { route } from '@/helpers/route';
import AdminLayout from '@/components/admin/admin-layout';
import { Teacher } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    Users,
    Plus,
    Edit,
    Trash2,
    X,
    Save,
    Image as ImageIcon,
    User,
} from 'lucide-react';
import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';

interface Props {
    teachers: Teacher[];
}

const FILTER_OPTIONS = [
    { key: 'all', label: 'Semua' },
    { key: 'teacher', label: 'Guru' },
    { key: 'staff', label: 'Tenaga Kependidikan' },
    { key: 'principal', label: 'Kepala Sekolah' },
] as const;

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function isKepala(t: Teacher) {
    return (
        t.role === 'principal' || t.position?.toLowerCase().includes('kepala')
    );
}

function capitalize(text: string | null) {
    if (!text) return '';
    return text.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function TeachersAdmin({ teachers }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        role: 'teacher' as 'principal' | 'teacher' | 'staff',
        position: '',
        class: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('all');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredTeachers = teachers.filter((t) => {
        if (filter === 'all') return true;
        if (filter === 'principal') return isKepala(t);
        if (filter === 'staff') return t.role === 'staff' && !isKepala(t);
        return t.role === 'teacher' && !isKepala(t);
    });

    const guruCount = teachers.filter(
        (t) => t.role === 'teacher' && !isKepala(t),
    ).length;
    const staffCount = teachers.filter((t) => t.role === 'staff').length;
    const kepalaCount = teachers.filter((t) => isKepala(t)).length;

    const validateFile = useCallback((file: File): boolean => {
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            setFileError('Format harus JPG, PNG, atau WEBP');
            return false;
        }
        if (file.size > MAX_FILE_SIZE) {
            setFileError('Ukuran maksimal 5MB');
            return false;
        }
        setFileError(null);
        return true;
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!validateFile(file)) {
            setImageFile(null);
            return;
        }
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const resetForm = () => {
        setFormData({ name: '', role: 'teacher', position: '', class: '' });
        setImageFile(null);
        setImagePreview(null);
        setFileError(null);
        setEditingTeacher(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (fileError) return;

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        if (imageFile) data.append('image', imageFile);

        if (editingTeacher) {
            data.append('_method', 'PUT');
            router.post(
                route('admin.teachers.update', { id: editingTeacher.id }),
                data,
                {
                    onSuccess: () => {
                        toast.success('Data berhasil diupdate');
                        closeModal();
                    },
                },
            );
        } else {
            router.post(route('admin.teachers.store'), data, {
                onSuccess: () => {
                    toast.success('Data berhasil ditambahkan');
                    closeModal();
                },
            });
        }
    };

    const handleEdit = (teacher: Teacher) => {
        setEditingTeacher(teacher);
        setFormData({
            name: teacher.name,
            role: teacher.role,
            position: teacher.position || '',
            class: teacher.class || '',
        });
        setImagePreview(teacher.image_url || null);
        setImageFile(null);
        setFileError(null);
        setShowModal(true);
    };

    const handleDelete = (id: number, name: string) => {
        if (!confirm(`Yakin hapus data ${name}?`)) return;
        router.delete(route('admin.teachers.destroy', { id }), {
            onSuccess: () => toast.success('Data berhasil dihapus'),
        });
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Guru" />

            <div className="space-y-4 sm:space-y-6">
                {/* HEADER */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                            Manajemen Tenaga Pendidik
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Kelola data guru, staff, dan kepala sekolah
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 text-white transition hover:bg-secondary/90"
                    >
                        <Plus className="h-5 w-5" />
                        Tambah Data
                    </button>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                        <p className="text-sm font-medium text-blue-700">
                            Guru
                        </p>
                        <p className="mt-1 text-2xl font-bold text-blue-900">
                            {guruCount}
                        </p>
                    </div>
                    <div className="rounded-xl border border-yellow-100 bg-yellow-50 p-4">
                        <p className="text-sm font-medium text-yellow-700">
                            Tenaga Kependidikan
                        </p>
                        <p className="mt-1 text-2xl font-bold text-yellow-900">
                            {staffCount}
                        </p>
                    </div>
                    <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                        <p className="text-sm font-medium text-purple-700">
                            Kepala Sekolah
                        </p>
                        <p className="mt-1 text-2xl font-bold text-purple-900">
                            {kepalaCount}
                        </p>
                    </div>
                </div>

                {/* FILTER TABS */}
                <div className="flex flex-wrap gap-2">
                    {FILTER_OPTIONS.map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className={`rounded-full px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
                                filter === f.key
                                    ? 'bg-secondary text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* CARD GRID LIST */}
                {filteredTeachers.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredTeachers.map((teacher) => (
                            <div
                                key={teacher.id}
                                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    {teacher.image_url ? (
                                        <img
                                            src={teacher.image_url}
                                            alt={teacher.name}
                                            className="h-12 w-12 shrink-0 rounded-full object-cover sm:h-14 sm:w-14"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 sm:h-14 sm:w-14">
                                            <User className="h-6 w-6 text-gray-400 sm:h-7 sm:w-7" />
                                        </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate font-semibold text-gray-900">
                                            {teacher.name}
                                        </h3>
                                        <p className="truncate text-sm text-gray-600">
                                            {capitalize(teacher.position)}
                                        </p>
                                        {teacher.class && (
                                            <p className="text-xs text-gray-500">
                                                {teacher.class}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center justify-between sm:mt-4">
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-xs font-medium sm:px-2.5 sm:py-1 ${
                                            isKepala(teacher)
                                                ? 'bg-purple-100 text-purple-700'
                                                : teacher.role === 'staff'
                                                  ? 'bg-yellow-100 text-yellow-700'
                                                  : 'bg-blue-100 text-blue-700'
                                        }`}
                                    >
                                        {isKepala(teacher)
                                            ? 'Kepala Sekolah'
                                            : teacher.role === 'staff'
                                              ? 'Tenaga Kependidikan'
                                              : 'Guru'}
                                    </span>
                                    <div className="flex gap-1.5 sm:gap-2">
                                        <button
                                            onClick={() => handleEdit(teacher)}
                                            className="rounded-lg bg-blue-50 p-1.5 text-blue-600 transition hover:bg-blue-100 sm:p-2"
                                            title="Edit"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    teacher.id,
                                                    teacher.name,
                                                )
                                            }
                                            className="rounded-lg bg-red-50 p-1.5 text-red-600 transition hover:bg-red-100 sm:p-2"
                                            title="Hapus"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl bg-white p-8 text-center shadow-sm sm:p-12">
                        <ImageIcon className="mx-auto mb-3 h-10 w-10 text-gray-300 sm:h-12 sm:w-12" />
                        <p className="text-gray-600">
                            Belum ada data{' '}
                            {FILTER_OPTIONS.find(
                                (f) => f.key === filter,
                            )?.label?.toLowerCase() ?? ''}
                        </p>
                    </div>
                )}
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center">
                    <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-xl bg-white shadow-xl sm:max-w-lg sm:rounded-xl">
                        <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
                            <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                                {editingTeacher ? 'Edit Data' : 'Tambah Data'}
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
                                    Nama Lengkap *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                    placeholder="Masukkan nama lengkap"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Jabatan *
                                </label>
                                <input
                                    type="text"
                                    value={formData.position}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            position: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                    placeholder="Contoh: Guru Kelas 1"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Role *
                                </label>
                                <select
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            role: e.target.value as
                                                | 'principal'
                                                | 'teacher'
                                                | 'staff',
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                >
                                    <option value="teacher">Guru</option>
                                    <option value="staff">
                                        Tenaga Kependidikan
                                    </option>
                                    <option value="principal">
                                        Kepala Sekolah
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Kelas
                                </label>
                                <input
                                    type="text"
                                    value={formData.class}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            class: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    placeholder="Contoh: Kelas 1"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Foto
                                </label>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleFileChange}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                />
                                {fileError && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {fileError}
                                    </p>
                                )}
                                {imagePreview && (
                                    <div className="mt-3">
                                        <p className="mb-2 text-sm text-gray-500">
                                            Pratinjau:
                                        </p>
                                        {imagePreview.startsWith('data:') ||
                                        imagePreview.startsWith('blob:') ? (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="h-24 w-24 rounded-lg border object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-24 w-24 items-center justify-center rounded-lg border bg-gray-100">
                                                <User className="h-12 w-12 text-gray-400" />
                                            </div>
                                        )}
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
                                    <Save className="h-4 w-4" />
                                    {editingTeacher ? 'Update' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
