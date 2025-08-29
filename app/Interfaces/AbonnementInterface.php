<?php

namespace App\Interfaces;

interface AbonnementInterface 
{
    public function getAll();
    public function arrete($id);
    public function active($id);
    public function newActive($id);
    public function get($id);
    public function supprimer($id);
    public function activeWithUsers($id);

    public function getAbonnementActifs();
    public function getAbonnementInactifs();
    public function getNewAbonnements();
    public function changePassword($id, $password);
    public function change($id, $debut, $fin);
}
