<?php

namespace App\Providers;

use App\Interfaces\AbonnementInterface;
use App\Interfaces\AchatInterface;
use App\Interfaces\ClientInterface;
use App\Interfaces\FournisseurInterface;
use App\Interfaces\PaiementAchatInterface;
use App\Interfaces\PaiementVenteInterface;
use App\Interfaces\ProduitInterface;
use App\Interfaces\UserInterface;
use App\Interfaces\VenteInterface;
use App\Repositories\AbonnementRepository;
use App\Repositories\AchatRepository;
use App\Repositories\ClientRepository;
use App\Repositories\FournisseurRepository;
use App\Repositories\PaiementAchatRepository;
use App\Repositories\PaiementVenteRepository;
use App\Repositories\ProduitRepository;
use App\Repositories\UserRepository;
use App\Repositories\VenteRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(ClientInterface::class, ClientRepository::class);
        $this->app->bind(FournisseurInterface::class, FournisseurRepository::class);
        $this->app->bind(ProduitInterface::class, ProduitRepository::class);
        $this->app->bind(AchatInterface::class, AchatRepository::class);
        $this->app->bind(VenteInterface::class, VenteRepository::class);
        $this->app->bind(PaiementAchatInterface::class, PaiementAchatRepository::class);
        $this->app->bind(PaiementVenteInterface::class, PaiementVenteRepository::class);
        $this->app->bind(UserInterface::class, UserRepository::class);
        $this->app->bind(AbonnementInterface::class, AbonnementRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
