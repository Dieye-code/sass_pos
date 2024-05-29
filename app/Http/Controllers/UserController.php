<?php

namespace App\Http\Controllers;

use App\Interfaces\UserInterface;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    public $userRepository;

    public function __construct(UserInterface $userRepository)
    {
        $this->userRepository = $userRepository;
        parent::__construct($userRepository);

        $this->validateCreate = [
            'abonnement_id' => 'required|exists:App\Models\Abonnement,id',
            'prenom' => 'required',
            'nom' => 'required',
            'role' => 'required',
            'telephone' => 'required',
            'code' => 'required',
        ];
        $this->messageCreate = [
            'abonnement_id.required' => 'Vous devez selectionner l\'abonnement',
            'abonnement_id.exists' => 'L\'abonnement que vous avez selectionné n\'existe pas ',
            'prenom.required' => 'Le prenom est obligatoire',
            'telephone.required' => 'Le numéro de téléphone est obligatoire',
            'nom.required' => 'Le nom est obligatoire',
            'role.required' => 'Le role est obligatoire',
            'code.required' => 'Le code est obligatoire',
        ];
        
        $this->validateUpdate = [
            'prenom' => 'required',
            'nom' => 'required',
            'profil' => 'required',
            'email' => 'required',
        ];
        $this->messageUpdate = [
            'prenom.required' => 'Le prenom est obligatoire',
            'email.required' => 'L\'email est obligatoire',
            'nom.required' => 'Le nom est obligatoire',
            'profil.required' => 'Le profil est obligatoire',
        ];
    }


}
