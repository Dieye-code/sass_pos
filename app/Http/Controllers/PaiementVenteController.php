<?php

namespace App\Http\Controllers;

use App\Interfaces\PaiementVenteInterface;
use Illuminate\Http\Request;

class PaiementVenteController extends BaseController
{
    public function __construct(PaiementVenteInterface $repository)
    {
        $this->repository = $repository;
    }
}
