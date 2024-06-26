<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiementvente extends BaseModel
{
    

    protected $table = 'paiement_ventes';

    public function vente()
    {
        return $this->belongsTo(Vente::class);
    }
}
