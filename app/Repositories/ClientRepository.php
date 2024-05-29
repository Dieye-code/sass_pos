<?php

namespace App\Repositories;

use App\Interfaces\ClientInterface;
use App\Models\Client;

class ClientRepository extends BaseRepository implements ClientInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        
    }

    
    public function getAll($idAbonnement)
    {
        return Client::with('abonnement')->where('abonnement_id', $idAbonnement)->get();
    }
    public function find($id)
    {
        return Client::where('id', $id)->with('abonnement')->first();
    }
    public function delete($id)
    {
        return Client::find($id)?->delete();
    }
    public function create($info)
    {
        return Client::create($info);
    }
    public function update($id,$info)
    {
        return Client::find($id)?->update($info);
    }
}
