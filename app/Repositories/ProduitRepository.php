<?php

namespace App\Repositories;

use App\Interfaces\ProduitInterface;
use App\Models\Produit;
use Illuminate\Support\Facades\Auth;

class ProduitRepository extends BaseRepository implements ProduitInterface
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
        return Produit::with('abonnement')->where('abonnement_id', Auth::user()?->abonnement_id)->get();
    }
    public function find($id)
    {
        return Produit::where('id', $id)->with('abonnement')->first();
    }
    public function delete($id)
    {
        return Produit::find($id)?->delete();
    }
    public function create($info)
    {
        return Produit::create($info);
    }
    public function update($id,$info)
    {
        return Produit::find($id)?->update($info);
    }
}
