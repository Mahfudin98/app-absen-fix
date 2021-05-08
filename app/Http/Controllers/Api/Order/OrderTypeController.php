<?php

namespace App\Http\Controllers\Api\Order;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderTypeCollection;
use App\Models\OrderType;
use Illuminate\Http\Request;

class OrderTypeController extends Controller
{
    public function index()
    {
        $type = OrderType::orderBy('created_at', 'DESC');
        if (request()->q != '') {
            $type = $type->where('name', 'LIKE', '%' . request()->q . '%');
        }
        return new OrderTypeCollection($type->paginate(10));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:100',
        ]);

        OrderType::create([
            'name' => $request->name,
            'slug' => $request->name,
        ]);
        return response()->json(['status' => 'success'], 200);
    }

    public function listType()
    {
        $type = OrderType::all();
        return new OrderTypeCollection($type);
    }
}
