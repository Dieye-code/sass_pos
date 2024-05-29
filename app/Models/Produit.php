<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends BaseModel
{

    public function abonnement()
    {
        return $this->belongsTo(Abonnement::class);
    }

}
