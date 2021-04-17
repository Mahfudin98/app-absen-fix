<?php

namespace App\Http\Controllers\Api\Project;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectCollection;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $user = request()->user();
        $project = Project::with(['user','position'])->orderBy('created_at', 'DESC');
        if (request()->q != '') {
            $project = $project->where('project_name', 'LIKE', '%' . request()->q . '%');
        }
        if ($user->role != 0) {
            $project = $project->where('user_id', $user->id);
        }

        $project = $project->paginate(10);

        return new ProjectCollection($project);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'project_name' => 'required|string|max:100',
            'description'  => 'nullable'
        ]);

        Project::create([
            'user_id' => $request->user_id,
            'position_id' => $request->position_id,
            'project_name' => $request->project_name,
            'slug' => $request->project_name,
            'description' => $request->description,
            'status' => 0,
        ]);
        return response()->json(['status' => 'success'], 200);
    }
}
