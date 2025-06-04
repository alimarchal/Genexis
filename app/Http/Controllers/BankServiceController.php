<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBankServiceRequest;
use App\Http\Requests\UpdateBankServiceRequest;
use App\Models\BankService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class BankServiceController extends Controller
{
    public function index(Request $request)
    {
        $bankServices = QueryBuilder::for(BankService::class)
            ->allowedFilters(BankService::getAllowedFilters())
            ->allowedSorts(BankService::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('BankService/Index', [
            'bankServices' => $bankServices,
            'filters' => request()->only(['filter', 'sort']),
        ]);
    }

    public function create()
    {
        return Inertia::render('BankService/Create');
    }

    public function store(StoreBankServiceRequest $request)
    {
        $data = $request->validated();

        // Convert arrays to JSON for storage
        $data['products'] = json_encode($data['products']);
        $data['benefits'] = json_encode($data['benefits']);

        BankService::create($data);

        return redirect()->route('bank-services.index')
            ->with('success', 'Bank service created successfully.');
    }

    public function show(BankService $bankService)
    {
        return Inertia::render('BankService/Show', [
            'bankService' => $bankService,
        ]);
    }

    public function edit(BankService $bankService)
    {
        return Inertia::render('BankService/Edit', [
            'bankService' => $bankService,
        ]);
    }

    public function update(UpdateBankServiceRequest $request, BankService $bankService)
    {
        $data = $request->validated();

        // Convert arrays to JSON for storage
        $data['products'] = json_encode($data['products']);
        $data['benefits'] = json_encode($data['benefits']);

        $bankService->update($data);

        return redirect()->route('bank-services.index')
            ->with('success', 'Bank service updated successfully.');
    }

    public function destroy(BankService $bankService)
    {
        $bankService->delete();

        return redirect()->route('bank-services.index')
            ->with('success', 'Bank service deleted successfully.');
    }
}
