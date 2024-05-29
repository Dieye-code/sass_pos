<?php

namespace App\Repositories;

use App\Interfaces\TransactionInterface;
use App\Models\Transaction;

class TransactionRepository implements TransactionInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getAllTransactions()
    {
        return Transaction::with('user')->get();
    }
    public function findTransaction($id)
    {
        return Transaction::where('id', $id)->with('user')->get();
    }
    public function findTransactionByPaiement($idPaiement)
    {
        return Transaction::where('paiement_id', $idPaiement)->with('user')->get();
    }
    public function deleteTransaction($id)
    {
        return Transaction::find($id)?->delete();
    }
    public function create($info)
    {
        return Transaction::create($info);
    }
    public function update($id,$info)
    {
        return Transaction::find($id)?->update($info);
    }

}
