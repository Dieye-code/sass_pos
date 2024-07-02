<?php

namespace App\Http\Controllers;

use App\Interfaces\AchatInterface;
use App\Interfaces\FournisseurInterface;
use App\Interfaces\PaiementAchatInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FournisseurController extends BaseController
{

    private AchatInterface $achatRepository;
    private PaiementAchatInterface $paiementRepository;
    public function __construct(FournisseurInterface $repository, AchatInterface $achatRepository, PaiementAchatInterface $paiementRepository)
    {
        $this->repository = $repository;
        $this->achatRepository = $achatRepository;
        $this->paiementRepository = $paiementRepository;
    }

    public function details($id)
    {
        $fournisseur = $this->repository->find($id);
        $achats = $this->achatRepository->getAchatByFournisseur($id);
        return response()->json(['fournisseur' => $fournisseur, 'achats' => $achats]);
    }

    public function paiement(Request $request, $id)
    {
        // dd($request->all());
        DB::beginTransaction();
        $fournisseur = $this->repository->find($id);
        $achats = $this->achatRepository->getAchatByFournisseur($id);

        $montantPaye = $request->montant;

        foreach ($achats as $achat) {
            if ($achat->etat != 'payé' && $montantPaye > 0) {
                $montantPayeAchat = $achat->paiements->sum('montant');
                $dette = $achat->montant_total - $montantPayeAchat;
                if ($dette > 0) {
                    $montant = 0;
                    if ($montantPaye >= $dette) {
                        $montantPaye -= $dette;
                        $montant = $dette;
                        $achat->etat = 'payé';
                        $this->achatRepository->update($achat->id, $achat->toArray());
                    } else {

                        $montant = $montantPaye;
                        $montantPaye = 0;
                        $achat->etat = 'en cours';
                        $this->achatRepository->update($achat->id, $achat->toArray());
                    }
                    $paiement = $this->paiementRepository->create(['montant' => $montant, 'achat_id' => $achat->id, 'date' => Carbon::now(), 'mode_paiement' => paiement($request->mode_paiement)]);
                }
            }
        }
        DB::commit();
        return response()->json($fournisseur);
    }
}
