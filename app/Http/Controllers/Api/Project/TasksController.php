<?php

namespace App\Http\Controllers\Api\Project;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    public function addTasksDev(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:100',
            'status' => 'required'
        ]);
    }
}
