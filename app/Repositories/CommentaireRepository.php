<?php

namespace App\Repositories;

use App\Interfaces\CommentaireInterface;
use App\Models\Commentaire;

class CommentaireRepository implements CommentaireInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    

    public function getAll()
    {
        return Commentaire::with('user')->with('bien')->get();
    }
    public function find($id)
    {
        return Commentaire::where('id', $id)->with('user')->with('bien')->first();
    }
    public function findCommentaireByUser($idUser)
    {
        return Commentaire::where('user_id', $idUser)->with('user')->with('bien')->first();
    }
    public function findCommentaireBien($idBien)
    {
        return Commentaire::where('bien_id', $idBien)->with('user')->with('bien')->first();
    }
    public function delete($id)
    {
        return Commentaire::find($id)?->delete();
    }
    public function create($info)
    {
        return Commentaire::create($info);
    }
    public function update($id,$info)
    {
        return Commentaire::find($id)?->update($info);
    }
    
    public function getCommentaireByIdBien($idBien){
        return Commentaire::where('bien_id', $idBien)->with('user')->with('bien')->get(); 
    }
}
