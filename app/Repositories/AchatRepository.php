<?php

namespace App\Repositories;

use App\Interfaces\AchatInterface;
use App\Models\Achat;
use App\Models\AchatProduit;
use App\Models\Produit;

class AchatRepository extends BaseRepository implements AchatInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
    }


    public function getLastAchat($idAbonnement = null)
    {
        return Achat::with('produits')->with('fournisseur')->where('abonnement_id', $idAbonnement)->orderBy('created_at', 'desc')->limit(10)->get();
    }

    public function getAll($idAbonnement)
    {
        return Achat::with('produits')->with('fournisseur')->where('abonnement_id', $idAbonnement)->get();
    }
    public function find($id)
    {
        return Achat::where('id', $id)->with('fournisseur')->with('produits')->first();
    }
    public function delete($id)
    {
        return Achat::find($id)?->delete();
    }
    public function create($info)
    {
        return Achat::create($info);
    }
    public function update($id, $info)
    {
        return Achat::find($id)?->update($info);
    }
    public function saveAchatProduit($info)
    {
        $p = Produit::where('id', $info['produit_id'])->first();
        if ($p != null) {
            $p->quantite = $p->quantite + $info['quantite'];
            $p?->save();
        }
        return AchatProduit::create($info);
    }

    public function getAchatByFournisseur($idFournisseur)
    {
        return Achat::with('produits')->with('paiements')->where('fournisseur_id', $idFournisseur)->get();
    }

    public function getAchatWithPaiements(){
        return Achat::with('paiements')->with('fournisseur')->get();
    }
}
