<?php

namespace App\Http\Controllers\Api\Report\Cs;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportCsCollection;
use App\Models\Order;
use App\Models\ReportAdv;
use App\Models\ReportCs;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class ReportCsController extends Controller
{
    public function index()
    {
        $user = request()->user(); //get user login

        $start = Carbon::now()->startOfMonth()->format('Y-m-d H:i:s');
        $end = Carbon::now()->endOfMonth()->format('Y-m-d H:i:s');
        $reports = ReportCs::with(['order.productType', 'order.orderType'])->where('user_id', $user->id)->orderBy('created_at', 'DESC');
        if (request()->date != '') {
            $date = explode(" " ,request()->date);
            $start = Carbon::parse($date[0])->format('Y-m-d') .'%00:00:01';
            $end = Carbon::parse($date[1])->format('Y-m-d') . '%23:59:59';
            $reports = $reports->whereBetween('created_at', [$start,$end]);
        }
        return new ReportCsCollection($reports->paginate(10));
    }

    public function filter()
    {
        $user = request()->user();
        $reportCs = ReportCs::with(['user', 'order.productType'])->where('parent_id', $user->id)->get();
        return new ReportCsCollection($reportCs);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'chat' => 'required',
            'jml_transaksi' => 'required',
            'omset' => 'required',
            'keterangan' => 'nullable'
        ]);

        try {
            $data = $request->all();
            $user = request()->user();

            $reportcs = ReportCs::create([
                'user_id' => $user->id,
                'parent_id' => $user->parent_id,
                'chat' => $request->chat,
                'jml_transaksi' =>$request->jml_transaksi,
                'omset' => $request->omset,
                'keterangan' => $request->keterangan
            ]);

            $report = ReportCs::find($reportcs['id']);

            foreach ($data['order'] as $item => $value) {
                $data2 = array(
                    'user_id' => $user->id,
                    'product_type_id' => $data['product_type_id'][$item],
                    'order_type_id' => $data['order_type_id'][$item],
                    'report_cs_id' => $report->id,
                    'order' => $data['order'][$item]
                );
                $order = Order::create($data2);
            }

            return response()->json(['status' => 'success'], 200);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function maxlead()
    {
        $user = request()->user(); //get user login
        $start = Carbon::now()->startOfMonth()->format('Y-m-d H:i:s');
        $end = Carbon::now()->endOfMonth()->format('Y-m-d H:i:s');
        $max = ReportCs::where('parent_id', $user->id);
        if ($user->id != null) {
            $date = explode(" " ,Carbon::now());
            $start = Carbon::parse($date[0])->format('Y-m-d') .'%00:00:01';
            $end = Carbon::parse($date[1])->format('Y-m-d') . '%23:59:59';
            $max = $max->whereBetween('created_at', [$start,$end])->sum('chat');
        }
        return response()->json(['status' => 'success', 'data' => $max], 200);
    }

    public function chart()
    {
        $user = request()->user(); //get user login
        $chart = ReportCs::with(['user', 'order.productType'])->where('parent_id', $user->id)->get();
        // foreach ($chart as $value) {
        //     return response()->json(['status' => 'success', 'data' => $value->omset], 200);
        // }
        return response()->json(['status' => 'success', 'data' => $chart], 200);
    }
}
