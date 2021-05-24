<?php

namespace App\Http\Controllers\Api\Report\ADV;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportAdvCollection;
use App\Models\ReportAdv;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportADVController extends Controller
{
    public function index()
    {
        $user = request()->user(); //get user login

        $start = Carbon::now()->startOfMonth()->format('Y-m-d H:i:s');
        $end = Carbon::now()->endOfMonth()->format('Y-m-d H:i:s');
        $reports = ReportAdv::where('user_id', $user->id)->orderBy('created_at', 'DESC');
        if (request()->date != '') {
            $date = explode(" " ,request()->date);
            $start = Carbon::parse($date[0])->format('Y-m-d') .'%00:00:01';
            $end = Carbon::parse($date[1])->format('Y-m-d') . '%23:59:59';
            $reports = $reports->whereBetween('created_at', [$start,$end]);
        }
        return new ReportAdvCollection($reports->paginate(10));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'result_dashboard' => 'nullable',
            'cpr'              => 'nullable',
            'cp_wa'            => 'nullable',
            'amount_spent'     => 'nullable',
            'keterangan'       => 'nullable'
        ]);

        $user = request()->user(); //get user id

        ReportAdv::create([
            'user_id'          => $user->id,
            'result_dashboard' => $request->result_dashboard,
            'cpr'              => $request->cpr,
            'cp_wa'            => $request->cp_wa,
            'amount_spent'     => $request->amount_spent,
            'keterangan'       => $request->keterangan
        ]);

        return response()->json(['status' => 'success'], 200);
    }
}
