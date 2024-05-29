<?php

namespace App\Repositories;

use App\Interfaces\AnnonceInterface;
use App\Models\Annonce;
use Illuminate\Database\Eloquent\Model;

class AnnonceRepository extends BaseRepository implements AnnonceInterface
{

    protected $model = Model::class;
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        
    }



    

    public function getAllAnnonces()
    {
        return Annonce::with('agent')->get();
    }
    public function findAnnonce($id)
    {
        return Annonce::where('id', $id)->with('agent')->first();
    }
    public function findAnnonceByAgent($idAgent)
    {
        return Annonce::where('agent_id', $idAgent)->with('agent')->first();
    }
    public function deleteAnnonce($id)
    {
        return Annonce::find($id)?->delete();
    }
    public function create($info)
    {
        return Annonce::create($info);
    }
    public function update($id,$info)
    {
        return Annonce::find($id)?->update($info);
    }

}
