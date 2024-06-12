<?php

namespace App\Interfaces;

interface VenteInterface extends BaseInterface
{
    public function saveVenteProduit($info);
    public function getLatestVente($idAbonnement = null);
}
