<?php

namespace App\Models;

use Carbon\Carbon;
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


    public static function mettreFin(){

        

        $abonnements = Abonnement::whereRaw('DATEDIFF(dateLimit, NOW()) <= 0')->where('etat', 1)->get();
        foreach ($abonnements as $abonnement) {
            $abonnement->etat = 0;
            $abonnement->save();
        }

    }


}
