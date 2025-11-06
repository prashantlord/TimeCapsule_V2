<?php

namespace App\Http\Controllers;

use App\Models\PrivateCapsules;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PrivateCapsuleController extends Controller
{

    /**
     * function: fetch
     * description: take user_id from user and fetch their private capsules
     *
     * @param Request $req $email $password
     * @return array $locked_capsules $unlocked_capsules $images (only images of capsules with open_status true)
     */
    public function fetch(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'user_id' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'User detail is not valid.'
            ], 422);
        }

        try {
            $locked_capsules = PrivateCapsules::where('user_id', $req->user_id)->where('open_status', 0)->get();
            $unlocked_capsules = PrivateCapsules::where('user_id', $req->user_id)->where('open_status', 1)->get();
            $images = PrivateCapsules::where('user_id', $req->user_id)->where('open_status', 1)
                ->with('image')
                ->get();

            return response()->json([
                'locked_capsule' => $locked_capsules,
                'unlocked_capsule' => $images
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error While Fetching User Data.',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function create(Request $req)
    {
        return response()->json([
            'message' => 'works'
        ], 200);
    }
}
