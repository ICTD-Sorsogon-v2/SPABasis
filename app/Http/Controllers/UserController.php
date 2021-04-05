<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\UserPostRequest;
class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function getAuthUser(): User
    {
        return auth::user();
    }

    public function getAllUsers(): Collection
    {
        // abort_if(auth()->user()->role_id != 1, 403);
        return User::all();
    }

    public function createOrUpdate(UserPostRequest $request) {
        $user = User::updateOrCreate(
            ['id' => auth::user()->id],
            $request->validated()
        );
        return $user;
    }

}