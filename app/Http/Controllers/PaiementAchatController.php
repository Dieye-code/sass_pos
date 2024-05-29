<?php

namespace App\Http\Controllers;

use App\Interfaces\PaiementAchatInterface;
use Illuminate\Http\Request;

class PaiementAchatController extends BaseController
{
    public function __construct(PaiementAchatInterface $repository)
    {
        $this->repository = $repository;
    }
}
