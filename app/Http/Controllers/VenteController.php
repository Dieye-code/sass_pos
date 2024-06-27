<?php

namespace App\Http\Controllers;

use App\Interfaces\PaiementVenteInterface;
use App\Interfaces\VenteInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VenteController extends BaseController
{

    private VenteInterface $venteRepository;
    private PaiementVenteInterface $paiementRepository;

    public function __construct(VenteInterface $repository, PaiementVenteInterface $paiementRepository)
    {
        $this->repository = $repository;
        $this->venteRepository = $repository;
        $this->paiementRepository = $paiementRepository;
    }



    public function last($idAbonnement = null)
    {
        return response()->json($this->venteRepository->getLatestVente());
    }


    public function create(Request $request)
    {
        try {

            DB::beginTransaction();
            $data = $request->only(['client_id', 'date', 'en attente']);
            $data['etat'] = $request->paiement == 1 ?  'en attente' : 'payé' ;
            $this->model = $this->repository->create($data);
            $total = 0;

            foreach ($request->produits as $key => $value) {
                $this->venteRepository->saveVenteProduit(['produit_id' => $value['produit_id'], 'quantite' => $value['quantite'], 'montant_vente' => $value['montant_vente'], 'vente_id' => $this->model->id]);
                $total += intval($value['quantite']) * intval($value['montant_vente']);
            }
            $this->model->montant_total = $total;
            $this->repository->update($this->model->id, $this->model->toArray());
            if ($request->paiement != 1) {
                $p = $this->paiementRepository->create(['montant' => $total, 'date' => Carbon::now(), 'mode_paiement' => paiement($request->paiement), 'vente_id' => $this->model->id]);
            }

            DB::commit();
            return $this->repository->find($this->model->id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
