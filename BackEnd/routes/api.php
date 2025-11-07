<?php

use App\Http\Controllers\OauthController;
use App\Http\Controllers\PrivateCapsuleController;
use App\Http\Controllers\UserController;
use App\Models\Admin;
use Illuminate\Http\Client\Events\ResponseReceived;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:admin')->get('/admin', function (Request $request) {
    return $request->user(); // returns the authenticated admin
});



/**
 * UseCase: Rest API endpoints
 * Description: Login/ register/ logout/ getuser functions
 */
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);



/**
 * useCase: Oauthentication
 * Routes: http://127.0.0.1:8000/api/auth/google & http://127.0.0.1:8000/api/dashboard
 * Controller: OauthController
 */

Route::get('auth/google', [OauthController::class, 'googleLogin']);
Route::get('/dashboard', [OauthController::class, 'googleAuthentication']);

/**
 * useCase: Oauthentication
 * Routes: http://127.0.0.1:8000/api/auth/github & http://127.0.0.1:8000/api/githubAuth
 * Controller: OauthController
 */
Route::get('auth/github', [OauthController::class, 'githubLogin']);
Route::get('/githubAuth', [OauthController::class, 'githubAuthentication']);


/**
 * useCase: UserDate Fetch
 * Description: Fetch data from PrivateCapsules table from the front end through rest API
 * Routes: http://127.0.0.1:8000/api/private & http://127.0.0.1:8000/api/auth/private/create
 * Controller: PrivateCapsuleController
 */

Route::post('/private/fetch', [PrivateCapsuleController::class, 'fetch']);
Route::post('/private/create', [PrivateCapsuleController::class, 'create']);



/**
 * UseCase: check if there is data
 * Description: Check if the data if beinig fetched properly
 */
Route::get('/check', function () {


    try {
        $admin = Admin::where('email', 'rubyprashant14@gmail.com')->first();
        if ($admin->password === 'prashant@14') {
            return response()->json([
                'role' => 'admin'
            ]);
        } else {
            throw new Exception('Unknown');
        }
    } catch (Exception $e) {
        return response()->json([
            'error' => 'error'
        ]);
    }
});
