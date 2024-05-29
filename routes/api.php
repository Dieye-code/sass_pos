<?php

use App\Http\Controllers\AgentController;
use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\BienController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PieceController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



defaultRoutesFor('users', UserController::class);
defaultRoutesFor('fournisseurs', FournisseurController::class);
