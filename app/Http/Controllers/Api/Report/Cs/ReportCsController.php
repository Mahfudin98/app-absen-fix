<?php

namespace App\Http\Controllers\Api\Report\Cs;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportCsCollection;
use App\Models\ReportCs;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportCsController extends Controller
{
    public function index()
    {
        $user = request()->user();
        $reports = ReportCs::with(['user'])->where('user_id', $user->id)->orderBy('created_at', 'DESC');
        return new ReportCsCollection($reports->paginate(10));
    }

    public function filter()
    {
        $user = request()->user();
        $start = Carbon::now()->startOfMonth()->format('Y-m-d H:i:s');
        $end = Carbon::now()->endOfMonth()->format('Y-m-d H:i:s');

        if (request()->date != '') {
            $date = explode(' - ' ,request()->date);
            $start = Carbon::parse($date[0])->format('Y-m-d') . ' 00:00:01';
            $end = Carbon::parse($date[1])->format('Y-m-d') . ' 23:59:59';
        }

        $reports = ReportCs::with(['user'])->where('user_id', $user->id)->whereBetween('created_at', [$start, $end]);
        return new ReportCsCollection($reports->paginate(10));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'chat' => 'required',
            'lead_masuk' => 'required',
            'order' => 'required',
            'jml_transaksi' => 'required',
            'omset' => 'required',
            'detail_order' => 'required'
        ]);

        $user = request()->user();

        ReportCs::create([
            'user_id' => $user->id,
            'chat' => $request->chat,
            'lead_masuk' => $request->lead_masuk,
            'order' => $request->order,
            'jml_transaksi' =>$request->jml_transaksi,
            'omset' => $request->omset,
            'detail_order' => $request->detail_order,
            'keterangan' => $request->keterangan
        ]);
        return response()->json(['status' => 'success'], 200);
    }
}
