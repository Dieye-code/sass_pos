<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Produit extends BaseModel
{

    public function abonnement()
    {
        return $this->belongsTo(Abonnement::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
    public static function booted()
    {
        self::creating(function ($model) {
            $model->user_id = Auth::user()?->id;
        });
    }

}
