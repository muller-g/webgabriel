<?php

namespace App\Http\Controllers;

use App\Models\Avaliations;
use Illuminate\Http\Request;

class AvaliationsController extends Controller
{
    public function index()
    {
        $avaliations = Avaliations::where('accepted', true)->get();

        return response()->json($avaliations);
    }
}
