<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Abonnement extends BaseModel
{

    public function type(){
        return $this->belongsTo(TypeAbonnement::class,'type_abonnement_id');
    }

    public function user(){
        return $this->hasOne(User::class);
    }
    


}
