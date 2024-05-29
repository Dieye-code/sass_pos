<?php

namespace App\Http\Controllers;

use App\Interfaces\ProduitInterface;
use Illuminate\Http\Request;

class ProduitController extends BaseController
{
    public function __construct(ProduitInterface $repository)
    {
        $this->repository = $repository;
    }
}
