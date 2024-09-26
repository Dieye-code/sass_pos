<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public static function booted()
    {
        self::creating(function ($model) {
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
    }
}
