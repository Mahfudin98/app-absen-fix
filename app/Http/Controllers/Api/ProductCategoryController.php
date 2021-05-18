<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductCategoryCollection;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    public function index()
    {
        $category = ProductCategory::orderBy('created_at', 'DESC');
        if (request()->q != '') {
            $category = $category->where('name', 'LIKE', '%' . request()->q . '%');
        }
        return new ProductCategoryCollection($category->paginate(10));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:100',
        ]);

        ProductCategory::create([
            'name' => $request->name,
            'slug' => $request->name,
        ]);
        return response()->json(['status' => 'success'], 200);
    }

    public function listCategory()
    {
        $category = ProductCategory::all();
        return new ProductCategoryCollection($category);
    }

    public function listProductType()
    {
        $product = ProductCategory::with(['productType'])->get();
        return new ProductCategoryCollection($product);
    }
}
