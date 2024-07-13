<?php

namespace App\Repositories;

use App\Interfaces\BaseInterface;
use App\Models\BaseModel;
use Illuminate\Support\Facades\Auth;

class BaseRepository implements BaseInterface
{

    /**
     * model
     *
     * @var BaseModel
     */
    public $model;

    protected $with;

    public function __construct(BaseModel $model, $with = null)
    {
        $this->model = $model;
        $this->with = $with;
    }

    public function getAll()
    {
        if ($this->with != null) {
            return $this->model::with($this->with)->where('abonnement_id', Auth::user()?->abonnement_id)->get();
        }
        return $this->model::all();
    }
    public function find($id)
    {
        if ($this->with != null) {
            return $this->model::with($this->with)->where('id', $id)->first();
        }
        return $this->model::where('id', $id)->first();
    }
    public function delete($id)
    {
        return $this->model->find($id)?->delete();
    }
    public function create($info)
    {
        return $this->model->create($info);
    }
    public function update($id, $info)
    {
        return $this->model->find($id)?->update($info);
    }
}
