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
        Schema::table('ventes', function (Blueprint $table) {
            if (!Schema::hasColumn('ventes', 'numero')) {
                $table->string('numero', 30)->nullable();
            }
            if (!Schema::hasColumn('ventes', 'user_id')) {
                $table->foreignUuid('user_id')->nullable()->constrained('users');
            }
        });
        Schema::table('achats', function (Blueprint $table) {
            if (!Schema::hasColumn('achats', 'user_id')) {
                $table->foreignUuid('user_id')->nullable()->constrained('users');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ventes')) {
            Schema::table('ventes', function (Blueprint $table) {
                if (Schema::hasColumn('ventes', 'numero')) {
                    $table->dropColumn('numero');
                }
                if (Schema::hasColumn('ventes', 'user_id')) {
                    $table->dropColumn('user_id');
                }
            });
        }
        if (Schema::hasTable('achats')) {
            Schema::table('achats', function (Blueprint $table) {
                if (Schema::hasColumn('achats', 'user_id')) {
                    $table->dropColumn('user_id');
                }
            });
        }
    }
};
