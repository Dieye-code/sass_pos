<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vente_produits', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->unsignedInteger('montant_vente')->default(0);
            $table->unsignedInteger('quantite')->default(0);
            $table->dateTime('date')->nullable();
            $table->foreignUuid('produit_id')->nullable()->constrained('produits');
            $table->foreignUuid('vente_id')->nullable()->constrained('ventes');
            $table->foreignUuid('abonnement_id')->nullable()->constrained('abonnements');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vente_produits');
    }
};
