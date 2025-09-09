<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHousingDataRequest;
use App\Http\Requests\UpdateHousingDataRequest;
use App\Models\District;
use App\Models\HousingData;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HousingDataController extends Controller
{
    /**
     * Display a listing of the housing data.
     */
    public function index(Request $request)
    {
        $query = HousingData::with(['district', 'village', 'verifier']);

        // Apply filters
        if ($request->filled('district_id')) {
            $query->where('district_id', $request->district_id);
        }

        if ($request->filled('village_id')) {
            $query->where('village_id', $request->village_id);
        }

        if ($request->filled('housing_status')) {
            $query->where('housing_status', $request->housing_status);
        }

        if ($request->filled('eligibility_category')) {
            $query->where('eligibility_category', $request->eligibility_category);
        }

        if ($request->filled('verification_status')) {
            $query->where('verification_status', $request->verification_status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nik', 'like', "%{$search}%")
                  ->orWhere('head_of_household', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }

        $housingData = $query->latest()->paginate(15);

        $districts = District::orderBy('name')->get(['id', 'name']);
        $villages = Village::orderBy('name')->get(['id', 'name', 'district_id']);

        return Inertia::render('housing-data/index', [
            'housingData' => $housingData,
            'districts' => $districts,
            'villages' => $villages,
            'filters' => $request->only(['district_id', 'village_id', 'housing_status', 'eligibility_category', 'verification_status', 'search']),
        ]);
    }

    /**
     * Show the form for creating new housing data.
     */
    public function create()
    {
        $districts = District::orderBy('name')->get(['id', 'name']);
        $villages = Village::orderBy('name')->get(['id', 'name', 'district_id']);

        return Inertia::render('housing-data/create', [
            'districts' => $districts,
            'villages' => $villages,
        ]);
    }

    /**
     * Store newly created housing data.
     */
    public function store(StoreHousingDataRequest $request)
    {
        $housingData = HousingData::create($request->validated());

        return redirect()->route('housing-data.show', $housingData)
            ->with('success', 'Data rumah berhasil ditambahkan.');
    }

    /**
     * Display the specified housing data.
     */
    public function show(HousingData $housingData)
    {
        $housingData->load(['district', 'village', 'verifier']);

        return Inertia::render('housing-data/show', [
            'housingData' => $housingData,
        ]);
    }

    /**
     * Show the form for editing housing data.
     */
    public function edit(HousingData $housingData)
    {
        $districts = District::orderBy('name')->get(['id', 'name']);
        $villages = Village::orderBy('name')->get(['id', 'name', 'district_id']);

        return Inertia::render('housing-data/edit', [
            'housingData' => $housingData,
            'districts' => $districts,
            'villages' => $villages,
        ]);
    }

    /**
     * Update the specified housing data.
     */
    public function update(UpdateHousingDataRequest $request, HousingData $housingData)
    {
        $housingData->update($request->validated());

        return redirect()->route('housing-data.show', $housingData)
            ->with('success', 'Data rumah berhasil diperbarui.');
    }

    /**
     * Remove the specified housing data.
     */
    public function destroy(HousingData $housingData)
    {
        $housingData->delete();

        return redirect()->route('housing-data.index')
            ->with('success', 'Data rumah berhasil dihapus.');
    }


}