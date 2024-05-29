<?php

namespace App\Http\Controllers;

use App\Interfaces\MessageInterface;
use Illuminate\Http\Request;

class MessageController extends BaseController
{
    private $messageRepository;
    public function __construct(MessageInterface $messageRepository)
    {
        $this->repository = $messageRepository;
        $this->messageRepository = $messageRepository;

        $this->validateCreate = [
            'emeteur_id' => 'required|exists:App\Models\User,id',
            'recepteur_id' => 'required|exists:App\Models\User,id',
            'contenu' => 'required',
            'date' => 'required|date'
        ];
        
        $this->messageCreate = [
            'emeteur_id.required' => 'Vous devez selectionner l\'emeteur',
            'emeteur_id.exists' => 'L\'emeteur que vous avez selectionné n\'existe pas ',
            'recepteur_id.required' => 'Vous devez selectionner le recepteur',
            'recepteur_id.exists' => 'Le recepteur que vous avez selectionné n\'existe pas ',
            'contenu.required' => 'Le contenu est obligatoire',
            'date.required' => 'La date est obligatoire',
            'date.date' => 'Vous devez selectionné une date valide'
        ];
    }

    public function messageEmis($id) {
        return $this->messageRepository->findMessagEmis($id);
    }

    public function messageRecus($id) {
        return $this->messageRepository->findMessagRecu($id);
    }
}
