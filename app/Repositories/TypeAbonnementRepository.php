<?php


namespace App\Repositories;

use App\Interfaces\TypeAbonnementInterface;
use App\Models\TypeAbonnement;
use Illuminate\Support\Facades\Auth;

class TypeAbonnementRepository extends BaseRepository implements TypeAbonnementInterface
{


    
    public function getAll()
    {
        return TypeAbonnement::all();
    }
    public function find($id)
    {
        return TypeAbonnement::where('id', $id)->first();
    }
    public function delete($id)
    {
        return TypeAbonnement::find($id)?->delete();
    }
    public function create($info)
    {
        return TypeAbonnement::create($info);
    }
    public function update($id,$info)
    {
        return TypeAbonnement::find($id)?->update($info);
    }


}