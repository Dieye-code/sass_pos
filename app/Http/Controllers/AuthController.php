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

        $validate = Validator::make($request->all(), 
        [
            'nom' => 'required|string',
            'telephone' => ['required','regex:/^((76)|(77)|(78)|(70)|(75))[0-9]{7}$/','unique:users'],
            'password' => 'required',
        ],
        [
            'nom.required' => 'Le nom est obligatoire ',
            'nom.string' => 'Le nom est invalide',
            'telephone.required' => 'Le numéro de téléphone est obligatoire',
            'telephone.regex' => 'Le numéro de téléphone est invalide',
            'telephone.unique' => 'Le numéro de téléphone existe déjà',
            'password.required' => 'Le code est obligatoire',
        ]);
        $errors = [];

        if($validate->fails()){
            foreach ($validate->errors()->messages() as $value) {

                foreach ($value as $v) {
                    $errors[] = $v;
                }
            }
            return response()->json($errors, 400);
        }

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
