<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Vente extends BaseModel
{


    public function abonnement()
    {
        return $this->belongsTo(Abonnement::class);
    }

    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'vente_produits')->withPivot('montant_vente', 'quantite', 'id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function paiements()
    {
        return $this->hasMany(Paiementvente::class, 'vente_id');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public static function booted()
    {
        self::creating(function ($model) {

            $model->user_id = Auth::user()?->id;

            $ventes = Vente::where('date', $model->date)->get()->last();
            if ($ventes != null) {
                $numero = explode("-", $ventes->numero);
                if (count($numero) > 1) {
                    $model->numero = 'F00-' . str_replace("-", "", $model->date) . '-' . sprintf('%05d', $numero[count($numero) - 1] + 1);
                } else {
                    $model->numero = 'F00-' . str_replace("-", "", $model->date) . '-00001';
                }
            } else {
                $model->numero = 'F00-' . str_replace("-", "", $model->date) . '-00001';
            }
            // $model->save();
        });

        self::deleting(function (Vente $model) {

            $achats = VenteProduit::where('vente_id', $model->id)->get();
            foreach ($achats as $p) {
                $p->delete();
            }
            foreach ($model->paiements as $p) {
                $p->delete();
            }
            
        });
    }
}
