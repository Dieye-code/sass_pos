<?php

namespace App\Http\Controllers;

use App\Interfaces\TypeAbonnementInterface;
use Illuminate\Http\Request;

class TypeAbonnementController extends BaseController
{
    public function __construct(TypeAbonnementInterface $repository)
    {
        $this->repository = $repository;
    }
}
