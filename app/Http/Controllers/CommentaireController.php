<?php

namespace App\Http\Controllers;

use App\Interfaces\CommentaireInterface;
use Illuminate\Http\Request;

class CommentaireController extends BaseController
{
    
    protected $commentaireRepository;
    public function __construct(CommentaireInterface $commentaireRepository)
    {
        $this->repository = $commentaireRepository;
        $this->commentaireRepository = $commentaireRepository;

        $this->validateCreate = [
            'user_id' => 'required|exists:App\Models\User,id',
            'bien_id' => 'required|exists:App\Models\Bien,id',
            'contenu' => 'required',
            'note' => 'numeric|min:1|max:5'
        ];
        $this->messageCreate = [
            'bien_id.required' => 'Vous devez selectionner le bien',
            'agent_id.exists' => 'Le bien que vous avez selectionné n\'existe pas ',
            'user_id.exists' => 'L\'utilisateur qui s\'est connecté n\'existe pas dans',
            'contenu.required' => 'Le contenu du commentaire est obligatoire',
            'note.required' => 'La note est obligatoire',
            'note.numeric' => 'La note que vous avez saisie est invalide'
        ];
    }

    public function findCommentaireBien($id){
        return $this->commentaireRepository->getCommentaireByIdBien($id);
    }


}
