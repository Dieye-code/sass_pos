<?php

namespace App\Repositories;

use App\Interfaces\UserInterface;
use App\Models\Abonnement;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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



    public function getAll()
    {
        return User::with('abonnement')->where('abonnement_id', Auth::user()?->abonnement_id)->get();
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
    public function update($id, $info)
    {
        return User::find($id)?->update($info);
    }

    public function storeAbonnement($info)
    {
        return Abonnement::create($info);
    }

    public function arrete($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->etat = 0;
            $user->save();
        }
        return $user;
    }

    public function active($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->etat = 1;
            $user->save();
        }
        return $user;
    }
}
