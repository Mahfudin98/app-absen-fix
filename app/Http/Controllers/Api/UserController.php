<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollection;
use App\Models\Position;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with(['position'])->orderBy('created_at', 'DESC');
        if (request()->q != '') {
            $users = $users->where('name', 'LIKE', '%' . request()->q . '%');
        }
        $users = $users->paginate(10);
        return new UserCollection($users);
    }

    public function userLists()
    {
        $user = User::where('role', '!=', 3)->get();
        return new UserCollection($user);
    }

    public function getUserLogin()
    {
        $user = request()->user();
        $permissions = [];
        foreach (Permission::all() as $permission) {
            if (request()->user()->can($permission->name)) {
                $permissions[] = $permission->name;
            }
        }
        $user['permission'] = $permissions;
        $positions = Position::where('id', $user->position_id)->first();
        $positions = $positions->name;
        $user['position'] = $positions;
        return response()->json(['status' => 'success', 'data' => $user]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:150',
            'email' => 'required|email|unique:users,email',
            'alamat' => 'required|string',
            'phone'  => 'required',
            'password' => 'required|min:6|string',
            'position_id' => 'required|exists:positions,id',
            'gender'    => 'required',
            'image' => 'required|image'
        ]);

        DB::beginTransaction();
        try {
            $name = NULL;
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $name = $request->email . '-' . time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/employe', $name);
            }
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'alamat' => $request->alamat,
                'phone' => $request->phone,
                'password' => $request->password,
                'role' => $request->role,
                'image' => $name,
                'gender' => $request->gender,
                'position_id' => $request->position_id,
                'role' => 2,
                'status' => $request->status
            ]);
            DB::commit();
            return response()->json(['status' => 'success'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['status' => 'error', 'data' => $e->getMessage()], 200);
        }
    }

    public function edit($id)
    {
        $user = User::find($id);
        return response()->json(['status' => 'success', 'data' => $user], 200);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|string|max:150',
            'email' => 'required|email|',
            'alamat' => 'required|string',
            'phone'  => 'required',
            'password' => 'nullable',
            'position_id' => 'required|exists:positions,id',
            'image' => 'nullable'
        ]);

        try {
            $user = User::find($id);
            $password = $request->password != '' ? bcrypt($request->password):$user->password;
            $filename = $user->image;
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                File::delete(storage_path('app/public/employe/' . $filename));
                $filename = $request->email . '-' . time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/employe', $filename);
            }

            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'alamat' => $request->alamat,
                'phone' => $request->phone,
                'password' => $password,
                'image' => $filename,
                'position_id' => $request->position_id,
                'status' => $request->status
            ]);
            return response()->json(['status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'data' => $e->getMessage()], 200);
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);
        File::delete(storage_path('app/public/employe/' . $user->image));
        $user->delete();
        return response()->json(['status' => 'success']);
    }
}
