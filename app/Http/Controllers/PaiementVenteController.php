<?php

namespace App\Http\Controllers;

use App\Interfaces\PaiementVenteInterface;
use App\Interfaces\VenteInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PaiementVenteController extends BaseController
{

    private VenteInterface $venteRepository;
    private PaiementVenteInterface $paiementRepository;
    public function __construct(PaiementVenteInterface $repository, VenteInterface $venteRepository)
    {
        $this->repository = $repository;
        $this->venteRepository = $venteRepository;
        $this->paiementRepository = $repository;
    }



    public function getPaiementByVente($idVente)
    {
        $paiements = $this->paiementRepository->getByVente($idVente);
        return response()->json($paiements);
    }

    public function save(Request $request)
    {
        $vente = $this->venteRepository->find($request->vente_id);
        if ($vente == null)
            return responseFind($vente);
        $paiements = $this->paiementRepository->getByVente($vente->id);
        $total = $paiements->sum('montant');
        if ($total >= $vente->montant_total)
            return response()->json(['La vente a été encaissé'], 400);
        if ($total + $request->montant > $vente->montant_total)
            return response()->json(['Le montant que vous voulez payer dépasse le montant total'], 400);
        $paiement = $this->paiementRepository->create(['montant' => $request->montant, 'vente_id' => $vente->id, 'date' => Carbon::now(), 'mode_paiement' => paiement($request->mode_paiement)]);
        if ($total + $paiement->montant == $vente->montant_total)
            $vente->etat = 'encaissé';
        else
            $vente->etat = 'en cours';
        $vente->save();
        return response()->json($paiement);
    }
}
