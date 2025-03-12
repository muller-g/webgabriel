<?php

namespace App\Http\Controllers;

use App\Models\Avaliations;
use Illuminate\Http\Request;

class AvaliationsController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        Avaliations::create([
            'name' => $validated['name'],
            'message' => $validated['message'],
        ]);

        return response()->json(['message' => 'Avaliação enviada com sucesso!']);
    }
    public function index()
    {
        $avaliations = Avaliations::where('accepted', true)->get();

        return response()->json($avaliations);
    }

    public function toAccept()
    {
        $avaliations = Avaliations::get();

        return response()->json($avaliations);
    }

    public function approveOrDecline(Request $request, $id)
    {
        Avaliations::where('id', $id)->update(['accepted' => $request->get('accepted')]);

        return response()->json(['message' => 'Atualizado com sucesso!']);
    }
}
