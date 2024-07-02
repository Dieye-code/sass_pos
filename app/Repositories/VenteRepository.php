<?php

namespace App\Repositories;

use App\Interfaces\VenteInterface;
use App\Models\Produit;
use App\Models\Vente;
use App\Models\VenteProduit;

class VenteRepository  extends BaseRepository implements VenteInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getLatestVente($idAbonnement = null)
    {
        return Vente::with('produits')->with('client')->where('abonnement_id', $idAbonnement)->orderBy('created_at', 'desc')->limit(10)->get();
    }

    public function getAll($idAbonnement)
    {
        return Vente::with('produits')->with('client')->where('abonnement_id', $idAbonnement)->get();
    }
    public function find($id)
    {
        return Vente::where('id', $id)->with('produits')->first();
    }
    public function delete($id)
    {
        return Vente::find($id)?->delete();
    }
    public function create($info)
    {
        return Vente::create($info);
    }
    public function update($id, $info)
    {
        return Vente::find($id)?->update($info);
    }
    public function saveVenteProduit($info)
    {
        $p = Produit::where('id', $info['produit_id'])->first();
        if ($p != null) {
            $p->quantite -= $info['quantite'];
            $p->save();
        }
        return VenteProduit::create($info);
    }

    public function getVenteByClient($idClient)
    {
        return Vente::with('produits')->with('paiements')->where('client_id', $idClient)->get();
    }
}
