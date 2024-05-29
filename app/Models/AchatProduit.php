<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AchatProduit extends BaseModel
{
    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    public function achat()
    {
        return $this->belongsTo(Achat::class);
    }
}
