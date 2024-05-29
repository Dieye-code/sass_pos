<?php

namespace App\Interfaces;


interface MessageInterface extends BaseInterface
{
    
    public function findMessagEmis($idUser);
    public function findMessagRecu($idUser);
}
