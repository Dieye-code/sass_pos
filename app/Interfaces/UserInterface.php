<?php

namespace App\Interfaces;


interface UserInterface extends BaseInterface
{

    public function storeAbonnement($info);
    public function arrete($id);
    public function active($id);

}
