import { route } from '@/helpers/route';
import AdminLayout from '@/components/admin/admin-layout';
import { User } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import {
    Users,
    Plus,
    Trash2,
    X,
    Save,
    Mail,
    Eye,
    EyeOff,
    Send,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    admins: User[];
}

export default function AdminsAdmin({ admins }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedAdmins, setSelectedAdmins] = useState<number[]>([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const emailForm = useForm({
        subject: '',
        message: '',
        recipients: [] as number[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.admins.store'), {
            onSuccess: () => {
                toast.success('Admin berhasil ditambahkan');
                closeModal();
            },
        });
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        emailForm.post(route('admin.admins.email'), {
            onSuccess: () => {
                toast.success('Email berhasil dikirim');
                closeEmailModal();
            },
        });
    };

    const toggleAdminSelection = (id: number) => {
        setSelectedAdmins((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
        );
    };

    const selectAllAdmins = () => {
        if (selectedAdmins.length === admins.length) {
            setSelectedAdmins([]);
        } else {
            setSelectedAdmins(admins.map((a) => a.id));
        }
    };

    const handleDelete = (id: number, name: string) => {
        if (!confirm(`Yakin hapus admin "${name}"?`)) return;
        router.delete(route('admin.admins.destroy', { id }), {
            onSuccess: () => toast.success('Admin berhasil dihapus'),
            onError: () =>
                toast.error('Tidak dapat menghapus akun Anda sendiri'),
        });
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
        setShowPassword(false);
    };

    const closeEmailModal = () => {
        setShowEmailModal(false);
        emailForm.reset();
        setSelectedAdmins([]);
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Admin" />
            <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                            Manajemen Admin
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Kelola email dan akun admin
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowEmailModal(true)}
                            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs text-white transition hover:bg-blue-700 sm:px-4 sm:py-2 sm:text-sm"
                        >
                            <Send className="h-4 w-4 sm:h-5 sm:w-5" />{' '}
                            <span className="hidden sm:inline">
                                Kirim Email
                            </span>
                            <span className="sm:hidden">Email</span>
                        </button>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs text-white transition hover:bg-secondary/90 sm:px-4 sm:py-2 sm:text-sm"
                        >
                            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />{' '}
                            <span className="hidden sm:inline">
                                Tambah Admin
                            </span>
                            <span className="sm:hidden">Tambah</span>
                        </button>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                    {admins.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {admins.map((admin) => (
                                <div
                                    key={admin.id}
                                    className="flex items-center justify-between p-3 sm:p-4"
                                >
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 sm:h-10 sm:w-10">
                                            <Mail className="h-4 w-4 text-secondary sm:h-5 sm:w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 sm:text-base">
                                                {admin.name}
                                            </p>
                                            <p className="text-xs text-gray-600 sm:text-sm">
                                                {admin.email}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleDelete(admin.id, admin.name)
                                        }
                                        className="rounded-lg bg-red-50 p-1.5 text-red-600 transition hover:bg-red-100 sm:p-2"
                                        title="Hapus"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center sm:py-12">
                            <Users className="mx-auto mb-4 h-10 w-10 text-gray-300 sm:h-12 sm:w-12" />
                            <p className="text-gray-600">Belum ada admin</p>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center">
                    <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-xl bg-white shadow-xl sm:max-w-lg sm:rounded-xl">
                        <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
                            <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                                Tambah Admin Baru
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
                                    Nama *
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                    placeholder="Masukkan nama admin"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                    placeholder="Masukkan email admin"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Password *
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                        required
                                        placeholder="Minimal 8 karakter"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Konfirmasi Password *
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                    placeholder="Ulangi password"
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
                                    disabled={processing}
                                    className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary/90 disabled:opacity-50"
                                >
                                    <Save className="h-4 w-4" />{' '}
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEmailModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center">
                    <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-xl bg-white shadow-xl sm:max-w-2xl sm:rounded-xl">
                        <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
                            <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                                Kirim Email ke Admin
                            </h2>
                            <button
                                onClick={closeEmailModal}
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form
                            onSubmit={handleEmailSubmit}
                            className="space-y-4 p-4 sm:p-6"
                        >
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Pilih Penerima *
                                </label>
                                <div className="mb-2 flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={selectAllAdmins}
                                        className="text-xs text-secondary hover:underline"
                                    >
                                        {selectedAdmins.length === admins.length
                                            ? 'Batal Pilih Semua'
                                            : 'Pilih Semua'}
                                    </button>
                                    {selectedAdmins.length > 0 && (
                                        <span className="text-xs text-gray-500">
                                            ({selectedAdmins.length} dipilih)
                                        </span>
                                    )}
                                </div>
                                <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-200">
                                    {admins.map((admin) => (
                                        <label
                                            key={admin.id}
                                            className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-0 hover:bg-gray-50"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedAdmins.includes(
                                                    admin.id,
                                                )}
                                                onChange={() =>
                                                    toggleAdminSelection(
                                                        admin.id,
                                                    )
                                                }
                                                className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {admin.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {admin.email}
                                                </p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {emailForm.errors.recipients && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {emailForm.errors.recipients}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Subjek *
                                </label>
                                <input
                                    type="text"
                                    value={emailForm.data.subject}
                                    onChange={(e) =>
                                        emailForm.setData(
                                            'subject',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                    placeholder="Masukkan subjek email"
                                />
                                {emailForm.errors.subject && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {emailForm.errors.subject}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Pesan *
                                </label>
                                <textarea
                                    value={emailForm.data.message}
                                    onChange={(e) =>
                                        emailForm.setData(
                                            'message',
                                            e.target.value,
                                        )
                                    }
                                    rows={5}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    required
                                    placeholder="Tulis pesan email..."
                                />
                                {emailForm.errors.message && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {emailForm.errors.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center justify-end gap-3 border-t pt-4">
                                <button
                                    type="button"
                                    onClick={closeEmailModal}
                                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={
                                        emailForm.processing ||
                                        selectedAdmins.length === 0
                                    }
                                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    <Send className="h-4 w-4" />{' '}
                                    {emailForm.processing
                                        ? 'Mengirim...'
                                        : 'Kirim Email'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
