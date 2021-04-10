<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PositionCollection;
use App\Models\Position;
use Illuminate\Http\Request;

class PositionsController extends Controller
{
    public function index()
    {
        $positions = Position::orderBy('created_at', 'DESC');
        if (request()->q != '') {
            $positions = $positions->where('name', 'LIKE', '%' . request()->q . '%');
        }
        return new PositionCollection($positions->paginate(10));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:100',
            'status' => 'required'
        ]);

        Position::create([
            'name' => $request->name,
            'slug' => $request->name,
            'status' => $request->status
        ]);
        return response()->json(['status' => 'success'], 200);
    }

    public function edit($id)
    {
        $position = Position::find($id);
        return response()->json(['status' => 'success', 'data' => $position], 200);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|string|max:100',
            'status' => 'required'
        ]);

        $position = Position::find($id);
        $position->update([
            'name' => $request->name,
            'slug' => $request->name,
            'status' => $request->status
        ]);
        return response()->json(['status' => 'success'], 200);
    }

    public function destroy($id)
    {
        $positions = Position::find($id);
        $positions->delete();
        return response()->json(['status' => 'success'], 200);
    }

}
