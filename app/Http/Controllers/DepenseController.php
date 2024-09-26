<?php

namespace App\Http\Controllers;

use App\Interfaces\DepenseInterface;
use Illuminate\Http\Request;

class DepenseController extends BaseController
{
    public function __construct(DepenseInterface $repository)
    {
        $this->repository = $repository;
    }
}
