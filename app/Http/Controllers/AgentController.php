<?php

namespace App\Http\Controllers;

use app\Interfaces\AgentInterface;
use App\Interfaces\UserInterface;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AgentController extends BaseController
{
    public $agentRepository;
    public $userRepository;

    public function __construct(AgentInterface $agentRepository, UserInterface $userRepository)
    {
        $this->agentRepository = $agentRepository;
        $this->userRepository = $userRepository;
        parent::__construct($agentRepository);

        

        $this->validateCreate = [
            'prenom' => 'required',
            'nom' => 'required',
            'profil' => 'required',
            'email' => 'required',
            'telephone' => 'required',
            'password' => 'required',
            'adresse' => 'required',
            'type' => 'required'
        ];
        $this->messageCreate = [
            'prenom.required' => 'Le prenom est obligatoire',
            'email.required' => 'L\'email est obligatoire',
            'nom.required' => 'Le nom est obligatoire',
            'password.required' => 'Le mot de passe est obligatoire',
            'profil.required' => 'Le profil est obligatoire',
            'telephone.required' => 'Le numéro de tétéphone est obligatoire',
            'adresse.required' => 'L\'adresse est obligatoire',
            'type.required' => 'Le type de l\'agent est obligatoire',
        ];
        
        $this->validateUpdate = [
            'id' => 'required|exists:agents',
            'user_id' => 'required|exists:App\Models\User,id',
            'prenom' => 'required',
            'nom' => 'required',
            'profil' => 'required',
            'email' => [
                'required',
                Rule::unique('users')->ignore(request('user_id')),
                ],
            'telephone' => 'required',
            'adresse' => 'required',
            'type' => 'required',
        ];
        $this->messageUpdate = [
            'id.required' => 'Vous devez sélectionné un agent',
            'id.required' => 'l\'agent que vous avez selectionné n\'existe pas ',
            'user_id.required' => 'Vous devez sélectionné un agent',
            'user_id.required' => 'l\'agent que vous avez selectionné n\'existe pas ',
            'prenom.required' => 'Le prenom est obligatoire',
            'email.required' => 'L\'email est obligatoire',
            'email.unique' => 'L\'email que vous avez selectionné existe déjà',
            'nom.required' => 'Le nom est obligatoire',
            'profil.required' => 'Le profil est obligatoire',
            'telephone.required' => 'Le numéro de tétéphone est obligatoire',
            'adresse.required' => 'L\'adresse est obligatoire',
            'type.required' => 'Le type de l\'agent est obligatoire',
        ];
    }

    public function beforeCreating(){
        $data = $this->request->only(['prenom','nom','email','password','profil']);
        $user = $this->userRepository->create($data);

        $this->validate = $this->request->only(['telephone', 'adresse','type']);
        $this->validate['user_id'] = $user->id;
    }

    public function beforeUpdating(){
        $data = $this->request->only(['prenom','nom','email','profil']);
        $user = $this->userRepository->update($this->request->user_id,$data);
        $this->validate = $this->request->only(['telephone', 'adresse','type',]);
        $this->validate['user_id'] = $this->request->user_id;
    }

    public function afterDeleting(){
        $this->userRepository->delete($this->model->user_id);
    }
}
