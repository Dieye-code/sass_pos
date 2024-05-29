<?php

use App\Http\Controllers\AgentController;
use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\BienController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PieceController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post("/biens/{id}/photo", [BienController::class, 'changePhoto'])->where('id', "[0-9a-z]+")->name('bien.photo.change');
Route::post("/pieces/{id}/add-photo", [PieceController::class, 'addPhoto'])->where('id', "[0-9a-z]+")->name('piece.photo.add');
Route::get("/pieces/{id}/photos", [PieceController::class, 'getAllPhoto'])->where('id', "[0-9a-z]+")->name('piece.photo.get');
Route::delete("/pieces/{id}/remove-photo", [PieceController::class, 'deletePhoto'])->where('id', "[0-9a-z]+")->name('piece.photo.delete');
Route::get("/commentaires/{id}/bien", [CommentaireController::class, 'findCommentaireBien'])->where('id', "[0-9a-z]+")->name('commentaires.bien');

defaultRoutesFor('users', UserController::class);
defaultRoutesFor('agents', AgentController::class);
defaultRoutesFor('biens', BienController::class);
defaultRoutesFor('pieces', PieceController::class);
defaultRoutesFor('locations', LocationController::class);
defaultRoutesFor('commentaires', CommentaireController::class);
defaultRoutesFor('annonces', AnnonceController::class);
defaultRoutesFor('messages', MessageController::class);
