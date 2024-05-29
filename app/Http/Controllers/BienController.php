<?php

namespace App\Http\Controllers;

use App\Interfaces\BienInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\ValidationException;

class BienController extends BaseController
{
    public $bienRepository;
    public function __construct(BienInterface $bienRepository)
    {
        $this->repository = $bienRepository;
        $this->bienRepository = $bienRepository;

        $this->validateCreate = [
            'agent_id' => 'required|exists:App\Models\Agent,id',
            'categorie' => 'required',
            'description' => 'required',
            'localisation' => 'required',
            'prix' => '|numeric|min:0',
            'nombreEtage' => '|numeric|min:0|max:100',
            'type' => 'required',
            'adresse' => 'required',
            'photo' => [
                File::image()
                    ->max(12 * 1024 * 1024)
            ]
        ];
        $this->messageCreate = [
            'agent_id.required' => 'Vous devez selectionner l\'agent',
            'agent_id.exists' => 'L\'agent que vous avez szlzctionné n\'existe pas ',
            'categoirie.required' => 'La catégorie est obligatoire',
            'description.required' => 'La description est obligatoire',
            'localisation.required' => 'La localisation est obligatoire',
            'prix.numeric' => 'Le prix que vous avez saisie est invalide',
            'nombreEtage.required' => 'Le nombre d\étage est obligatoire',
            'adresse.required' => 'L\'adresse est obligatoire',
            'type.required' => 'Le type de l\'agent est obligatoire',
            'photo' => 'La photo est invalide',
        ];

        $this->validateUpdate = [
            'id' => 'required|exists:App\Models\Bien,id',
            'agent_id' => 'required|exists:App\Models\Agent,id',
            'categorie' => 'required',
            'description' => 'required',
            'localisation' => 'required',
            'prix' => '|numeric|min:0',
            'nombreEtage' => '|numeric|min:0|max:100',
            'type' => 'required',
            'adresse' => 'required'
        ];
        $this->messageUpdate = [
            'id.required' => 'Vous devez selectionner le bien',
            'id.required' => 'Vous devez selectionner le bien',
            'agent_id.required' => 'Vous devez selectionner l\'agent',
            'agent_id.exists' => 'L\'agent que vous avez szlzctionné n\'existe pas ',
            'categoirie.required' => 'La catégorie est obligatoire',
            'description.required' => 'La description est obligatoire',
            'localisation.required' => 'La localisation est obligatoire',
            'prix.numeric' => 'Le prix que vous avez saisie est invalide',
            'nombreEtage.numeric' => 'Le nombre d\étage que vous avez saisie est invalide',
            'adresse.required' => 'L\'adresse est obligatoire',
            'type.required' => 'Le type de l\'agent est obligatoire',
        ];
    }

    public function beforeCreating()
    {
        if (key_exists('photo', $this->validate)) {
            $photo = storefile($this->validate['photo']);
            $this->validate['photo'] = $photo;
        }
    }

    public function changePhoto(Request $request, $id)
    {
        $this->model = $this->repository->find($id);
        if ($this->model == null)
            return responseFind($this->model);
        if ($request->file('photo') != null) {
            if(Storage::exists('public/'.$this->model->photo))
                Storage::delete('public/'.$this->model->photo);
            $photo = storefile($request->file('photo'));
            $bien = $this->bienRepository->updatePhoto($id,$photo);
            return response()->json('', 201);
        }
        return response()->json('', 400);
    }
}
