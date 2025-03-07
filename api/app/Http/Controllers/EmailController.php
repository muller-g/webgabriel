<?php

namespace App\Http\Controllers;

use App\Mail\EmailContact;
use App\Models\Email;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'message' => 'required|string',
        ]);

        Mail::to($validated['email'])->send(new EmailContact($validated['name']));

        Email::create([
            'to' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'message' => $validated['message'],
        ]);

        return response()->json(['message' => 'E-mail enviado com sucesso!']);
    }
}
