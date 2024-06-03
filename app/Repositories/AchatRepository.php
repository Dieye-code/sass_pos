<?php

namespace App\Repositories;

use App\Interfaces\AchatInterface;
use App\Models\Achat;

class AchatRepository extends BaseRepository implements AchatInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
    }

    
    public function getAll($idAbonnement)
    {
        return Achat::with('produits')->where('abonnement_id', $idAbonnement)->get();
    }
    public function find($id)
    {
        return Achat::where('id', $id)->with('produits')->first();
    }
    public function delete($id)
    {
        return Achat::find($id)?->delete();
    }
    public function create($info)
    {
        return Achat::create($info);
    }
    public function update($id,$info)
    {
        return Achat::find($id)?->update($info);
    }
}
