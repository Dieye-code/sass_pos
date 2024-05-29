<?php

namespace App\Repositories;

use App\Interfaces\PieceInterface;
use App\Models\Photo;
use App\Models\Piece;

class PieceRepository implements PieceInterface
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
        return Piece::with('bien')->get();
    }
    public function find($id)
    {
        return Piece::where('id', $id)->with('bien')->first();
    }
    public function findPieceByBien($idBien)
    {
        return Piece::where('bien_id', $idBien)->with('bien')->first();
    }
    public function findPieceByNiveau($niveau)
    {
        return Piece::where('niveau', $niveau)->with('bien')->first();
    }
    public function delete($id)
    {
        return Piece::find($id)?->delete();
    }
    public function create($info)
    {
        return Piece::create($info);
    }
    public function update($id, $info)
    {
        return Piece::find($id)?->update($info);
    }
    
    public function addPhoto($idPiece,$photo)
    {
        Photo::create(['piece_id' => $idPiece, 'url' => $photo]);
    }
    public function getAllPhoto($idPiece)
    {
        return Photo::where('piece_id', $idPiece)->get();
    }
    public function deletePhoto($idPhoto)
    {
        return Photo::find($idPhoto)?->delete();
    }

}
