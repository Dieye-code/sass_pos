<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Achat extends BaseModel
{

    public function abonnement()
    {
        return $this->belongsTo(Abonnement::class);
    }

    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'achat_produits')->withPivot('montant_achat', 'quantite');
    }

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class);
    }

    public function paiements()
    {
        return $this->hasMany(PaiementAchat::class, 'achat_id');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    protected static  function booted()
    {
        self::creating(function ($model) {
            $model->user_id = Auth::user()?->id;
        });

        static::deleting(function (Achat $model) {

            $achats = AchatProduit::where('achat_id', $model->id)->get();
            foreach ($achats as $p) {
                $p->delete();
            }
            foreach ($model->paiements as $p) {
                $p->delete();
            }
        });
    }
}
