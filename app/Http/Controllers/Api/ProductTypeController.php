<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductTypeCollection;
use App\Models\ProductType;
use Illuminate\Http\Request;

class ProductTypeController extends Controller
{
    public function index()
    {
        $product = ProductType::with(['productCategory'])->orderBy('created_at', 'DESC');
        if (request()->q != '') {
            $product = $product->where('name', 'LIKE', '%' . request()->q . '%');
        }
        return new ProductTypeCollection($product->paginate(10));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:100',
        ]);

        ProductType::create([
            'product_category_id' => $request->product_category_id,
            'name' => $request->name,
            'slug' => $request->name,
        ]);
        return response()->json(['status' => 'success'], 200);
    }
}
