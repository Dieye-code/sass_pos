<?php

namespace App\Repositories;

use App\Interfaces\PaiementAchatInterface;
use App\Models\PaiementAchat;
use Illuminate\Support\Facades\Auth;

class PaiementAchatRepository extends BaseRepository implements PaiementAchatInterface
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
        return PaiementAchat::with('abonnement')->where('abonnement_id', Auth::user()?->abonnement_id)->get();
    }
    public function getByAchat($idAchat)
    {
        return PaiementAchat::where('achat_id', $idAchat)->get();
    }
    public function find($id)
    {
        return PaiementAchat::where('id', $id)->with('abonnement')->first();
    }
    public function delete($id)
    {
        return PaiementAchat::find($id)?->delete();
    }
    public function create($info)
    {
        return PaiementAchat::create($info);
    }
    public function update($id,$info)
    {
        return PaiementAchat::find($id)?->update($info);
    }
}
