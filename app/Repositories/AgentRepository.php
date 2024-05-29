<?php

namespace App\Repositories;

use App\Interfaces\AgentInterface;
use App\Models\Agent;

class AgentRepository extends BaseRepository implements AgentInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        parent::__construct(new Agent(), 'user');
    }

    public function getAll()
    {
        //return Agent::with('user')->paginate(1,['*'],'page','2');
        return Agent::with('user')->get();
    }
    public function find($id)
    {
        return Agent::where('id', $id)->with('user')->first();
    }
    public function findByUser($idUser)
    {
        return Agent::where('user_id', $idUser)->with('user')->first();
    }
    public function delete($id)
    {
        return Agent::find($id)?->delete();
    }
    public function create($info)
    {
        return Agent::create($info);
    }
    public function update($id,$info)
    {
        return Agent::find($id)?->update($info);
    }

}
