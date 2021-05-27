<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AbsentCollection;
use App\Models\Absent;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AbsentController extends Controller
{
    public function index()
    {
        $start = Carbon::now()->startOfMonth()->format('Y-m-d H:i:s');
        $end = Carbon::now()->endOfMonth()->format('Y-m-d H:i:s');
        $absen = Absent::with(['user'])->orderBy('created_at', 'DESC');
        if (request()->date != '') {
            $date = explode(" " ,request()->date);
            $start = Carbon::parse($date[0])->format('Y-m-d');
            $end = Carbon::parse($date[1])->format('Y-m-d');
            $absen = $absen->whereBetween('date', [$start,$end]);
        }
        return new AbsentCollection($absen->paginate(100));
    }

    public function store(Request $request)
    {
        $user = request()->user();
        $date = Carbon::now()->format('Y-m-d');
        $time = Carbon::now()->format('H:i:s');
        $absen = new Absent;

        if ($time <= '08:30:00') {
            $info = 0;
        } elseif ($time <= '13:00:00') {
            $info = 1;
        } elseif ($time >= '13:00:00') {
            $info = 2;
        }

        $absen->create([
            'user_id'    => $user->id,
            'date'       => $date,
            'time_in'    => $time,
            'keterangan' => $info,
            'note'       => $request->note
        ]);

        return response()->json(['status' => 'success']);
    }
}
