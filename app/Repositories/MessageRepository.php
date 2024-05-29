<?php

namespace App\Repositories;

use App\Interfaces\MessageInterface;
use App\Models\Message;

class MessageRepository implements MessageInterface
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
        return Message::with('recepteur')->with('emeteur')->get();
    }
    public function find($id)
    {
        return Message::where('id', $id)->with('recepteur')->with('emeteur')->first();
    }
    public function findMessagEmis($idUser)
    {
        return Message::where('emeteur_id', $idUser)->with('recepteur')->with('emeteur')->first();
    }
    public function findMessagRecu($idUser)
    {
        return Message::where('recepteur_id', $idUser)->with('recepteur')->with('emeteur')->first();
    }
    public function delete($id)
    {
        return Message::find($id)?->delete();
    }
    public function create($info)
    {
        return Message::create($info);
    }
    public function update($id,$info)
    {
        return Message::find($id)?->update($info);
    }
}
