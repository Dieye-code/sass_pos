<?php

namespace App\Repositories;

use App\Interfaces\DepenseInterface;
use App\Models\Depense;
use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Auth;

class DepenseRepository extends BaseRepository implements DepenseInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        
    }

    
    public function getAll()
    {
        return Depense::with('abonnement')->where('abonnement_id', Auth::user()?->abonnement_id)->get();
    }
    public function find($id)
    {
        return Depense::where('id', $id)->with('abonnement')->first();
    }
    public function delete($id)
    {
        return Depense::find($id)?->delete();
    }
    public function create($info)
    {
        return Depense::create($info);
    }
    public function update($id,$info)
    {
        return Depense::find($id)?->update($info);
    }
}
