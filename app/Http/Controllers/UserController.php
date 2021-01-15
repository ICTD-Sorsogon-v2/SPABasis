<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;

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

}