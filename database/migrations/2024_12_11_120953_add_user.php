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
        Schema::table('achats', function (Blueprint $table) {
            if (!Schema::hasColumn('achats', 'user_id')) {
                $table->foreignUuid('user_id')->nullable()->constrained('users');
            }
        });
        Schema::table('ventes', function (Blueprint $table) {
            if (!Schema::hasColumn('ventes', 'user_id')) {
                $table->foreignUuid('user_id')->nullable()->constrained('users');
            }
        });
        Schema::table('produits', function (Blueprint $table) {
            if (!Schema::hasColumn('produits', 'user_id')) {
                $table->foreignUuid('user_id')->nullable()->constrained('users');
            }
        });
        Schema::table('fournisseurs', function (Blueprint $table) {
            if (!Schema::hasColumn('fournisseurs', 'user_id')) {
                $table->foreignUuid('user_id')->nullable()->constrained('users');
            }
        });
        Schema::table('clients', function (Blueprint $table) {
            if (!Schema::hasColumn('clients', 'user_id')) {
                $table->foreignUuid('user_id')->nullable()->constrained('users');
            }
        });
        Schema::table('paiement_achats', function (Blueprint $table) {
            if (!Schema::hasColumn('paiement_achats', 'user_id')) {
                $table->foreignUuid('user_id')->nullable()->constrained('users');
            }
        });
        Schema::table('paiement_ventes', function (Blueprint $table) {
            if (!Schema::hasColumn('paiement_ventes', 'user_id')) {
                $table->foreignUuid('user_id')->nullable()->constrained('users');
            }
        });
        Schema::table('depenses', function (Blueprint $table) {
            if (!Schema::hasColumn('depenses', 'user_id')) {
                $table->foreignUuid('user_id')->nullable()->constrained('users');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('achats')) {
            Schema::table('achats', function (Blueprint $table) {
                if (Schema::hasColumn('achats', 'user_id')) {
                    $table->dropColumn('user_id');
                }
            });
        }
        if (Schema::hasTable('ventes')) {
            Schema::table('ventes', function (Blueprint $table) {
                if (Schema::hasColumn('ventes', 'user_id')) {
                    $table->dropColumn('user_id');
                }
            });
        }
        if (Schema::hasTable('produits')) {
            Schema::table('produits', function (Blueprint $table) {
                if (Schema::hasColumn('produits', 'user_id')) {
                    $table->dropColumn('user_id');
                }
            });
        }
        if (Schema::hasTable('fournisseurs')) {
            Schema::table('fournisseurs', function (Blueprint $table) {
                if (Schema::hasColumn('fournisseurs', 'user_id')) {
                    $table->dropColumn('user_id');
                }
            });
        }
        if (Schema::hasTable('clients')) {
            Schema::table('clients', function (Blueprint $table) {
                if (Schema::hasColumn('clients', 'user_id')) {
                    $table->dropColumn('user_id');
                }
            });
        }
        if (Schema::hasTable('paiement_achats')) {
            Schema::table('paiement_achats', function (Blueprint $table) {
                if (Schema::hasColumn('paiement_achats', 'user_id')) {
                    $table->dropColumn('user_id');
                }
            });
        }
        if (Schema::hasTable('paiement_ventes')) {
            Schema::table('paiement_ventes', function (Blueprint $table) {
                if (Schema::hasColumn('paiement_ventes', 'user_id')) {
                    $table->dropColumn('user_id');
                }
            });
        }
        if (Schema::hasTable('depenses')) {
            Schema::table('depenses', function (Blueprint $table) {
                if (Schema::hasColumn('depenses', 'user_id')) {
                    $table->dropColumn('user_id');
                }
            });
        }
    }
};
