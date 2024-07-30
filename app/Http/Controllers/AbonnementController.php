<?php

namespace App\Http\Controllers;

use App\Interfaces\AbonnementInterface;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class AbonnementController extends Controller
{

    private AbonnementInterface $abonnementRepository;

    public function __construct(AbonnementInterface $abonnementRepository)
    {
        if(Auth::user()->role != 'admin'){
            return abort(403, 'Vous n\'avez pas accés a cette ressource');
        }
        $this->abonnementRepository = $abonnementRepository;
    }

    public function index()
    {
        return response()->json($this->abonnementRepository->getAll());
    }

    public function arrete($id){
        $abonnement = $this->abonnementRepository->arrete($id);
        return responseFind($abonnement);
    }

    public function active($id){
        $abonnement = $this->abonnementRepository->active($id);
        return responseFind($abonnement);
    }
}
