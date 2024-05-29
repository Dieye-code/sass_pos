<?php

namespace App\Interfaces;


interface TransactionInterface extends BaseInterface
{
    public function findTransactionByPaiement($idPaiement);
}
