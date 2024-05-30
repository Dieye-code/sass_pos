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
    

    public function beforeCreating()
    {
        if (key_exists('photo', $this->validate)) {
            $photo = storefile($this->validate['photo']);
            $this->validate['photo'] = $photo;
        }
    }
}
