<?php


namespace App\Interfaces;

interface BaseInterface
{
    public function getAll();
    public function find($id);
    public function delete($id);
    public function create($info);
    public function update($id,$info);
}