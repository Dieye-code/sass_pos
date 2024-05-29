<?php

namespace App\Http\Controllers;

use App\Interfaces\PieceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;

class PieceController extends BaseController
{

    private $pieceRepository;
    public function __construct(PieceInterface $pieceRepository)
    {
        $this->repository = $pieceRepository;
        $this->pieceRepository = $pieceRepository;

        $this->validateCreate = [
            'bien_id' => 'required|exists:App\Models\Bien,id',
            'type' => 'required',
            'niveau' => 'required|numeric|min:0|max:100',
            'prix' => 'required|numeric|min:0',
            'disponiblite' => 'required',
            'description' => 'required'
        ];
        $this->messageCreate = [
            'bien_id.required' => 'Vous devez selectionner le bien',
            'agent_id.exists' => 'Le bien que vous avez selectionné n\'existe pas ',
            'type.required' => 'Le type de la piéce est obligatoire',
            'niveau.required' => 'Le niveau de la piéce est obligatoire',
            'niveau.numeric' => 'Le niveau que vous avez saisie est invalide',
            'prix.required' => 'Le prix de la piéce est obligatoire',
            'prix.numeric' => 'Le prix que vous avez saisie est invalide',
            'disponiblite.required' => 'La disponiblité est obligatoire est obligatoire'
        ];

        $this->validateUpdate = [
            'id' => 'required|exists:App\Models\Piece,id',
            'bien_id' => 'required|exists:App\Models\Bien,id',
            'type' => 'required',
            'niveau' => 'required|numeric|min:0|max:100',
            'prix' => 'required|numeric|min:0',
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
            'disponiblite.required' => 'La disponiblité est obligatoire est obligatoire'
        ];
    }


    public function addPhoto(Request $request, $id)
    {
        $this->model = $this->repository->find($id);
        if ($this->model == null)
            return responseFind($this->model);
        if ($request->file('photo') != null) {
            $photo = storefile($request->file('photo'));
            $bien = $this->pieceRepository->addPhoto($id, $photo);
            return response()->json('', 201);
        }
        return response()->json('', 400);
    }

    public function deletePhoto($id)
    {
        return  $this->pieceRepository->deletePhoto($id);
    }

    public function getAllPhoto($id)
    {
        return $this->pieceRepository->getAllPhoto($id);
    }
}
