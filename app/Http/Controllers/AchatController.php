<?php

namespace App\Http\Controllers;

use App\Interfaces\AchatInterface;
use App\Interfaces\PaiementAchatInterface;
use App\Interfaces\ProduitInterface;
use App\Repositories\AchatRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AchatController extends BaseController
{

    private AchatRepository $achatRepository;
    private PaiementAchatInterface $paiementRepository;
    private $produitRepository;
    public function __construct(AchatInterface $repository, PaiementAchatInterface $paiement, ProduitInterface $produitRepository)
    {
        $this->repository = $repository;
        $this->achatRepository = $repository;
        $this->paiementRepository = $paiement;
        $this->produitRepository = $produitRepository;
    }

    public function last()
    {
        return response()->json($this->achatRepository->getLastAchat());
    }

    public function create(Request $request)
    {
        try {
            DB::beginTransaction();
            $data = $request->only(['fournisseur_id', 'date']);
            if (key_exists('facture', $request->file())) {
                $facture = storefile($request->file('facture'));
                $data['facture'] = $facture;
            }
            $data['etat'] = $request->paiement == 1 ?  'en attente' : 'payé';
            $data['abonnement_id'] = auth()->user()->abonnement_id;
            $this->model = $this->repository->create($data);
            $total = 0;
            foreach (json_decode($request->produits) as  $value) {
                if (intval($value->quantite) < 0)
                    return response()->json(['error' => 'Vous devez sélectionner une quantité valide'], 400);
                $this->achatRepository->saveAchatProduit(['produit_id' => $value->produit_id, 'quantite' => $value->quantite, 'montant_achat' => $value->montant_achat, 'achat_id' => $this->model->id]);
                $total += intval($value->quantite) * intval($value->montant_achat);
            }
            $this->model->montant_total = $total;
            $this->repository->update($this->model->id, $this->model->toArray());
            if ($request->paiement != 1) {
                $p = $this->paiementRepository->create(['montant' => $request->montant_paye, 'date' => Carbon::now(), 'mode_paiement' => paiement($request->paiement), 'achat_id' => $this->model->id, 'abonnement_id' => auth()->user()->abonnement_id]);
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

    public function dettes()
    {
        $totalDettes = [];
        $v = $this->achatRepository->getAchatWithPaiements();
        foreach ($v as  $value) {
            $totalPaiement = $value->paiements->sum('montant');
            if ($value->montant_total > $totalPaiement) {
                $totalDettes[] = ['achat' => $value, 'dette' => $value->montant_total - $totalPaiement];
            }
        }
        return response()->json( $totalDettes);
    }
    

    public function achatDuJour(){
        return response()->json($this->achatRepository->getAchatDuJour());
    }

    public function achatDuMois(){
        return response()->json($this->achatRepository->getAchatDuMois());
    }

    public function achatDeLaSemaine(){
        return response()->json($this->achatRepository->getAchatDeLaSemaine());
    }

    public function achatIntervalle(Request $request){
        return response()->json($this->achatRepository->getAchatByIntervallee($request->debut ?? null, $request->fin ?? null));
    }

    
}
