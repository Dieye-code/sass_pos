<?php

namespace App\Repositories;

use App\Interfaces\BienInterface;
use App\Models\Bien;

class BienRepository implements BienInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    

    public function getAll()
    {
        return Bien::with('agent.user')->get();
    }
    public function find($id)
    {
        return Bien::where('id', $id)->with('agent.user')->first();
    }
    public function findBienByAgent($idAgent)
    {
        return Bien::where('agent_id', $idAgent)->with('agent.user')->first();
    }
    public function delete($id)
    {
        return Bien::find($id)?->delete();
    }
    public function create($info)
    {
        return Bien::create($info);
    }
    public function update($id,$info)
    {
        return Bien::find($id)?->update($info);
    }
    public function updatePhoto($id, $photo)
    {
        $bien = Bien::find($id);
        if($bien != null){
            $bien->photo = $photo;
            $bien->save();
        }
        return $bien;
    }

    
}
