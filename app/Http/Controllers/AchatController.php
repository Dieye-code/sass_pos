<?php

namespace App\Http\Controllers;

use App\Interfaces\AchatInterface;
use App\Repositories\AchatRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AchatController extends BaseController
{

    private AchatRepository $achatRepository;
    public function __construct(AchatInterface $repository)
    {
        $this->repository = $repository;
        $this->achatRepository = $repository;
    }

    public function last($idAbonnement = null){
        return response()->json($this->achatRepository->getLastAchat());
    }

    public function create(Request $request)
    {
        try {

            
            DB::beginTransaction();
            $data = $request->only(['fournisseur_id','date','en attente']);
            $this->model = $this->repository->create($data);
            $total = 0;

            foreach ($request->produits as $key => $value) {
                $this->achatRepository->saveAchatProduit(['produit_id' => $value['produit_id'], 'quantite' => $value['quantite'] , 'montant_achat' => $value['montant_achat'], 'achat_id' => $this->model->id]);
                $total += intval($value['quantite']) * intval($value['montant_achat']);
            }
            $this->model->montant_total = $total;
             $this->repository->update($this->model->id, $this->model->toArray());
            
            DB::commit();
            return $this->repository->find($this->model->id);
        } catch (\Throwable $th) {
            throw $th;
        }
        // $validator = Validator::make($request->all(), $this->validateCreate, $this->messageCreate);
        // if ($validator->fails()) {

        //     return response()->json(['errors' => $validator->messages()], 400);
        // }
        // $this->validate = $validator->getData();
        // $this->request = $request;
        // try {
        //     DB::beginTransaction();
        //     // DB::transaction(function () use (&$validate) {
        //     $this->beforeCreating();
        //     $this->model = $this->repository->create($this->validate);
        //     $this->afterCreating();
        //     // });
        //     DB::commit();
        //     return $this->repository->find($this->model->id);
        // } catch (\Throwable $th) {
        //     DB::rollBack();
        //     dd($th->getMessage());
        // }
    }
}
