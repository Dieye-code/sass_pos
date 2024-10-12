<?php

namespace App\Repositories;

use App\Interfaces\AbonnementInterface;
use App\Interfaces\AchatInterface;
use App\Models\Abonnement;
use App\Models\Achat;
use App\Models\AchatProduit;
use App\Models\Produit;
use App\Models\User;
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
        return Abonnement::with('type')->get();
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

    public function newActive($id)
    {
        $abonnement = Abonnement::find($id);
        if ($abonnement) {
            $abonnement->etat = 1;
            $abonnement->is_new = 0;
            $user = User::where('abonnement_id', $abonnement->id)->first();
            if ($user) {
                $user->etat = 1;
                $user->save();
            }
            $abonnement->save();
        }
        return $abonnement;
    }


    public function getAbonnementActifs()
    {
        return Abonnement::with('type')->where('etat', 1)->get();
    }
    public function getAbonnementInactifs()
    {
        return Abonnement::with('type')->where('etat', 0)->where('is_new', 0)->get();
    }
    public function getNewAbonnements()
    {
        return Abonnement::with('type')->with('user')->where('is_new', 1)->where('etat', 0)->get();
    }
}
