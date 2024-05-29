<?php

namespace App\Http\Controllers;

use App\Interfaces\FournisseurInterface;
use Illuminate\Http\Request;

class FournisseurController extends BaseController
{
    public function __construct(FournisseurInterface $repository)
    {
        $this->repository = $repository;
    }
}
