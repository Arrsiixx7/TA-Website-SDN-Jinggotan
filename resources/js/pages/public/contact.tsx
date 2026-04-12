import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { route } from '@/helpers/route';
import { router } from '@inertiajs/react';
import {
    CheckCircle,
    AlertCircle,
    MapPin,
    Phone,
    Mail,
    Clock,
} from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        router.post(route('public.contact.store'), formData, {
            onSuccess: () => {
                setSuccess(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setSuccess(false), 5000);
            },
            onError: (errors) => {
                setError(
                    errors.name ||
                        errors.email ||
                        errors.message ||
                        'Terjadi kesalahan',
                );
            },
        });
    };

    return (
        <>
            <Head title="Kontak - SDN Jinggotan" />

            {/* ContactHero */}
            <section className="bg-linear-to-b from-primary-soft to-white pt-36 pb-24">
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <span className="mb-6 inline-block rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">
                        Kontak
                    </span>
                    <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                        Hubungi <span className="text-secondary">Kami</span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        Jika Anda memiliki pertanyaan atau membutuhkan informasi
                        lebih lanjut, silakan hubungi kami melalui kontak di
                        bawah ini.
                    </p>
                    <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-primary" />
                </div>
            </section>

            {/* ContactSection */}
            <section className="bg-white pb-32">
                <div className="mx-auto max-w-6xl px-6">
                    <h2 className="mb-6 text-xl font-bold text-gray-900">
                        Informasi Sekolah
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Contact Info Cards */}
                        <div className="space-y-3">
                            {/* Alamat */}
                            <div className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary">
                                    <MapPin className="h-5 w-5 text-primary transition-colors group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        Alamat
                                    </p>
                                    <p className="mt-0.5 text-sm text-gray-600">
                                        Jl. Raya Bangsri-Keling KM.06
                                    </p>
                                </div>
                            </div>

                            {/* Telepon */}
                            <div className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary">
                                    <Phone className="h-5 w-5 text-primary transition-colors group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        Telepon
                                    </p>
                                    <p className="mt-0.5 text-sm text-gray-600">
                                        085229393771
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary">
                                    <Mail className="h-5 w-5 text-primary transition-colors group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        Email
                                    </p>
                                    <p className="mt-0.5 text-sm text-gray-600">
                                        sdnjinggotan@yahoo.com
                                    </p>
                                </div>
                            </div>

                            {/* Jam Operasional */}
                            <div className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary">
                                    <Clock className="h-5 w-5 text-primary transition-colors group-hover:text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">
                                        Jam Operasional
                                    </p>
                                    <div className="mt-0.5 space-y-0.5 text-sm text-gray-600">
                                        <p>Senin - Kamis: 07.00 - 14.00</p>
                                        <p>Jumat: 07.00 - 11.00</p>
                                        <p>Sabtu: 07.00 - 12.30</p>
                                        <p className="font-medium text-red-500">
                                            Minggu: Libur
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
                            <h3 className="mb-6 text-xl font-bold text-gray-900">
                                Kirim Pesan
                            </h3>

                            {success && (
                                <div className="mb-3 flex items-center gap-3 rounded-xl bg-green-50 p-3 text-green-700">
                                    <CheckCircle className="h-4 w-4 shrink-0" />
                                    <p className="text-sm">
                                        Pesan berhasil dikirim. Terima kasih!
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="mb-3 flex items-center gap-3 rounded-xl bg-red-50 p-3 text-red-700">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Nama Lengkap"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition placeholder:text-gray-400 focus:border-primary focus:outline-none"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition placeholder:text-gray-400 focus:border-primary focus:outline-none"
                                    required
                                />
                                <textarea
                                    rows={3}
                                    placeholder="Pesan"
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            message: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition placeholder:text-gray-400 focus:border-primary focus:outline-none"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={false}
                                    className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                                >
                                    Kirim Pesan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
