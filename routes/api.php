<?php

use App\Http\Controllers\AchatController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\PaiementAchatController;
use App\Http\Controllers\PaiementVenteController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VenteController;
use Illuminate\Support\Facades\Route;



Route::get('/achats/last', [AchatController::class, 'last']);
Route::get('/ventes/last', [VenteController::class, 'last']);
Route::get('/dashboard', [DashboardController::class, 'index']);

Route::get('/achats/paiements/{idAchat}',[PaiementAchatController::class, 'getPaiementByAchat']);
Route::post('/achats/paiement', [PaiementAchatController::class, 'save']);
Route::get('/ventes/paiements/{idVente}',[PaiementVenteController::class, 'getPaiementByVente']);
Route::post('/ventes/paiement', [PaiementVenteController::class, 'save']);
Route::get('/clients/{id}/details', [ClientController::class, 'details']);
Route::get('/fournisseurs/{id}/details', [FournisseurController::class, 'details']);
Route::post('/fournisseurs/{id}/paiement', [FournisseurController::class, 'paiement']);

defaultRoutesFor('users', UserController::class);
defaultRoutesFor('fournisseurs', FournisseurController::class);
defaultRoutesFor('clients', ClientController::class);
defaultRoutesFor('produits', ProduitController::class);
defaultRoutesFor('achats', AchatController::class);
defaultRoutesFor('ventes', VenteController::class);
// defaultRoutesFor('paiement-achat', PaiementAchatController::class);
// defaultRoutesFor('paiement-vente', PaiementVenteController::class);
