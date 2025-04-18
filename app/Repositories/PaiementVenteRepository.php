<?php

namespace App\Repositories;

use App\Interfaces\PaiementVenteInterface;
use App\Models\Paiementvente;
use Illuminate\Support\Facades\Auth;

class PaiementVenteRepository extends BaseRepository implements PaiementVenteInterface
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
        return Paiementvente::with('abonnement')->where('abonnement_id', Auth::user()?->abonnement_id)->get();
    }
    
    public function getByVente($idVente)
    {
        return Paiementvente::where('vente_id', $idVente)->get();
    }
    public function find($id)
    {
        return Paiementvente::where('id', $id)->with('abonnement')->first();
    }
    public function delete($id)
    {
        return Paiementvente::find($id)?->delete();
    }
    public function create($info)
    {
        return Paiementvente::create($info);
    }
    public function update($id,$info)
    {
        return Paiementvente::find($id)?->update($info);
    }
}
