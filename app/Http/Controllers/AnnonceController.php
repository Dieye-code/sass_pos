<?php

namespace App\Http\Controllers;

use App\Interfaces\AnnonceInterface;
use Illuminate\Http\Request;

class AnnonceController extends BaseController
{
    public function __construct(AnnonceInterface $annonceInterface)
    {
        $this->repository = $annonceInterface;

        $this->validateCreate = [
            'bien_id' => 'required|exists:App\Models\Bien,id',
            'agent_id' => 'required|exists:App\Models\Agent,id',
            'titre' => 'required',
            'contenu' => 'required',
            'date' => 'required|date'
        ];
        
        $this->messageCreate = [
            'bien_id.required' => 'Vous devez selectionner le bien',
            'bien_id.exists' => 'Le bien que vous avez selectionné n\'existe pas ',
            'agent_id.required' => 'Vous devez selectionner un agent',
            'agent_id.exists' => 'L\'agent que vous avez selectionné n\'existe pas ',
            'titre.required' => 'Le titre est obligatoire',
            'contenu.required' => 'Le contenu est obligatoire',
            'date.required' => 'La date est obligatoire',
            'date.date' => 'Vous devez selectionné une date valide'
        ];
    }
}
