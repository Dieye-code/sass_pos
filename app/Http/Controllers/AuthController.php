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

        $validate = Validator::make(
            $request->all(),
            [
                'nom' => 'required|string',
                'nomUser' => 'required|string',
                'adresse' => 'required|string',
                'telephoneAbonnement' => ['required', 'regex:/^((76)|(77)|(78)|(70)|(75)|(88)|(33))[0-9]{7}$/'],
                'telephone' => ['required', 'regex:/^((76)|(77)|(78)|(70)|(75))[0-9]{7}$/', 'unique:users'],
                'password' => 'required',
            ],
            [
                'nom.required' => 'Le nom est obligatoire ',
                'nom.string' => 'Le nom est invalide',
                'nomUser.required' => 'Le nom de l\'utilisateur est obligatoire ',
                'nomUser.string' => 'Le  nom de l\'utilisateur est invalide',
                'adresse.required' => 'L\'adresse est obligatoire ',
                'adresse.string' => 'L\'adresse est invalide',
                'telephoneAbonnement.required' => 'Le numéro de téléphone est obligatoire',
                'telephoneAbonnement.regex' => 'Le numéro de téléphone est invalide',
                'telephone.required' => 'Le numéro de téléphone de l\'utilisateur est obligatoire',
                'telephone.regex' => 'Le numéro de téléphone de l\'utilisateur est invalide',
                'telephone.unique' => 'Le numéro de téléphone de l\'utilisateur existe déjà',
                'password.required' => 'Le code est obligatoire',
            ]
        );
        $errors = [];

        if ($validate->fails()) {
            foreach ($validate->errors()->messages() as $value) {

                foreach ($value as $v) {
                    $errors[] = $v;
                }
            }
            return response()->json($errors, 400);
        }

        $logo = null;
        if (key_exists('logo', $request->file())) {
            $logo = storefile($request->file('logo'));
        }

        DB::beginTransaction();
        $abonnement = $this->userRepository->storeAbonnement(['nom' => $request->nom, 'adresse' => $request->adresse, 'date' => Carbon::now(), 'dateLimit' => Carbon::now()->addMonths(12), 'logo' => $logo, 'telephone' => $request->telephoneAbonnement]);

        $user = $this->userRepository->create(['nom' => $request->nomUser, 'telephone' => $request->telephone, 'password' => $request->password, 'role' => 'user', 'abonnement_id' => $abonnement->id]);
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
            return response()->json(['error' => 'Téléphone ou code incorrect'], 401);
        }
        if (auth()->user()->etat == 0 ||  (auth()->user()->abonnement != null && auth()->user()->abonnement?->etat == 0)) {
            Auth::logout();
            return response()->json(['error' => 'Ce compte n\'est pas actif'], 401);
        }
        return $this->respondWithToken($token);
    }

    public function refresh()
    {
        return $this->respondWithToken(Auth::refresh());
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([], 200);
    }

    protected function respondWithToken($token)
    {
        $data = [
            'access_token' => $token,
            'token_type' => 'bearer',
        ];
        Auth::user()?->abonnement != null ? $data['abonnement'] =  ['nom' =>  Auth::user()->abonnement?->nom, 'adresse' =>  Auth::user()->abonnement?->adresse, 'logo' =>  Auth::user()->abonnement?->logo] : '';
        return response()->json($data, 200);
    }
}
