<?php

namespace App\Http\Controllers;

use App\Interfaces\AbonnementInterface;
use App\Interfaces\AchatInterface;
use App\Interfaces\DepenseInterface;
use App\Interfaces\VenteInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController
{

    private  $achatRepository;
    private $venteRepository;
    private $abonnementRepository;
    private $depenseRepository;
    public function __construct(AchatInterface $achatRepository, VenteInterface $venteRepository, AbonnementInterface $abonnementRepository, DepenseInterface $depenseRepository)
    {
        $this->venteRepository = $venteRepository;
        $this->achatRepository = $achatRepository;
        $this->abonnementRepository = $abonnementRepository;
        $this->depenseRepository = $depenseRepository;
    }
    public function index(Request $request)
    {
        $ventes = Auth::user()?->role == 'admin' ? $this->venteRepository->getLatestVente() : $this->venteRepository->getVenteDuJour()->splice(0,10);
        $achats = Auth::user()?->role == 'admin' ? $this->achatRepository->getLastAchat() : $this->achatRepository->getAchatDuJour()->splice(0,10);
        $totalVente =Auth::user()?->role == 'admin' ? $this->venteRepository->getVenteDuMois(null)->sum('montant_total') : $this->venteRepository->getVenteDuJour()->sum('montant_total');
        $totalAchat = Auth::user()?->role == 'admin' ? $this->achatRepository->getAchatDuMois(null)->sum('montant_total') : $this->achatRepository->getAchatDuJour()->sum('montant_total');
        $depenses =  $this->depenseRepository->getAll()->sum('montant');
        
        $totalDettes = [];
        $totalCreances = [];
        $v = $this->achatRepository->getAchatWithPaiements();
        foreach ($v as  $value) {
            $totalPaiement = $value->paiements->sum('montant');
            if ($value->montant_total > $totalPaiement) {
                $totalDettes[] = ['achat' => $value, 'dette' => $value->montant_total - $totalPaiement];
            }
        }
        $v = $this->venteRepository->getVenteWithPaiements();
        foreach ($v as  $value) {
            $totalPaiement = $value->paiements->sum('montant');
            if ($value->montant_total > $totalPaiement) {
                $totalCreances[] = ['vente' => $value, 'dette' => $value->montant_total - $totalPaiement];
            }
        }
        return response()->json(['achats' => $achats, 'ventes' => $ventes, 'achatTotal' => $totalAchat, 'venteTotal' => $totalVente, 'totalDettes' => $totalDettes, 'totalCreances' => $totalCreances, 'depenses' => $depenses]);
    }

    public function admin()
    {

        if(Auth::user()->role != "super admin")
            return abort(403, 'Vous n\'avez pas accées à cette ressource');

        $abonnementActifs = $this->abonnementRepository->getAbonnementActifs();
        $abonnementInactifs = $this->abonnementRepository->getAbonnementInactifs();
        $newAbonnements = $this->abonnementRepository->getNewAbonnements();
        return response()->json(['abonnementActifs' => $abonnementActifs, 'abonnementInactifs' => $abonnementInactifs, 'newAbonnements' => $newAbonnements]);
    }


}
