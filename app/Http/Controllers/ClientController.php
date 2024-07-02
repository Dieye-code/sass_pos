<?php

namespace App\Http\Controllers;

use App\Interfaces\ClientInterface;
use Illuminate\Http\Request;

class ClientController extends BaseController
{
    public function __construct(ClientInterface $repository)
    {
        $this->repository = $repository;
    }

    public function details($id)
    {
        
    }

}
