<?php

namespace Database\Seeders;

use App\Models\Abonnement;
use App\Models\User;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        
        $user = User::firstOrCreate([ 'telephone' => '764191506'], ['nom' => 'Admin','password' => 'Aqzsedr@75!', 'role' => 'admin']);

    }
}
