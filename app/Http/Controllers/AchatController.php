<?php

namespace App\Http\Controllers;

use App\Interfaces\AchatInterface;
use App\Interfaces\PaiementAchatInterface;
use App\Repositories\AchatRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AchatController extends BaseController
{

    private AchatRepository $achatRepository;
    private PaiementAchatInterface $paiementRepository;
    public function __construct(AchatInterface $repository, PaiementAchatInterface $paiement)
    {
        $this->repository = $repository;
        $this->achatRepository = $repository;
        $this->paiementRepository = $paiement;
    }

    public function last($idAbonnement = null)
    {
        return response()->json($this->achatRepository->getLastAchat());
    }

    public function create(Request $request)
    {
        try {
            DB::beginTransaction();
            $data = $request->only(['fournisseur_id', 'date']);
            $data['etat'] = $request->paiement == 1 ?  'en attente' : 'payé';
            $this->model = $this->repository->create($data);
            $total = 0;

            foreach ($request->produits as $key => $value) {
                $this->achatRepository->saveAchatProduit(['produit_id' => $value['produit_id'], 'quantite' => $value['quantite'], 'montant_achat' => $value['montant_achat'], 'achat_id' => $this->model->id]);
                $total += intval($value['quantite']) * intval($value['montant_achat']);
            }
            $this->model->montant_total = $total;
            $this->repository->update($this->model->id, $this->model->toArray());
            if ($request->paiement != 1) {
                $p = $this->paiementRepository->create(['montant' => $request->montant_paye, 'date' => Carbon::now(), 'mode_paiement' => paiement($request->paiement), 'achat_id' => $this->model->id]);
            }
            if ($total > $request->montant_paye) {
                $this->model->etat = 'en cours';
                $this->repository->update($this->model->id, $this->model->toArray());
            }
            DB::commit();
            return $this->repository->find($this->model->id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
