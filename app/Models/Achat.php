<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Achat extends BaseModel
{

    public function abonnement()
    {
        return $this->belongsTo(Abonnement::class);
    }

    public function produits()
    {
        return $this->belongsToMany(Produit::class)->withPivot('montant_achat', 'quantite', 'date');
    }

}
