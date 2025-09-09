<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreHousingDataRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nik' => 'required|string|size:16|unique:housing_data,nik',
            'head_of_household' => 'required|string|max:255',
            'district_id' => 'required|exists:districts,id',
            'village_id' => 'required|exists:villages,id',
            'address' => 'required|string',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'housing_status' => 'required|in:RTLH,RLH',
            'eligibility_category' => 'required|in:livable,uninhabitable,under_repair',
            'house_condition_notes' => 'nullable|string',
            'photos' => 'nullable|array',
            'photos.*' => 'string',
            'documents' => 'nullable|array',
            'documents.*' => 'string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nik.required' => 'NIK wajib diisi.',
            'nik.size' => 'NIK harus 16 digit.',
            'nik.unique' => 'NIK sudah terdaftar dalam sistem.',
            'head_of_household.required' => 'Nama kepala keluarga wajib diisi.',
            'district_id.required' => 'Kecamatan wajib dipilih.',
            'district_id.exists' => 'Kecamatan tidak valid.',
            'village_id.required' => 'Desa/Kelurahan wajib dipilih.',
            'village_id.exists' => 'Desa/Kelurahan tidak valid.',
            'address.required' => 'Alamat wajib diisi.',
            'housing_status.required' => 'Status rumah wajib dipilih.',
            'housing_status.in' => 'Status rumah tidak valid.',
            'eligibility_category.required' => 'Kategori kelayakan wajib dipilih.',
            'eligibility_category.in' => 'Kategori kelayakan tidak valid.',
            'latitude.between' => 'Latitude harus antara -90 dan 90.',
            'longitude.between' => 'Longitude harus antara -180 dan 180.',
        ];
    }
}