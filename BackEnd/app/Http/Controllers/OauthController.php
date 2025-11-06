<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;


class OauthController extends Controller
{

    /**
     * Functoin: googleLogin
     * Description: redirect to google login
     * @param NA
     * @return void
     */
    public function googleLogin()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }


    /**
     * Function: googleAuthentication
     * Deescription: The function with authenticate the user with google
     * @param NA
     * @return void
     */

    public function googleAuthentication()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();


            $user = User::where('oauth_id', $googleUser->id)->first();

            if ($user) {
                $token = $user->createToken('auth_token')->plainTextToken;
                return redirect()->away('http://localhost:5173/dashboard?token=' . $token);
            } else {
                $user = User::create([
                    'username' => strtolower(str_replace(' ', '', $googleUser->name)),
                    'email' => $googleUser->email,
                    'oauth_id' => $googleUser->id,
                    'password' => 'password@123'
                ]);

                $token = $user->createToken('auth_token')->plainTextToken;
                return redirect()->away('http://localhost:5173/dashboard?token=' . $token);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Authentication failed', 'details' => $e->getMessage()], 401);
        }
    }

    /**
     * Function: githubLogin
     * Description: Login with Github
     * @param NA
     * @return void
     */
    public function githubLogin()
    {
        return Socialite::driver('github')->stateless()->redirect();
    }


    /**
     * Function: githubAuthentication
     * Description: Login with Github
     * @param NA
     * @return void
     */
    public function githubAuthentication()
    {
        try {
            $githubUser = Socialite::driver('github')->stateless()->user();


            $user = User::where('oauth_id', $githubUser->id)->first();

            if ($user) {
                $token = $user->createToken('auth_token')->plainTextToken;
                return redirect()->away('http://localhost:5173/dashboard?token=' . $token);
            } else {
                $user = User::create([
                    'username' => strtolower(str_replace(" ", '', $githubUser->name)),
                    'email' => $githubUser->email,
                    'oauth_id' => $githubUser->id,
                    'password' => 'password@123'
                ]);

                $token = $user->createToken('auth_token')->plainTextToken;
                return redirect()->away('http://localhost:5173/dashboard?token=' . $token);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Authentication failed', 'details' => $e->getMessage()], 401);
        }
    }
}
