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
        Schema::create('fournisseurs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom',100)->nullable();
            $table->string('telephone',25)->nullable();
            $table->string('adresse',150)->nullable();
            $table->foreignUuid('abonnement_id')->nullable()->constrained('abonnements');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fournisseurs');
    }
};
