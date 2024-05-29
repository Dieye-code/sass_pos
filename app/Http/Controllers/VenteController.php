<?php

namespace App\Http\Controllers;

use App\Interfaces\VenteInterface;
use Illuminate\Http\Request;

class VenteController extends BaseController
{
    public function __construct(VenteInterface $repository)
    {
        $this->repository = $repository;
    }
}
