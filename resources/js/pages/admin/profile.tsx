import { route } from '@/helpers/route';
import AdminLayout from '@/components/admin/admin-layout';
import { SchoolProfile, VisionMission } from '@/types';
import { Head, router } from '@inertiajs/react';
import { BookOpen, Save, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    schoolProfile: SchoolProfile | null;
    visionMission: VisionMission | null;
}

export default function ProfileAdmin({ schoolProfile, visionMission }: Props) {
    const [profileTab, setProfileTab] = useState<'profile' | 'vision-mission'>(
        'profile',
    );
    const [profileData, setProfileData] = useState({
        name: schoolProfile?.name || '',
        principal_name: schoolProfile?.principal_name || '',
        principal_message: schoolProfile?.principal_message || '',
        description: schoolProfile?.description || '',
        address: schoolProfile?.address || '',
        total_students: schoolProfile?.total_students?.toString() || '0',
        total_teachers: schoolProfile?.total_teachers?.toString() || '0',
        total_classes: schoolProfile?.total_classes?.toString() || '0',
        total_achievements:
            schoolProfile?.total_achievements?.toString() || '0',
    });

    const [visionData, setVisionData] = useState({
        vision: visionMission?.vision || '',
        mission: visionMission?.mission || '',
    });
    const [visionImage, setVisionImage] = useState<File | null>(null);
    const [visionImagePreview, setVisionImagePreview] = useState<string | null>(
        visionMission?.image_url || null,
    );
    const [visionImageError, setVisionImageError] = useState<string | null>(
        null,
    );
    const visionFileRef = useRef<HTMLInputElement>(null);

    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
    const MAX_SIZE = 2 * 1024 * 1024;

    const handleVisionImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setVisionImageError(null);
        if (!ALLOWED_TYPES.includes(file.type)) {
            setVisionImageError('Format harus JPG, PNG, atau WEBP');
            return;
        }
        if (file.size > MAX_SIZE) {
            setVisionImageError('Ukuran maksimal 2MB');
            return;
        }

        setVisionImage(file);
        setVisionImagePreview(URL.createObjectURL(file));
    };

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('admin.profile.update'), profileData, {
            onSuccess: () => toast.success('Profil sekolah berhasil diupdate'),
        });
    };

    const handleVisionSave = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('vision', visionData.vision);
        formData.append('mission', visionData.mission);
        if (visionImage) {
            formData.append('image', visionImage);
        }

        router.post(route('admin.profile.vision-mission.update'), formData, {
            onSuccess: () => {
                toast.success('Visi & Misi berhasil diupdate');
                setVisionImage(null);
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Profil Sekolah" />
            <div className="space-y-4 sm:space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        Profil Sekolah
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Kelola informasi sekolah
                    </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="flex overflow-x-auto border-b border-gray-100">
                        <button
                            onClick={() => setProfileTab('profile')}
                            className={`px-4 py-3 text-sm font-medium whitespace-nowrap sm:px-6 ${profileTab === 'profile' ? 'border-b-2 border-secondary text-secondary' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            Profil Sekolah
                        </button>
                        <button
                            onClick={() => setProfileTab('vision-mission')}
                            className={`px-4 py-3 text-sm font-medium whitespace-nowrap sm:px-6 ${profileTab === 'vision-mission' ? 'border-b-2 border-secondary text-secondary' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            Visi & Misi
                        </button>
                    </div>

                    <div className="p-4 sm:p-6">
                        {profileTab === 'profile' && (
                            <form
                                onSubmit={handleProfileSave}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Nama Sekolah
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                            placeholder="Masukkan nama sekolah"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Nama Kepala Sekolah
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.principal_name}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    principal_name:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                            placeholder="Masukkan nama kepala sekolah"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        value={profileData.description}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                        placeholder="Deskripsi sekolah"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Alamat
                                    </label>
                                    <textarea
                                        value={profileData.address}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                address: e.target.value,
                                            })
                                        }
                                        rows={2}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                        placeholder="Alamat sekolah"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Sambutan Kepala Sekolah
                                    </label>
                                    <textarea
                                        value={profileData.principal_message}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                principal_message:
                                                    e.target.value,
                                            })
                                        }
                                        rows={4}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                        placeholder="Sambutan kepala sekolah"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Total Siswa
                                        </label>
                                        <input
                                            type="number"
                                            value={profileData.total_students}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    total_students:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Total Guru
                                        </label>
                                        <input
                                            type="number"
                                            value={profileData.total_teachers}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    total_teachers:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Total Kelas
                                        </label>
                                        <input
                                            type="number"
                                            value={profileData.total_classes}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    total_classes:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Total Prestasi
                                        </label>
                                        <input
                                            type="number"
                                            value={
                                                profileData.total_achievements
                                            }
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    total_achievements:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-lg bg-secondary px-6 py-2 text-sm font-medium text-white hover:bg-secondary/90"
                                >
                                    <Save className="h-4 w-4" /> Simpan
                                </button>
                            </form>
                        )}

                        {profileTab === 'vision-mission' && (
                            <form
                                onSubmit={handleVisionSave}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Visi *
                                    </label>
                                    <textarea
                                        value={visionData.vision}
                                        onChange={(e) =>
                                            setVisionData({
                                                ...visionData,
                                                vision: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                        required
                                        placeholder="Masukkan visi sekolah"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Misi *
                                    </label>
                                    <textarea
                                        value={visionData.mission}
                                        onChange={(e) =>
                                            setVisionData({
                                                ...visionData,
                                                mission: e.target.value,
                                            })
                                        }
                                        rows={6}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                        required
                                        placeholder="Masukkan misi sekolah (gunakan enter untuk baris baru)"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Gambar Visi & Misi
                                    </label>
                                    <input
                                        ref={visionFileRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleVisionImageChange}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                                    />
                                    {visionImageError && (
                                        <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                                            <AlertCircle className="h-4 w-4" />{' '}
                                            {visionImageError}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">
                                        Max 2MB (JPEG, PNG, WebP). Ditampilkan
                                        di beranda & halaman profil.
                                    </p>

                                    {visionImagePreview && (
                                        <div className="mt-3">
                                            <p className="mb-2 text-sm text-gray-500">
                                                Pratinjau:
                                            </p>
                                            <img
                                                src={visionImagePreview}
                                                alt="Preview"
                                                className="h-32 w-48 rounded-lg border object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-lg bg-secondary px-6 py-2 text-sm font-medium text-white hover:bg-secondary/90"
                                >
                                    <Save className="h-4 w-4" /> Simpan
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
