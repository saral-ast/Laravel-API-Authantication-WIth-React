<?php

namespace App\Http\Controllers\Api;

use App\Helper\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
    public function index(){
         try {
                $users = User::all();
                return ApiResponse::success([
                'users' => UserResource::collection($users),
                ],"Users fetched successfull");
         } catch (Exception $e) {
                return ApiResponse::error($e->getMessage());
         }

    }
    public function register(RegisterRequest $registerRequest){
        try {
            // The validation is already handled by the RegisterRequest class
            // If we reach this point, it means validation has passed
            $validated = $registerRequest->validated();
            $user = User::create($validated);
            $token = $user->createToken($user->id."-AuthToken")->plainTextToken;

            
            
            return ApiResponse::success([
                'user'=> UserResource::make($user),
                'token'=>$token
            ], "User created successfully");
            
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }
    public function login(LoginRequest $loginRequest){
        try {
             $credentials = $loginRequest->only(['email','password']);
              if(Auth::attempt($credentials)) {
                $user = User::whereEmail($loginRequest->email)->first();
                $token = $user->createToken($user->id."-AuthToken")->plainTextToken;

                return ApiResponse::success([
                    "user"  =>  UserResource::make($user),
                    "token" =>  $token
                ], "Login successfull");
            }
            
            throw new Exception("Invalid credentials");
            
        } catch (Exception $e) {

             return ApiResponse::error($e->getMessage());
            
        }
        
    }

    public function logout(Request $request){
        try {
            $user = Auth::user();
            $user->tokens()->delete();
            return ApiResponse::success([], "Logout successfull");
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }
    

}