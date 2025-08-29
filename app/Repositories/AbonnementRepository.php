<?php

namespace App\Repositories;

use App\Interfaces\AbonnementInterface;
use App\Interfaces\AchatInterface;
use App\Models\Abonnement;
use App\Models\Achat;
use App\Models\AchatProduit;
use App\Models\Client;
use App\Models\Depense;
use App\Models\Fournisseur;
use App\Models\PaiementAchat;
use App\Models\Paiementvente;
use App\Models\Produit;
use App\Models\User;
use App\Models\Vente;
use App\Models\VenteProduit;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AbonnementRepository  implements AbonnementInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct() {}


    public function getAll()
    {
        return Abonnement::all();
    }

    public function get($id)
    {
        return Abonnement::where('id', $id)->first();
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

    public function supprimer($id)
    {
        DB::beginTransaction();
        $abonnement = Abonnement::find($id);
        if ($abonnement) {
            $ventes = Achat::where('abonnement_id', $id)->get();
            foreach ($ventes as $paiement) {
                $paiement->delete();
            }

            $ventes = Vente::where('abonnement_id', $id)->get();
            foreach ($ventes as $paiement) {
                $paiement->delete();
            }
            
            $ventes = Fournisseur::where('abonnement_id', $id)->get();
            foreach ($ventes as $paiement) {
                $paiement->delete();
            }
            
            $ventes = Client::where('abonnement_id', $id)->get();
            foreach ($ventes as $paiement) {
                $paiement->delete();
            }
            
            $ventes = Depense::where('abonnement_id', $id)->get();
            foreach ($ventes as $paiement) {
                $paiement->delete();
            }

            $ventes = Produit::where('abonnement_id', $id)->get();
            foreach ($ventes as $paiement) {
                $paiement->delete();
            }

            $ventes = User::where('abonnement_id', $id)->get();
            foreach ($ventes as $paiement) {
                $paiement->delete();
            }
            $abonnement->delete();
        }
        DB::commit();
        return $abonnement;
    }


    public function getAbonnementActifs()
    {
        return Abonnement::where('etat', 1)->get();
    }
    public function getAbonnementInactifs()
    {
        return Abonnement::where('etat', 0)->where('is_new', 0)->get();
    }
    public function getNewAbonnements()
    {
        return Abonnement::with('user')->where('is_new', 1)->where('etat', 0)->get();
    }

    public function changePassword($id, $password)
    {

        $abonnement = Abonnement::find($id);
        if ($abonnement && $abonnement->user) {
            $user = $abonnement->user;
            $user->password = $password;
            $user?->save();
        }
        return $abonnement;
    }

    public function change($id, $debut, $fin)
    {
        $abonnement = Abonnement::find($id);
        if ($abonnement) {
            $d = Carbon::parse($debut);
            $f = Carbon::parse($fin);
            $abonnement->dateLimit = $f;
            $abonnement->date = $d;
            $abonnement->save();
            $this->activeWithUsers($id);
        }
        return $abonnement;
    }

    public function checkExpirationToday()
    {
        $today = Carbon::now()->format('Y-m-d');
        return Abonnement::whereDate('dateLimit', $today)
                        ->where('etat', 1)
                        ->get();
    }

    public function activeWithUsers($id)
    {
        DB::beginTransaction();
        try {
            $abonnement = Abonnement::find($id);
            if ($abonnement) {
                // Activer l'abonnement
                $abonnement->etat = 1;
                $abonnement->is_new = 0;
                $abonnement->save();

                // Activer tous les utilisateurs associés
                User::where('abonnement_id', $abonnement->id)
                    ->update(['etat' => 1]);

                DB::commit();
                return $abonnement;
            }
            DB::commit();
            return null;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}
