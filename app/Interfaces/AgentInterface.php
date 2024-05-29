<?php

namespace app\Interfaces;


interface AgentInterface extends BaseInterface
{
    public function findByUser($idUser);
}
