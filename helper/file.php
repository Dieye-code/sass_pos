<?php

use Illuminate\Support\Facades\Route;

function responseFind($data)
{

    if ($data == null) {
        return response()->json([
            'status' => 404,
            'message' => 'data not found'
        ], 404);
    }

    return response()->json($data);
}

function defaultRoutesFor(string $route, string $controller = null,$name = '')
{
    Route::get("/$route", [$controller, "index"])->name('user.getall');
    Route::get("/$route/{id}", [$controller, "get"])->where('id', "[0-9a-z]+")->name('user.find');
    Route::post("/$route", [$controller, "create"])->name('user.create');
    Route::put("/$route/{id}", [$controller, "update"])->where('id', "[0-9a-z]+")->name('user.update');
    Route::delete("/$route/{id}", [$controller, "delete"])->where('id', "[0-9a-z]+")->name('user.delete');
}


function storefile($file)
{
    $directory = 'uploads/' . (new DateTime())->format('Y-m-d');

    $filename = substr(bin2hex(random_bytes(32)), 0, 15) . '.' . $file->getClientOriginalExtension();

    $path = $file->storeAs(
        $directory,
        $filename,
        'public'
    );

    return  $path;
}
