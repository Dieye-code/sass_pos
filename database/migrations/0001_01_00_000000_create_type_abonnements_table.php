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
        Schema::create('type_abonnements', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->unsignedInteger('inscription')->default(0);
            $table->unsignedInteger('mensualite')->default(0);
            $table->unsignedInteger('mois_reduit_anne')->default(2);
            $table->unsignedInteger('nombre_utilisateur')->default(1);
            $table->unsignedInteger('nombre_produit')->default(1);
            $table->timestamps();
        });
        Schema::table('abonnements', function (Blueprint $table) {
            if (!Schema::hasColumn('abonnements', 'type_abonnement_id')) {
                $table->foreignUuid('type_abonnement_id')->nullable()->constrained('type_abonnements');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('type_abonnements');
    }
};
