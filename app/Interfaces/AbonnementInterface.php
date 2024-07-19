<?php

namespace App\Interfaces;

interface AbonnementInterface 
{
    public function getAll();
    public function arrete($id);

    public function getAbonnementActifs();
    public function getAbonnementInactifs();
}
