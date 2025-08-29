<?php

namespace App\Http\Controllers;

use App\Interfaces\DepenseInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DepenseController extends BaseController
{
    public function __construct(DepenseInterface $repository)
    {
        $this->repository = $repository;
    }

    protected function beforeCreating()
    {
        if (key_exists('pieces_justificatifs', $this->request->file())) {
            $facture = storefile($this->request->file('pieces_justificatifs'));
            $this->validate['pieces_justificatifs'] = $facture;
        }
    }

    public function edit(Request $request, $id)
    {

        $validator = Validator::make($request->all(), $this->validateUpdate, $this->messageUpdate);
        if ($validator->fails()) {

            return response()->json(['errors' => $validator->messages()], 400);
        }
        $this->validate = $validator->getData();
        $this->request = $request;
        try {
            DB::transaction(function () use (&$id) {
                $this->model = $this->repository->find($id);
                if ($this->model == null)
                    return responseFind($this->model);


                if (key_exists('pieces_justificatifs', $this->request->file())) {
                    $facture = storefile($this->request->file('pieces_justificatifs'));
                    
                    $this->validate['pieces_justificatifs'] = $facture;
                }
                $this->repository->update($id, $this->validate);
            });

            return $this->repository->find($id);
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
    }

    public function beforeUpdating()
    {
        dd($this->request->file());
        if (key_exists('pieces_justificatifs', $this->request->file())) {
            $facture = storefile($this->request->file('pieces_justificatifs'));
            dd($facture);
            $this->validate['pieces_justificatifs'] = $facture;
        }
    }
}
