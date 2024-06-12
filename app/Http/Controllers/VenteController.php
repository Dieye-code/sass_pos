<?php

namespace App\Http\Controllers;

use App\Interfaces\VenteInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VenteController extends BaseController
{

    private VenteInterface $venteRepository;

    public function __construct(VenteInterface $repository)
    {
        $this->repository = $repository;
        $this->venteRepository = $repository;
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
            $this->model = $this->repository->create($data);
            $total = 0;

            foreach ($request->produits as $key => $value) {
                $this->venteRepository->saveVenteProduit(['produit_id' => $value['produit_id'], 'quantite' => $value['quantite'], 'montant_vente' => $value['montant_vente'], 'vente_id' => $this->model->id]);
                $total += intval($value['quantite']) * intval($value['montant_vente']);
            }
            $this->model->montant_total = $total;
            $this->repository->update($this->model->id, $this->model->toArray());

            DB::commit();
            return $this->repository->find($this->model->id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
