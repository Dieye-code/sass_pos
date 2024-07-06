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
        Schema::create('achats', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->dateTime('date')->nullable();
            $table->unsignedInteger('montant_total')->default(0);
            $table->string('etat',50)->nullable();
            $table->string('facture',100)->nullable();
            $table->foreignUuid('fournisseur_id')->constrained('fournisseurs');
            $table->foreignUuid('abonnement_id')->nullable()->constrained('abonnements');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('achats');
    }
};
