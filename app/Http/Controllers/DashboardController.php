<?php

namespace App\Http\Controllers;

use App\Interfaces\AchatInterface;
use App\Interfaces\VenteInterface;
use Illuminate\Http\Request;

class DashboardController
{

    private  $achatRepository;
    private $venteRepository;
    public function __construct(AchatInterface $achatRepository, VenteInterface $venteRepository)
    {
        $this->venteRepository = $venteRepository;
        $this->achatRepository = $achatRepository;
    }
    public function index(){
        $ventes = $this->venteRepository->getAll(null);
        $achats = $this->achatRepository->getAll(null);
        return response()->json(['achats' => $achats, 'ventes' => $ventes]);
    }
}
