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

        
        $user = User::firstOrCreate([ 'telephone' => '764191506'], ['nom' => 'Admin','password' => 'Aqzsedr123!', 'role' => 'admin']);

        // dump($user);
        //Abonnement::create(['date' => Carbon::now()]);
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
