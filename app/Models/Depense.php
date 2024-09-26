<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Depense  extends BaseModel
{

    public function abonnement()
    {
        return $this->belongsTo(Abonnement::class);
    }
}
