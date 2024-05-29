<?php

namespace App\Repositories;

use App\Interfaces\LocationInterface;
use App\Models\Location;

class LocationRepository implements LocationInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    

    public function getAllLocations()
    {
        return Location::with('bien')->get();
    }
    public function findLocation($id)
    {
        return Location::where('id', $id)->with('bien')->first();
    }
    public function findLocationByBien($idBien)
    {
        return Location::where('bien_id', $idBien)->with('bien')->first();
    }

    public function findLocationBienEncours($idBien){
        
        return Location::where('bien_id', $idBien)->where('etat', true)->with('bien')->with('bien.agent')->first();
    }

    public function deleteLocation($id)
    {
        return Location::find($id)?->delete();
    }
    public function create($info)
    {
        return Location::create($info);
    }
    public function update($id,$info)
    {
        return Location::find($id)?->update($info);
    }
}
