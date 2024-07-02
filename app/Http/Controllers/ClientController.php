<?php

namespace App\Http\Controllers;

use App\Interfaces\ClientInterface;
use App\Interfaces\PaiementVenteInterface;
use App\Interfaces\VenteInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientController extends BaseController
{
    private VenteInterface $venteRepository;
    private PaiementVenteInterface $paiementVenteRepository; 
    public function __construct(ClientInterface $repository, VenteInterface $venteRepository, PaiementVenteInterface $paiementRepository)
    {
        $this->repository = $repository;
        $this->venteRepository = $venteRepository;
        $this->paiementVenteRepository = $paiementRepository;
    }

    public function details($id)
    {
        $client = $this->repository->find($id);
        $ventes = $this->venteRepository->getVenteByClient($id);
        return response()->json(['client' => $client, 'ventes' => $ventes]);
    }

    public function paiement(Request $request, $id)
    {
        // dd($request->all());
        DB::beginTransaction();
        $client = $this->repository->find($id);
        $ventes = $this->venteRepository->getVenteByClient($id);

        $montantPaye = $request->montant;

        foreach ($ventes as $vente) {
            if ($vente->etat != 'encaissé' && $montantPaye > 0) {
                $montantPayeAchat = $vente->paiements->sum('montant');
                $dette = $vente->montant_total - $montantPayeAchat;
                if ($dette > 0) {
                    $montant = 0;
                    if ($montantPaye >= $dette) {
                        $montantPaye -= $dette;
                        $montant = $dette;
                        $vente->etat = 'encaissé';
                        $this->venteRepository->update($vente->id, $vente->toArray());
                    } else {

                        $montant = $montantPaye;
                        $montantPaye = 0;
                        $vente->etat = 'en cours';
                        $this->venteRepository->update($vente->id, $vente->toArray());
                    }
                    $paiement = $this->paiementVenteRepository->create(['montant' => $montant, 'achat_id' => $vente->id, 'date' => Carbon::now(), 'mode_paiement' => paiement($request->mode_paiement)]);
                }
            }
        }
        DB::commit();
        return response()->json($client);
    }

}
