<?php

namespace App\Providers;

use app\Interfaces\AgentInterface;
use App\Interfaces\AnnonceInterface;
use App\Interfaces\BienInterface;
use App\Interfaces\CommentaireInterface;
use App\Interfaces\LocationInterface;
use App\Interfaces\MessageInterface;
use App\Interfaces\PaiementInterface;
use App\Interfaces\PieceInterface;
use App\Interfaces\TransactionInterface;
use App\Interfaces\UserInterface;
use App\Repositories\AgentRepository;
use App\Repositories\AnnonceRepository;
use App\Repositories\BienRepository;
use App\Repositories\CommentaireRepository;
use App\Repositories\LocationRepository;
use App\Repositories\MessageRepository;
use App\Repositories\PaiementRepository;
use App\Repositories\PieceRepository;
use App\Repositories\TransactionRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AgentInterface::class, AgentRepository::class);
        $this->app->bind(AnnonceInterface::class, AnnonceRepository::class);
        $this->app->bind(BienInterface::class, BienRepository::class);
        $this->app->bind(CommentaireInterface::class, CommentaireRepository::class);
        $this->app->bind(LocationInterface::class, LocationRepository::class);
        $this->app->bind(MessageInterface::class, MessageRepository::class);
        $this->app->bind(PaiementInterface::class, PaiementRepository::class);
        $this->app->bind(PieceInterface::class, PieceRepository::class);
        $this->app->bind(TransactionInterface::class, TransactionRepository::class);
        $this->app->bind(UserInterface::class, UserRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
