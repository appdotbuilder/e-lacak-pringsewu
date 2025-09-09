import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

interface DashboardStats {
    total_housing: number;
    rtlh_count: number;
    rlh_count: number;
    verified_count: number;
    rtlh_percentage: number;
    rlh_percentage: number;
}

interface DistrictStat {
    id: number;
    name: string;
    total_housing: number;
    rtlh_count: number;
    rlh_count: number;
    rtlh_percentage: number;
    rlh_percentage: number;
}

interface BacklogStats {
    backlog_1: number;
    backlog_2: number;
    year: number;
}

interface RecentHousingData {
    id: number;
    nik: string;
    head_of_household: string;
    district: string;
    village: string;
    housing_status: string;
    eligibility_category: string;
    verification_status: string;
    created_at: string;
}

interface PerformanceIndicator {
    district_name: string;
    livable_house_percentage: number;
    achievement_percentage: number;
    target_livable_houses: number;
    achieved_livable_houses: number;
}

interface Props {
    overallStats: DashboardStats;
    districtStats: DistrictStat[];
    backlogStats: BacklogStats;
    recentHousingData: RecentHousingData[];
    performanceIndicators: PerformanceIndicator[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ 
    overallStats, 
    districtStats, 
    backlogStats, 
    recentHousingData 
}: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'RTLH':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'RLH':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getVerificationColor = (status: string) => {
        switch (status) {
            case 'verified':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard e-LACAK" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🏘️ Dashboard e-LACAK</h1>
                        <p className="text-gray-600 mt-1">Sistem Manajemen Data RTLH/RLH Kabupaten Pringsewu</p>
                    </div>
                    <Link href="/housing-data/create">
                        <Button>➕ Tambah Data Rumah</Button>
                    </Link>
                </div>

                {/* Overall Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                🏠
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Data Rumah</p>
                                <p className="text-2xl font-bold text-gray-900">{overallStats.total_housing.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-red-100 text-red-600">
                                🚨
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">RTLH (Tidak Layak)</p>
                                <p className="text-2xl font-bold text-gray-900">{overallStats.rtlh_count.toLocaleString()}</p>
                                <p className="text-sm text-red-600">{overallStats.rtlh_percentage}% dari total</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                ✅
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">RLH (Layak Huni)</p>
                                <p className="text-2xl font-bold text-gray-900">{overallStats.rlh_count.toLocaleString()}</p>
                                <p className="text-sm text-green-600">{overallStats.rlh_percentage}% dari total</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                ✓
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Data Terverifikasi</p>
                                <p className="text-2xl font-bold text-gray-900">{overallStats.verified_count.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Backlog Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Data Backlog {backlogStats.year}</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Backlog-1 (Okupansi)</p>
                                    <p className="text-sm text-gray-600">Keluarga tanpa rumah</p>
                                </div>
                                <div className="text-2xl font-bold text-orange-600">
                                    {backlogStats.backlog_1.toLocaleString()}
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Backlog-2 (Kepemilikan)</p>
                                    <p className="text-sm text-gray-600">Keluarga dengan rumah tidak layak</p>
                                </div>
                                <div className="text-2xl font-bold text-red-600">
                                    {backlogStats.backlog_2.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Quick Actions</h3>
                        <div className="space-y-3">
                            <Link href="/housing-data">
                                <Button variant="outline" className="w-full justify-start">
                                    📋 Lihat Semua Data Rumah
                                </Button>
                            </Link>
                            <Link href="/housing-data?verification_status=pending">
                                <Button variant="outline" className="w-full justify-start">
                                    ⏳ Data Menunggu Verifikasi
                                </Button>
                            </Link>
                            <Link href="/reports">
                                <Button variant="outline" className="w-full justify-start">
                                    📊 Export Laporan
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* District Statistics */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold text-gray-900">📍 Statistik per Kecamatan</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kecamatan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total Rumah
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        RTLH
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        RLH
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        % RTLH
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {districtStats.map((district) => (
                                    <tr key={district.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {district.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {district.total_housing.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                                            {district.rtlh_count.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                                            {district.rlh_count.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="flex items-center">
                                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                                                    <div 
                                                        className="bg-red-500 h-2 rounded-full" 
                                                        style={{ width: `${Math.min(district.rtlh_percentage, 100)}%` }}
                                                    />
                                                </div>
                                                {district.rtlh_percentage}%
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Housing Data */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-6 border-b">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">🕐 Data Rumah Terbaru</h3>
                            <Link href="/housing-data">
                                <Button variant="outline" size="sm">Lihat Semua</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NIK/Kepala Keluarga
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lokasi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Verifikasi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal Input
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentHousingData.map((housing) => (
                                    <tr key={housing.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{housing.head_of_household}</div>
                                                <div className="text-sm text-gray-500">{housing.nik}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{housing.district}</div>
                                            <div className="text-sm text-gray-500">{housing.village}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(housing.housing_status)}`}>
                                                {housing.housing_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getVerificationColor(housing.verification_status)}`}>
                                                {housing.verification_status === 'verified' ? 'Terverifikasi' :
                                                 housing.verification_status === 'pending' ? 'Menunggu' : 'Ditolak'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(housing.created_at).toLocaleDateString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}