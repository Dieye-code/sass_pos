<?php

namespace App\Repositories;

use App\Interfaces\UserInterface;
use App\Models\User;

class UserRepository  implements UserInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        // $this->with = 'abonnement';
        // $this->model = '\App\Models\User';
    }

    

    public function getAll($idAbonnement)
    {
        return User::with('abonnement')->where('abonnement_id', $idAbonnement)->get();
    }
    public function find($id)
    {
        return User::where('id', $id)->with('abonnement')->first();
    }
    public function delete($id)
    {
        return User::find($id)?->delete();
    }
    public function create($info)
    {
        return User::create($info);
    }
    public function update($id,$info)
    {
        return User::find($id)?->update($info);
    }
}
