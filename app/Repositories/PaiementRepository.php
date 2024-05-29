<?php

namespace App\Repositories;

use App\Interfaces\PaiementInterface;
use App\Models\Paiement;

class PaiementRepository implements PaiementInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getAllPaiements()
    {
        return Paiement::with('user')->with('location.Bien.agent')->get();
    }
    public function findPaiement($id)
    {
        return Paiement::where('id', $id)->with('user')->with('location.Bien.agent')->get();
    }
    public function findPaiementByLocation($idLocation)
    {
        return Paiement::where('location_id', $idLocation)->with('user')->with('location.Bien.agent')->get();
    }
    public function findPaiementByEtat( $etat)
    {
        return Paiement::where('etat', $etat)->with('user')->with('location.Bien.agent')->get();
    }
    public function deletePaiement($id)
    {
        return Paiement::find($id)?->delete();
    }
    public function create($info)
    {
        return Paiement::create($info);
    }
    public function update($id,$info)
    {
        return Paiement::find($id)?->update($info);
    }

}
