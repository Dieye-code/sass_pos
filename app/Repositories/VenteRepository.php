<?php

namespace App\Repositories;

use App\Interfaces\VenteInterface;
use App\Models\Produit;
use App\Models\Vente;
use App\Models\VenteProduit;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class VenteRepository  extends BaseRepository implements VenteInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getLatestVente()
    {
        return Vente::with('produits')->with('client')->where('abonnement_id', Auth::user()?->abonnement_id)->orderBy('created_at', 'desc')->limit(10)->get();
    }

    public function getAll()
    {
        return Vente::with('produits')->with('client')->where('abonnement_id', Auth::user()?->abonnement_id)->get();
    }
    public function find($id)
    {
        return Vente::where('id', $id)->with('client')->with('produits')->with('paiements')->first();
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

    public function getVenteWithPaiements(){
        return Vente::with('paiements')->where('abonnement_id', Auth::user()?->abonnement_id)->with('client')->get();
    }

    public function getVenteDuMois(){
        return Vente::whereRaw('DATEDIFF(NOW(), date) <= 30')->with('paiements')->with('client')->get();
    }

    public function getVenteDuJour(){
        return Vente::whereDate('date', Carbon::today())->with('paiements')->with('client')->get();
    }

    public function getVenteDeLaSemaine(){
        return Vente::whereRaw('DATEDIFF(NOW(), date) <= 7')->with('paiements')->with('client')->get();
    }

    public function getVenteByIntervallee($debut, $fin){
        return Vente::with('paiements')->with('client')->whereBetween('date', [$debut, $fin])->get();
    }
}
