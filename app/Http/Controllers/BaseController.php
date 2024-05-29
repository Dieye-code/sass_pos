<?php

namespace App\Http\Controllers;

use App\Interfaces\BaseInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class BaseController extends Controller
{
    protected $repository;

    protected $validateCreate = [];
    protected $messageCreate  = [];
    protected $validateUpdate  = [];
    protected $messageUpdate  = [];

    protected $request;
    protected $validate;
    protected $model;

    public function __construct(BaseInterface $repository)
    {
        $this->repository = $repository;
    }

    public function index($idAbonnement)
    {
        return response()->json($this->repository->getAll($idAbonnement), 200);
    }

    public function get($id)
    {
        return responseFind($this->repository->find($id));
    }

    public function delete($id)
    {
        try {
            $this->model = $this->repository->find($id);
            if ($this->model == null)
                return responseFind($this->model);
            DB::transaction(function () {
                $this->repository->delete($this->model->id);
                $this->afterDeleting();;
            });
            return response()->json($this->model);
            //return responseFind($this->repository->delete($id));
        } catch (\Throwable $th) {
            return response()->json(["errors" => "Erreur lors de la suppression"], 400);
        }
    }


    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), $this->validateCreate, $this->messageCreate);
        if ($validator->fails()) {

            return response()->json(['errors' => $validator->messages()], 400);
        }
        $this->validate = $validator->getData();
        $this->request = $request;
        try {
            DB::transaction(function () use (&$validate) {
                $this->beforeCreating();
                $this->model = $this->repository->create($this->validate);
                $this->afterCreating();
            });
            return $this->repository->find($this->model->id);
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
    }

    public function update(Request $request, $id)
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
                $this->beforeUpdating();
                $this->repository->update($id, $this->validate);
            });

            return $this->repository->find($id);
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
    }


    protected function beforeCreating()
    {
    }

    protected function beforeUpdating()
    {
    }


    protected function afterCreating()
    {
    }

    protected function afterUpdating()
    {
    }

    protected function afterDeleting()
    {
    }
}
