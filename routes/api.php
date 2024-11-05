<?php

use App\Http\Controllers\AbonnementController;
use App\Http\Controllers\AchatController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepenseController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\PaiementAchatController;
use App\Http\Controllers\PaiementVenteController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\TypeAbonnementController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VenteController;
use Illuminate\Support\Facades\Route;



Route::group(['middleware' => 'auth'], function () {


    Route::get('/dashboard-admin', [DashboardController::class, 'admin']);


    Route::get('/achats/last', [AchatController::class, 'last']);
    Route::get('/ventes/last', [VenteController::class, 'last']);
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/achats/paiements/{idAchat}', [PaiementAchatController::class, 'getPaiementByAchat']);
    Route::post('/achats/paiement', [PaiementAchatController::class, 'save']);
    Route::get('/ventes/paiements/{idVente}', [PaiementVenteController::class, 'getPaiementByVente']);
    Route::post('/ventes/paiement', [PaiementVenteController::class, 'save']);
    Route::get('/clients/{id}/details', [ClientController::class, 'details']);
    Route::post('/clients/{id}/paiement', [ClientController::class, 'paiement']);
    Route::get('/fournisseurs/{id}/details', [FournisseurController::class, 'details']);
    Route::post('/fournisseurs/{id}/paiement', [FournisseurController::class, 'paiement']);
    Route::get('/dettes', [AchatController::class, 'dettes']);
    Route::get('/creances', [VenteController::class, 'creances']);

    Route::get('/ventes/jour', [VenteController::class, 'venteDuJour']);
    Route::get('/ventes/semaine', [VenteController::class, 'venteDeLaSemaine']);
    Route::get('/ventes/mois', [VenteController::class, 'venteDuMois']);
    Route::post('/ventes/intervalle', [VenteController::class, 'venteIntervalle']);
    Route::delete('/ventes/{id}/retour', [VenteController::class, 'retour'])->where('id', "[0-9a-z]+")->name('ventes.retour');

    Route::get('/achats/jour', [AchatController::class, 'achatDuJour']);
    Route::get('/achats/mois', [AchatController::class, 'achatDuMois']);
    Route::get('/achats/semaine', [AchatController::class, 'achatDeLaSemaine']);
    Route::post('/achats/intervalle', [AchatController::class, 'achatIntervalle']);
    Route::delete('/achats/{id}/retour', [AchatController::class, 'retour'])->where('id', "[0-9a-z]+")->name('achats.retour');

    Route::get('/abonnements', [AbonnementController::class, 'index']);
    Route::get('/abonnements/{id}/arrete', [AbonnementController::class, 'arrete']);
    Route::get('/abonnements/{id}/active', [AbonnementController::class, 'active']);
    Route::get('/new-abonnements', [AbonnementController::class, 'new']);
    Route::get('/abonnements/{id}/active-new', [AbonnementController::class, 'newActive']);


    Route::post('/user/change-password', [AuthController::class, 'changePassword']);

    Route::get("/users/{id}/active", [UserController::class, 'active'])->where('id', '[0-9a-z]+')->name('users.active');

    Route::get('/users/{id}/arrete', [UserController::class, 'arrete'])->where('id', '[0-9a-z]+')->name('users.arrete');

    defaultRoutesFor('users', UserController::class);
    defaultRoutesFor('depenses', DepenseController::class);
    defaultRoutesFor('fournisseurs', FournisseurController::class);
    defaultRoutesFor('clients', ClientController::class);
    defaultRoutesFor('produits', ProduitController::class);
    defaultRoutesFor('achats', AchatController::class);
    defaultRoutesFor('ventes', VenteController::class);
    defaultRoutesFor('type-abonnements', TypeAbonnementController::class);
    Route::get('/auth/logout', [AuthController::class, 'logout'])->name('logout');
});



Route::get('auth/refresh', [AuthController::class, 'refresh'])->name('login');


Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');

// defaultRoutesFor('paiement-achat', PaiementAchatController::class);
// defaultRoutesFor('paiement-vente', PaiementVenteController::class);
