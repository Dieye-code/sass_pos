<?php

namespace App\Interfaces;


interface BienInterface extends BaseInterface
{
    public function updatePhoto($id, $photo);
}