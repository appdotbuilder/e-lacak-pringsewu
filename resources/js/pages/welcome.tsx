import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Head title="e-LACAK Pringsewu - Sistem Manajemen Data Rumah" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <header className="text-center mb-12">
                        <div className="flex justify-center mb-6">
                            <div className="bg-blue-600 rounded-full p-6">
                                <span className="text-4xl">🏘️</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                            e-LACAK Pringsewu
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto">
                            Sistem Manajemen Data Rumah Tidak Layak Huni (RTLH) dan Rumah Layak Huni (RLH) 
                            Kabupaten Pringsewu
                        </p>
                        <p className="text-lg text-gray-500 mb-8">
                            Mendukung transformasi digital Dinas Pekerjaan Umum dan Perumahan Rakyat (PUPR) 
                            Kabupaten Pringsewu
                        </p>
                    </header>

                    {/* Key Features */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                            <div className="text-3xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold mb-3">Dashboard Analitik</h3>
                            <p className="text-gray-600">
                                Statistik rumah layak huni/tidak layak huni per kecamatan, desa, dan kelurahan 
                                dengan visualisasi grafik dan peta distribusi geografis
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                            <div className="text-3xl mb-4">🏠</div>
                            <h3 className="text-xl font-semibold mb-3">Manajemen Data RTLH/RLH</h3>
                            <p className="text-gray-600">
                                CRUD data rumah dengan verifikasi, foto kondisi rumah, koordinat lokasi, 
                                dan integrasi dengan NIK
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                            <div className="text-3xl mb-4">📈</div>
                            <h3 className="text-xl font-semibold mb-3">Modul Backlog</h3>
                            <p className="text-gray-600">
                                Backlog-1 (Okupansi): Keluarga tanpa rumah<br/>
                                Backlog-2 (Kepemilikan): Keluarga dengan rumah tidak layak huni
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                            <div className="text-3xl mb-4">🗺️</div>
                            <h3 className="text-xl font-semibold mb-3">Pemetaan GIS</h3>
                            <p className="text-gray-600">
                                Peta interaktif dengan penanda warna status rumah, filter berdasarkan 
                                kecamatan, desa, dan kategori kelayakan
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                            <div className="text-3xl mb-4">📋</div>
                            <h3 className="text-xl font-semibold mb-3">Ekspor Laporan</h3>
                            <p className="text-gray-600">
                                Ekspor data dalam format PDF, Excel, CSV sesuai standar pusat/provinsi 
                                dengan Indikator Kinerja Daerah (IKD)
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                            <div className="text-3xl mb-4">🔗</div>
                            <h3 className="text-xl font-semibold mb-3">Integrasi Sistem</h3>
                            <p className="text-gray-600">
                                Sinkronisasi dengan SiBaru (Nasional), e-MAHAN (Provinsi), 
                                dan validasi data DTSEN/BPS
                            </p>
                        </div>
                    </div>

                    {/* Statistics Preview */}
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                        <h2 className="text-2xl font-bold text-center mb-8">Target Program 2025-2030</h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                                <div className="text-gray-600">Target Rumah Layak Huni 2030</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">8</div>
                                <div className="text-gray-600">Kecamatan Terdaftar</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">40+</div>
                                <div className="text-gray-600">Desa/Kelurahan</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                                <div className="text-gray-600">Akses Real-time</div>
                            </div>
                        </div>
                    </div>

                    {/* Access Levels */}
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                        <h2 className="text-2xl font-bold text-center mb-8">Tingkat Akses Pengguna</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center p-4 border border-gray-200 rounded-lg">
                                <div className="text-2xl mb-3">👤</div>
                                <h4 className="font-semibold mb-2">Admin PUPR</h4>
                                <p className="text-sm text-gray-600">Akses penuh sistem</p>
                            </div>
                            <div className="text-center p-4 border border-gray-200 rounded-lg">
                                <div className="text-2xl mb-3">💻</div>
                                <h4 className="font-semibold mb-2">Admin Kominfo</h4>
                                <p className="text-sm text-gray-600">Manajemen server & integrasi</p>
                            </div>
                            <div className="text-center p-4 border border-gray-200 rounded-lg">
                                <div className="text-2xl mb-3">✏️</div>
                                <h4 className="font-semibold mb-2">Operator Kecamatan/Desa</h4>
                                <p className="text-sm text-gray-600">Input data lapangan</p>
                            </div>
                            <div className="text-center p-4 border border-gray-200 rounded-lg">
                                <div className="text-2xl mb-3">👥</div>
                                <h4 className="font-semibold mb-2">Masyarakat</h4>
                                <p className="text-sm text-gray-600">Lihat data agregat</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center">
                        <div className="bg-blue-600 text-white rounded-lg p-8 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold mb-4">Mulai Kelola Data Rumah</h2>
                            <p className="text-xl mb-6">
                                Bergabunglah dengan transformasi digital PUPR Kabupaten Pringsewu
                            </p>
                            <div className="space-x-4">
                                <Link href="/register">
                                    <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                                        Daftar Sekarang
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="secondary" className="bg-blue-700 hover:bg-blue-800">
                                        Masuk ke Sistem
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="text-center mt-12 text-gray-500">
                        <p>© 2024 Dinas PUPR Kabupaten Pringsewu. Mendukung Good Governance dan Transparansi.</p>
                    </footer>
                </div>
            </div>
        </>
    );
}