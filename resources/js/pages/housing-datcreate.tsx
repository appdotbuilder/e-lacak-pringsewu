import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
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

interface Props {
    districts: District[];
    villages: Village[];
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
    {
        title: 'Tambah Data',
        href: '/housing-data/create',
    },
];

export default function CreateHousingData({ districts, villages }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nik: '',
        head_of_household: '',
        district_id: '',
        village_id: '',
        address: '',
        latitude: '',
        longitude: '',
        housing_status: '',
        eligibility_category: '',
        house_condition_notes: '',
    });

    const filteredVillages = data.district_id 
        ? villages.filter(village => village.district_id === parseInt(data.district_id))
        : [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/housing-data');
    };

    const handleDistrictChange = (districtId: string) => {
        setData({
            ...data,
            district_id: districtId,
            village_id: '', // Reset village when district changes
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Data Rumah - e-LACAK" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">➕ Tambah Data Rumah</h1>
                    <p className="text-gray-600 mt-1">
                        Input data rumah baru untuk pendataan RTLH/RLH
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* NIK and Head of Household */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    NIK <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nik}
                                    onChange={(e) => setData('nik', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="1234567890123456"
                                    maxLength={16}
                                    required
                                />
                                {errors.nik && <p className="text-red-500 text-sm mt-1">{errors.nik}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Kepala Keluarga <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.head_of_household}
                                    onChange={(e) => setData('head_of_household', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nama lengkap kepala keluarga"
                                    required
                                />
                                {errors.head_of_household && <p className="text-red-500 text-sm mt-1">{errors.head_of_household}</p>}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kecamatan <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.district_id}
                                    onChange={(e) => handleDistrictChange(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Pilih Kecamatan</option>
                                    {districts.map((district) => (
                                        <option key={district.id} value={district.id}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.district_id && <p className="text-red-500 text-sm mt-1">{errors.district_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Desa/Kelurahan <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.village_id}
                                    onChange={(e) => setData('village_id', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    disabled={!data.district_id}
                                >
                                    <option value="">Pilih Desa/Kelurahan</option>
                                    {filteredVillages.map((village) => (
                                        <option key={village.id} value={village.id}>
                                            {village.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.village_id && <p className="text-red-500 text-sm mt-1">{errors.village_id}</p>}
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Alamat Lengkap <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Alamat lengkap rumah"
                                rows={3}
                                required
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        </div>

                        {/* Coordinates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Latitude (Opsional)
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    value={data.latitude}
                                    onChange={(e) => setData('latitude', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="-5.123456"
                                />
                                {errors.latitude && <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Longitude (Opsional)
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    value={data.longitude}
                                    onChange={(e) => setData('longitude', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="104.123456"
                                />
                                {errors.longitude && <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>}
                            </div>
                        </div>

                        {/* Housing Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status Rumah <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.housing_status}
                                    onChange={(e) => setData('housing_status', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Pilih Status</option>
                                    <option value="RTLH">RTLH (Rumah Tidak Layak Huni)</option>
                                    <option value="RLH">RLH (Rumah Layak Huni)</option>
                                </select>
                                {errors.housing_status && <p className="text-red-500 text-sm mt-1">{errors.housing_status}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kategori Kelayakan <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.eligibility_category}
                                    onChange={(e) => setData('eligibility_category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Pilih Kategori</option>
                                    <option value="livable">Layak Huni</option>
                                    <option value="uninhabitable">Tidak Layak Huni</option>
                                    <option value="under_repair">Dalam Perbaikan</option>
                                </select>
                                {errors.eligibility_category && <p className="text-red-500 text-sm mt-1">{errors.eligibility_category}</p>}
                            </div>
                        </div>

                        {/* House Condition Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Catatan Kondisi Rumah (Opsional)
                            </label>
                            <textarea
                                value={data.house_condition_notes}
                                onChange={(e) => setData('house_condition_notes', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Deskripsi kondisi rumah, kerusakan, atau catatan khusus lainnya"
                                rows={3}
                            />
                            {errors.house_condition_notes && <p className="text-red-500 text-sm mt-1">{errors.house_condition_notes}</p>}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end space-x-4">
                            <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Batal
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={processing}
                            >
                                {processing ? 'Menyimpan...' : '💾 Simpan Data'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}