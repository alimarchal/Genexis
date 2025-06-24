<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Branch;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $contacts = QueryBuilder::for(Contact::class)
            ->with('branch')
            ->allowedFilters(Contact::getAllowedFilters())
            ->allowedSorts(Contact::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        $branches = Branch::active()->orderBy('name')->get();

        return Inertia::render('ContactManagement/Index', [
            'contacts' => $contacts,
            'branches' => $branches,
            'filters' => $request->query(),
        ]);
    }

    public function create()
    {
        $branches = Branch::active()->orderBy('name')->get();

        return Inertia::render('ContactManagement/Create', [
            'branches' => $branches,
        ]);
    }

    public function store(StoreContactRequest $request)
    {
        $data = $request->validated();

        Contact::create($data);

        return redirect()->route('contacts.index')
            ->with('success', 'Contact created successfully.');
    }

    public function show(Contact $contact)
    {
        $contact->load('branch');

        return Inertia::render('ContactManagement/Show', [
            'contact' => $contact,
        ]);
    }

    public function edit(Contact $contact)
    {
        $branches = Branch::active()->orderBy('name')->get();
        $contact->load('branch');

        return Inertia::render('ContactManagement/Edit', [
            'contact' => $contact,
            'branches' => $branches,
        ]);
    }

    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $data = $request->validated();

        $contact->update($data);

        return redirect()->route('contacts.index')
            ->with('success', 'Contact updated successfully.');
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('contacts.index')
            ->with('success', 'Contact deleted successfully.');
    }
}
