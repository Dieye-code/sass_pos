<?php

namespace App\Interfaces;

interface PaiementAchatInterface extends BaseInterface
{
    public function getByAchat($idAchat);
}
