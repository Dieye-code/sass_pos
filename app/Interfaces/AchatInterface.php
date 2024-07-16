<?php

namespace App\Interfaces;

interface AchatInterface extends BaseInterface
{
    public function saveAchatProduit($info);
    public function getLastAchat();
    public function getAchatByFournisseur($idFournisseur);
    public function getAchatWithPaiements();
    public function getAchatDuJour();
    public function getAchatDuMois();
    public function getAchatDeLaSemaine();
    public function getAchatByIntervallee($debut, $fin);
}
