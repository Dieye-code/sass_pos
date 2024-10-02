<?php

namespace App\Http\Controllers;

use App\Interfaces\UserInterface;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use function Laravel\Prompts\password;

class UserController extends Controller
{
    public $userRepository;

    public function __construct(UserInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function get($id){
        return responseFind($this->userRepository->find($id));
    }

    public function index()
    {
        return $this->userRepository->getAll();
    }

    public function create(Request $request)
    {
        $validate = Validator::make(
            $request->all(),
            [
                'nom' => 'required|string',
                'telephone' => ['required', 'regex:/^((76)|(77)|(78)|(70)|(75))[0-9]{7}$/', 'unique:users'],
                'role' => 'required|string',
                'password' => 'required',
            ],
            [
                'nom.required' => 'Le nom est obligatoire ',
                'nom.string' => 'Le nom est invalide',
                'telephone.required' => 'Le numéro de téléphone de l\'utilisateur est obligatoire',
                'telephone.regex' => 'Le numéro de téléphone de l\'utilisateur est invalide',
                'telephone.unique' => 'Le numéro de téléphone de l\'utilisateur existe déjà',
                'password.required' => 'Le code est obligatoire',
                'role.required' => 'Le role de l\'utilisateur est obligatoire ',
                'role.string' => 'Le role de l\'utilisateur est invalide',
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
        return $this->userRepository->create(['nom' => $request->nom, 'telephone' => $request->telephone, 'password' => $request->password, 'role' => $request->role, 'abonnement_id' => Auth::user()?->abonnement_id]);
    }

    public function update($id, Request $request)
    {
        $validate = Validator::make(
            $request->all(),
            [
                'id' => 'required|exists:users',
                'nom' => 'required|string',
                'telephone' => ['required', 'regex:/^((76)|(77)|(78)|(70)|(75))[0-9]{7}$/', 'unique:users,id,'.$id],
                'role' => 'required|string',
            ],
            [
                'id.required' => 'Vous devez sélectionné un utilisateur',
                'id.exists' => 'l\'utilisateur que vous avez selectionné n\'existe pas ',
                'nom.required' => 'Le nom est obligatoire ',
                'nom.string' => 'Le nom est invalide',
                'telephone.required' => 'Le numéro de téléphone de l\'utilisateur est obligatoire',
                'telephone.regex' => 'Le numéro de téléphone de l\'utilisateur est invalide',
                'telephone.unique' => 'Le numéro de téléphone de l\'utilisateur existe déjà',
                'role.required' => 'Le role de l\'utilisateur est obligatoire ',
                'role.string' => 'Le role de l\'utilisateur est invalide',
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
        $user = $this->userRepository->update($id, ['id' => $id, 'nom' => $request->nom, 'telephone' => $request->telephone, 'role' => $request->role, 'abonnement_id' => Auth::user()?->abonnement_id]);
        return responseFind($user);
    }

    public function ad($id){
        $user = $this->userRepository->find($id);
    }

    public function active($id, Request $request){
        $user = $this->userRepository->active($id);
        return responseFind($user);
    }

    public function arrete($id){
        $user = $this->userRepository->arrete($id);
        return responseFind($user);
    }

}
