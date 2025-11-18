<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;

use Exception;
use Illuminate\Http\Client\Events\ResponseReceived;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{


    /**
     * function: login
     * description: login user to the website
     *
     * @param Request $req $email $password
     * @return string $token
     */
    public function login(Request $req): JsonResponse
    {
        $validator = Validator::make($req->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|min:8'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Login Failed',
            ], 401);
        }

        try {
            $valid_admin = Admin::where('email', $req->email)->first();

            if ($valid_admin->password !== $req->password) {

                throw new Exception('Error');
            } else {

                $token = $valid_admin->createToken('admin_token')->plainTextToken;

                return response()->json([
                    'role' => 'admin',
                    'token' => $token
                ]);
            }
        } catch (Exception $e) {
        }


        try {
            $user = User::where('email', $req->email)->first();
            if (!$user) {
                throw new Exception('Email Doesnt Exist');
            }

            if (!Hash::check($req->password, $user->password)) {
                throw new Exception('Password Doesnt Match');
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Login Failed',
                'error' => $e->getMessage()
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login Successful',
            'role' => 'user',
            'token' => $token
        ], 200);
    }


    /**
     * function: register
     * description: registers user to the website
     *
     * @param Request $req $username $email $password
     * @return string $token
     */
    public function register(Request $req): JsonResponse
    {
        $validator = Validator::make($req->all(), [
            'username' => 'required|string|min:5',
            'email' => 'required|string|email',
            'password' => 'required|string|min:8'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'register Failed',
            ], 401);
        }

        try {
            $reg_user = User::create([
                'username' => strtolower(str_replace(' ', '', $req->username)),
                'email' => $req->email,
                'password' => Hash::make($req->password)
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Registration Failed',
                'error' => $e->getMessage()
            ], 401);
        }
        $token = $reg_user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message' => 'Register Successfully',
            'role' => 'user',
            'token' => $token
        ], 200);
    }

    public function logout(Request $req): JsonResponse
    {
        try {
            $req->user()->clearAccessToken()->delete();
            return response()->json([
                'message' => 'Logout Successfully',

            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error while logging out',
                'error' => $e->getMessage()
            ]);
        }
    }
}