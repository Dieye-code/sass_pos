<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VenteProduit extends BaseModel
{
    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    public function vente()
    {
        return $this->belongsTo(Vente::class);
    }
}
