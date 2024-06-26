<?php

namespace App\Interfaces;

interface PaiementVenteInterface extends BaseInterface
{
    public function getByVente($idAchat);
}
