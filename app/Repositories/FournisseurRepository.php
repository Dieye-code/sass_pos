<?php

namespace App\Repositories;

use App\Interfaces\FournisseurInterface;
use App\Models\Fournisseur;
use Illuminate\Support\Facades\Auth;

class FournisseurRepository extends BaseRepository implements FournisseurInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    public function getAll()
    {
        return Fournisseur::with('abonnement')->where('abonnement_id', Auth::user()?->abonnement_id)->get();
    }
    public function find($id)
    {
        return Fournisseur::where('id', $id)->with('abonnement')->first();
    }
    public function delete($id)
    {
        return Fournisseur::find($id)?->delete();
    }
    public function create($info)
    {
        return Fournisseur::create($info);
    }
    public function update($id,$info)
    {
        return Fournisseur::find($id)?->update($info);
    }
}
