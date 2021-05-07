<?php

namespace App\Http\Controllers\Api\Project;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectCollection;
use App\Models\Project;
use App\Models\TaskProject;
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

    // controller for dev
    public function storeDev(Request $request)
    {
        $this->validate($request, [
            'project_name' => 'required|string|max:100',
            'description'  => 'nullable'
        ]);

        $user = request()->user();

        Project::create([
            'user_id' => $user->id,
            'position_id' => $user->position_id,
            'project_name' => $request->project_name,
            'slug' => $request->project_name,
            'description' => $request->description,
            'progress' => 0,
            'status' => 0,
        ]);
        return response()->json(['status' => 'success'], 200);
    }

    public function viewDev($slug)
    {
        $project = Project::where('slug', $slug)->first();
        $tasks = TaskProject::where('project_id', $project->id)->get();
        return response()->json(['status' => 'success', 'data' => $tasks]);
    }

    public function viewProjectDev($slug)
    {
        $project = Project::where('slug', $slug)->first();
        return response()->json(['status' => 'success', 'data' => $project]);
    }

    public function update(Request $request, $slug)
    {
        $this->validate($request, [
            'project_name' => 'nullable',
            'description'  => 'nullable'
        ]);
        $project = Project::where('slug', $slug)->first();
        $project->update([
            'project_name' => $request->project_name,
            'description' => $request->description,
            'progress' => $request->progress,
        ]);
        return response()->json(['status' => 'success'], 200);
    }
}
