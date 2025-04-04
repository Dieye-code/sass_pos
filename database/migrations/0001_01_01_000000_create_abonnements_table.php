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
        Schema::create('abonnements', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->boolean('etat')->default(false);
            $table->boolean('is_new')->default(true);
            $table->string('nom', 150)->nullable();
            $table->string('adresse', 150)->nullable();
            $table->string('telephone', 150)->nullable();
            $table->string('logo', 150)->nullable();
            $table->date('date')->nullable();
            $table->date('dateLimit')->nullable();
            $table->foreignUuid('type_abonnement_id')->nullable()->constrained('type_abonnements');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abonnements');
    }
};
