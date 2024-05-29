<?php

namespace App\Http\Controllers;

use App\Interfaces\LocationInterface;
use Illuminate\Http\Request;

class LocationController extends BaseController
{
    

    private $locattionRepository;
    public function __construct(LocationInterface $locattionRepository)
    {
        $this->repository = $locattionRepository;
        $this->locattionRepository = $locattionRepository;

        $this->validateCreate = [
            'piece_id' => 'required|exists:App\Models\Piece,id',
            'prenom' => 'required',
            'nom' => 'required',
            'debut' => 'required|date',
            'fin' => 'date',
            'limite' => 'numeric|min:1|max:31',
            'nomBreMoisImpaye' => 'numeric|min:1',
            'etat' => 'boolean'
        ];
        $this->messageCreate = [
            'bien_id.required' => 'Vous devez selectionner le bien',
            'agent_id.exists' => 'Le bien que vous avez selectionné n\'existe pas ',
            'type.required' => 'Le type de la piéce est obligatoire',
            'niveau.required' => 'Le niveau de la piéce est obligatoire',
            'niveau.numeric' => 'Le niveau que vous avez saisie est invalide',
            'prix.required' => 'Le prix de la piéce est obligatoire',
            'prix.numeric' => 'Le prix que vous avez saisie est invalide',
            'limite.numeric' => 'La date limite pour le paiementque vous avez saisie est invalide',
            'disponiblite.required' => 'La disponiblité est obligatoire est obligatoire'
        ];

        $this->validateUpdate = [
            'id' => 'required|exists:App\Models\Piece,id',
            'bien_id' => 'required|exists:App\Models\Bien,id',
            'type' => 'required',
            'niveau' => 'required|numeric|min:0|max:100',
            'prix' => 'required|numeric|min:0',
            'limite' => 'numeric|min:1|max:31',
            'nomBreMoisImpaye' => 'numeric|min:1',
            'disponiblite' => 'required',
            'description' => 'required'
        ];
        $this->messageUpdate = [
            'id.required' => 'Vous devez selectionner le piéce',
            'id.required' => 'Vous devez selectionner la piéce',
            'bien_id.required' => 'Vous devez selectionner le bien',
            'agent_id.exists' => 'Le bien que vous avez selectionné n\'existe pas ',
            'type.required' => 'Le type de la piéce est obligatoire',
            'niveau.required' => 'Le niveau de la piéce est obligatoire',
            'niveau.numeric' => 'Le niveau que vous avez saisie est invalide',
            'prix.required' => 'Le prix de la piéce est obligatoire',
            'prix.numeric' => 'Le prix que vous avez saisie est invalide',
            'limite.numeric' => 'La date limite pour le paiement que vous avez saisie est invalide',
            'nomBreMoisImpaye.numeric' => 'Le nombre de mois impayé que vous avez saisie est invalide',
            'disponiblite.required' => 'La disponiblité est obligatoire est obligatoire'
        ];
    }
}
