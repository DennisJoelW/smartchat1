<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SmartUser;

class SmartUserController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
        ]);

        $user = SmartUser::create($request->all());
        return response()->json($user, 201);
    }

    public function show($id)
    {
        $user = SmartUser::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function getChatHistories($id)
    {
        $user = SmartUser::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $chatHistories = $user->chatHistories;
        return response()->json($chatHistories);
    }

    public function getUserByUsername($username)
    {
        $user = SmartUser::where('username', $username)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }   
}
