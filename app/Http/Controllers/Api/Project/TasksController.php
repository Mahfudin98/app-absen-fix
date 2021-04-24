<?php

namespace App\Http\Controllers\Api\Project;

use App\Http\Controllers\Controller;
use App\Models\TaskProject;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    public function addTasksDev(Request $request)
    {
        $this->validate($request, [
            'to_do' => 'required|string|max:100',
        ]);

        TaskProject::create([
            'project_id' => $request->project_id,
            'to_do' => $request->to_do,
            'status' => 0
        ]);
        return response()->json(['status' => 'success'], 200);
    }

    public function deleteTaskdev($id)
    {
        $task = TaskProject::find($id);
        $task->delete();
        return response()->json(['status' => 'success'], 200);
    }

    public function updateTask(TaskProject $task)
    {
        $task->update([
            'status' => request()->has('status')
        ]);

        return response()->json(['status' => 'success'], 200);
    }
}
