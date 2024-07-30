<?php

namespace App\Repositories;

use App\Interfaces\AbonnementInterface;
use App\Interfaces\AchatInterface;
use App\Models\Abonnement;
use App\Models\Achat;
use App\Models\AchatProduit;
use App\Models\Produit;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class AbonnementRepository  implements AbonnementInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
    }


    public function getAll()
    {
        return Abonnement::all();
    }

    public function arrete($id)
    {
        $abonnement = Abonnement::find($id);
        if ($abonnement) {
            $abonnement->etat = 0;
            $abonnement->save();
        }
        return $abonnement;
    }

    public function active($id)
    {
        $abonnement = Abonnement::find($id);
        if ($abonnement) {
            $abonnement->etat = 1;
            $abonnement->save();
        }
        return $abonnement;
    }


    public function getAbonnementActifs()
    {
        return Abonnement::where('etat', 1)->get();
    }
    public function getAbonnementInactifs()
    {
        return Abonnement::where('etat', 0)->get();
    }
}
