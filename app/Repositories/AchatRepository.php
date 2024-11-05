<?php

namespace App\Repositories;

use App\Interfaces\AchatInterface;
use App\Models\Achat;
use App\Models\AchatProduit;
use App\Models\PaiementAchat;
use App\Models\Produit;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class AchatRepository extends BaseRepository implements AchatInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
    }


    public function getLastAchat()
    {
        return Achat::with('produits')->with('fournisseur')->where('abonnement_id', Auth::user()?->abonnement_id)->orderBy('created_at', 'desc')->limit(10)->get();
    }

    public function getAll()
    {
        return Achat::with('produits')->with('fournisseur')->where('abonnement_id', Auth::user()?->abonnement_id)->get();
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
    public function getAchatDuJour()
    {
        return Achat::whereDate('date', Carbon::today())->with('paiements')->with('fournisseur')->get();
    }
    public function getAchatDuMois()
    {
        return Achat::whereRaw('DATEDIFF(NOW(), date) <= 30')->with('paiements')->with('fournisseur')->get();
    }
    public function getAchatDeLaSemaine()
    {
        return Achat::whereRaw('DATEDIFF(NOW(), date) <= 7')->with('paiements')->with('fournisseur')->get();
    }
    public function getAchatByIntervallee($debut, $fin)
    {
        return Achat::with('paiements')->with('fournisseur')->whereBetween('date', [$debut, $fin])->get();
    }
    

    public function retour($id)
    {
        $v = Achat::find($id);
        if ($v != null) {
            foreach ($v->produits as $achat) {
                AchatProduit::find($achat->pivot?->id)?->delete();
                $achat->quantite = $achat->quantite + $achat->pivot->quantite;
                Produit::find($achat->id)?->update($achat->toArray());
            }
            foreach ($v->paiements as $paiement) {
                PaiementAchat::find($paiement->id)?->delete();
            }
            $v->delete();
        }
        return $v;
    }
}
