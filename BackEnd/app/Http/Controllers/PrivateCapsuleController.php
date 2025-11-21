<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\PrivateCapsules;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use function Symfony\Component\String\s;

class PrivateCapsuleController extends Controller
{
    /**
     * function: fetch
     * description: take user_id from user and fetch their private capsules
     *
     * @param  Request  $req  $email $password
     * @return array $locked_capsules $unlocked_capsules $images (only images of capsules with open_status true)
     */
    public function fetch(Request $req): JsonResponse
    {
        $validator = Validator::make($req->all(), [
            'user_id' => 'required|string',
            'status' =>  'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'User detail is not valid.',
            ], 400);
        }

        try {

            switch ($req->status) {
                case "locked":
                    $locked_capsules = PrivateCapsules::where('user_id', $req->user_id)->where('open_status', 0)->with('image')->get();
                    return response()->json([
                        'locked_capsule' => $locked_capsules,
                        'unlocked_capsule' => []
                    ], 200);

                case "unlocked":
                    $unlocked_capsules = PrivateCapsules::where('user_id', $req->user_id)->where('open_status', 1)
                        ->with('image')
                        ->get();
                    return response()->json([
                        'locked_capsule' => [],
                        'unlocked_capsule' => $unlocked_capsules,
                    ], 200);

                default:
                    $locked_capsules = PrivateCapsules::where('user_id', $req->user_id)->where('open_status', 0)->with('image')->get();
                    $unlocked_capsules = PrivateCapsules::where('user_id', $req->user_id)->where('open_status', 1)
                        ->with('image')
                        ->get();
                    return response()->json([
                        'locked_capsule' => $locked_capsules,
                        'unlocked_capsule' => $unlocked_capsules,
                    ], 200);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error While Fetching User Data.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function create(Request $req): JsonResponse
    {
        // Validate request data first
        $validator = Validator::make($req->all(), [
            'title'         => 'required|string|max:255',
            'message'       => 'required|string',
            'opening_date'  => 'required|date',
            'files.*'       => 'nullable|file|mimes:jpg,jpeg,png,webp',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Invalid data",
            ], 400);
        }

        DB::beginTransaction(); // Start transaction

        try {
            // Step 1: Create the capsule record
            $capsule = PrivateCapsules::create([
                "user_id"      => $req->user()->id,
                "title"        => $req->title,
                "message"      => $req->message,
                "opening_date" => $req->opening_date,
            ]);

            // Step 2: Store images (if any)
            if ($req->hasFile("files")) {
                foreach ($req->file("files") as $file) {

                    // 1. Get original filename without extension
                    $origName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

                    // Remove spaces & sanitize
                    $origName = preg_replace('/[^A-Za-z0-9_\-]/', '_', $origName);

                    // 2. Get extension
                    $extension = $file->getClientOriginalExtension();

                    // 3. Create timestamp (safe format)
                    $timestamp = now()->format("Y-m-d_H-i-s");

                    // 4. Final name
                    $fileName = $origName  . "_" . $timestamp . "." . $extension;

                    // 5. Store file using storeAs()
                    $path = $file->storeAs("private_capsules", $fileName, "public");

                    // 6. Save DB entry
                    Image::create([
                        "private_capsules_id" => $capsule->id,
                        "image_location" => $path,
                    ]);
                }
            }


            DB::commit(); // Everything successful

            return response()->json([
                "success" => true,
                "message" => "Private capsule created successfully",
                "data" => $capsule->load("image"),
            ], 200);
        } catch (Exception $e) {

            DB::rollBack(); // Undo DB changes

            return response()->json([
                "success" => false,
                "error" => $e->getMessage(),
                "message" => "Something went wrong while creating the capsule."
            ], 400);
        }
    }


    public function update(Request $req): bool|JsonResponse
    {
        $validator = Validator::make($req->all(), [
            'private_capsules_id' => "string|required",
            'open_date' => "required|date"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Invalid data",
            ], 400);
        }


        try {
            $upd_details = PrivateCapsules::where('user_id', $req->user()->id)->where('id', $req->private_capsules_id)->update([
                "open_status" => true,
                "open_date" => $req->open_date
            ]);

            return response()->json([
                'message' => "capsule Successfully updated",
                'dt' => $upd_details
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => "error while updating the user details",
                "error" => $e->getMessage()
            ], 400);
        }
    }
}
