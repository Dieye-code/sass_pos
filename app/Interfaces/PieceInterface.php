<?php

namespace App\Interfaces;


interface PieceInterface extends BaseInterface
{
    public function findPieceByBien($idBien);
    public function findPieceByNiveau($niveau);
    public function addPhoto($idPiece,$photo);
    public function getAllPhoto($idPiece);
    public function deletePhoto($idPhoto);
}
