<?php

namespace App\Interfaces;

interface AchatInterface extends BaseInterface
{
    public function saveAchatProduit($info);
    public function getLastAchat();
}
