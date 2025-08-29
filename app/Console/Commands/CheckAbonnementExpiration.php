<?php

namespace App\Console\Commands;

use App\Models\Abonnement;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CheckAbonnementExpiration extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'abonnements:check-expiration';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Désactive les abonnements expirés';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $today = Carbon::now()->format('Y-m-d');
        
        $expiredAbonnements = Abonnement::whereDate('dateLimit', $today)
            ->where('etat', 1)
            ->get();

        foreach ($expiredAbonnements as $abonnement) {
            // Désactiver l'abonnement
            $abonnement->etat = 0;
            $abonnement->save();

            // Désactiver les utilisateurs associés
            User::where('abonnement_id', $abonnement->id)
                ->update(['etat' => 0]);
        }

        $count = $expiredAbonnements->count();
        $this->info("$count abonnement(s) ont été désactivés.");
    }
}
