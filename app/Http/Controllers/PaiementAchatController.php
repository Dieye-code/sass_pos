<?php

namespace App\Http\Controllers;

use App\Interfaces\AchatInterface;
use App\Interfaces\PaiementAchatInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PaiementAchatController extends BaseController
{

    private PaiementAchatInterface $paiementRepository;
    private AchatInterface $achatRepository;
    public function __construct(PaiementAchatInterface $repository, AchatInterface $achatRepository)
    {
        $this->repository = $repository;
        $this->paiementRepository = $repository;
        $this->achatRepository = $achatRepository;
    }

    public function getPaiementByAchat($idAchat)
    {
        $paiements = $this->paiementRepository->getByAchat($idAchat);

        return response()->json($paiements);
    }

    public function save(Request $request)
    {
        $achat = $this->achatRepository->find($request->achat_id);
        if ($achat == null)
            return responseFind($achat);
        $paiements = $this->paiementRepository->getByAchat($achat->id);
        $total = $paiements->sum('montant');
        if ($total >= $achat->montant_total)
            return response()->json(['L\'achat a été payé'], 400);
        if ($total + $request->montant > $achat->montant_total)
            return response()->json(['Le montant que vous voulez payer dépasse le montant total'], 400);
        $paiement = $this->paiementRepository->create(['montant' => $request->montant, 'achat_id' => $achat->id, 'date' => Carbon::now(), 'mode_paiement' => paiement($request->mode_paiement)]);
        if($total + $paiement->montant){
            $achat->etat = 'payé';
            $achat->save();
        }


        return response()->json($paiement);
        dd($total);
        dd($request->all());
    }
}
