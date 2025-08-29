<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Paiementvente extends BaseModel
{
    

    protected $table = 'paiement_ventes';

    public function vente()
    {
        return $this->belongsTo(Vente::class);
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
