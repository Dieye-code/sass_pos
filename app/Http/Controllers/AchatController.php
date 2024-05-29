<?php

namespace App\Http\Controllers;

use App\Interfaces\AchatInterface;
use Illuminate\Http\Request;

class AchatController extends BaseController
{
    public function __construct(AchatInterface $repository)
    {
        $this->repository = $repository;
    }
}
