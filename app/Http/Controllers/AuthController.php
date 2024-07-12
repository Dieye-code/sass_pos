<?php

namespace App\Http\Controllers;

use App\Interfaces\UserInterface;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AuthController
{


    private UserInterface $userRepository;

    public function __construct(UserInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(Request $request)
    {

        DB::beginTransaction();
        $abonnement = $this->userRepository->storeAbonnement(['date' => Carbon::now(), 'dateLimit' => Carbon::now()->addMonths(12)]);

        $user = $this->userRepository->create(['nom' => $request->nom, 'telephone' => $request->telephone, 'password' => $request->password, 'role' => 'user', 'abonnement_id' => $abonnement->id]);
        DB::commit();

        return $user;
    }



    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'telephone' => 'required',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $credentials = request(['telephone', 'password']);
        
        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }

    public function refresh()
    {
        return $this->respondWithToken(Auth::refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer'
        ]);
    }
}
