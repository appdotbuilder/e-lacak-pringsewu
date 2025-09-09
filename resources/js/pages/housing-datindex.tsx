import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React from 'react';

interface District {
    id: number;
    name: string;
}

interface Village {
    id: number;
    name: string;
    district_id: number;
}

interface HousingData {
    id: number;
    nik: string;
    head_of_household: string;
    district: { name: string };
    village: { name: string };
    address: string;
    housing_status: string;
    eligibility_category: string;
    verification_status: string;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedData {
    data: HousingData[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    housingData: PaginatedData;
    districts: District[];
    villages: Village[];
    filters: {
        district_id?: string;
        village_id?: string;
        housing_status?: string;
        eligibility_category?: string;
        verification_status?: string;
        search?: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Data Rumah',
        href: '/housing-data',
    },
];

export default function HousingDataIndex({ housingData, districts, filters }: Props) {
    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters } as Record<string, string>;
        newFilters[key] = value;
        if (!value) delete newFilters[key];
        
        router.get('/housing-data', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

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
            <Head title="Data Rumah - e-LACAK" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🏠 Data Rumah RTLH/RLH</h1>
                        <p className="text-gray-600 mt-1">
                            Total {housingData.total.toLocaleString()} data rumah terdaftar
                        </p>
                    </div>
                    <Link href="/housing-data/create">
                        <Button>➕ Tambah Data Baru</Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">🔍 Filter Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kecamatan
                            </label>
                            <select 
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                value={filters.district_id || ''}
                                onChange={(e) => handleFilterChange('district_id', e.target.value)}
                            >
                                <option value="">Semua Kecamatan</option>
                                {districts.map((district) => (
                                    <option key={district.id} value={district.id}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status Rumah
                            </label>
                            <select 
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                value={filters.housing_status || ''}
                                onChange={(e) => handleFilterChange('housing_status', e.target.value)}
                            >
                                <option value="">Semua Status</option>
                                <option value="RTLH">RTLH (Tidak Layak Huni)</option>
                                <option value="RLH">RLH (Layak Huni)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status Verifikasi
                            </label>
                            <select 
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                value={filters.verification_status || ''}
                                onChange={(e) => handleFilterChange('verification_status', e.target.value)}
                            >
                                <option value="">Semua Status</option>
                                <option value="pending">Menunggu Verifikasi</option>
                                <option value="verified">Terverifikasi</option>
                                <option value="rejected">Ditolak</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pencarian
                            </label>
                            <input 
                                type="text"
                                placeholder="NIK, Nama, atau Alamat"
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                value={filters.search || ''}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-lg shadow-sm border">
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
                                        Status Rumah
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Verifikasi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal Input
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {housingData.data.map((housing) => (
                                    <tr key={housing.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {housing.head_of_household}
                                                </div>
                                                <div className="text-sm text-gray-500">{housing.nik}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{housing.district.name}</div>
                                            <div className="text-sm text-gray-500">{housing.village.name}</div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {housing.address.length > 50 
                                                    ? housing.address.substring(0, 50) + '...' 
                                                    : housing.address
                                                }
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(housing.housing_status)}`}>
                                                {housing.housing_status}
                                            </span>
                                            <div className="text-xs text-gray-500 mt-1 capitalize">
                                                {housing.eligibility_category.replace('_', ' ')}
                                            </div>
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link href={`/housing-data/${housing.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        👁️ Lihat
                                                    </Button>
                                                </Link>
                                                <Link href={`/housing-data/${housing.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        ✏️ Edit
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {housingData.last_page > 1 && (
                        <div className="px-6 py-3 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    Halaman {housingData.current_page} dari {housingData.last_page}
                                </div>
                                <div className="flex space-x-2">
                                    {housingData.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-1 text-sm rounded ${
                                                link.active 
                                                    ? 'bg-blue-600 text-white' 
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}