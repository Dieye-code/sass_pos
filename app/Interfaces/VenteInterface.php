<?php

namespace App\Interfaces;

interface VenteInterface extends BaseInterface
{
    public function saveVenteProduit($info);
    public function getLatestVente();
    public function getVenteByClient($idClient);
    public function getVenteWithPaiements();
}
