<?php

namespace App\Policies;

use App\Models\ProductSchemeAttribute;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProductSchemeAttributePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, ProductSchemeAttribute $productSchemeAttribute): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, ProductSchemeAttribute $productSchemeAttribute): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ProductSchemeAttribute $productSchemeAttribute): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, ProductSchemeAttribute $productSchemeAttribute): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, ProductSchemeAttribute $productSchemeAttribute): bool
    {
        return false;
    }
}
