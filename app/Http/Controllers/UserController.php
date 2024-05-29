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
            'prenom' => 'required',
            'nom' => 'required',
            'profil' => 'required',
            'email' => 'required',
            'password' => 'required',
        ];
        $this->messageCreate = [
            'prenom.required' => 'Le prenom est obligatoire',
            'email.required' => 'L\'email est obligatoire',
            'nom.required' => 'Le nom est obligatoire',
            'profil.required' => 'Le profil est obligatoire',
            'password.required' => 'Le mot de passe est obligatoire',
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
