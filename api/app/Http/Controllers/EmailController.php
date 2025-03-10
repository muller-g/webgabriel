<?php

namespace App\Http\Controllers;

use App\Mail\EmailAnswer;
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

    public function index(Request $request)
    {
        $emails = Email::where('type', 'client')->orderBy('created_at', 'desc')->get();

        return response()->json($emails);
    }

    public function get(String $id)
    {
        $email = Email::with('reply')->where('id', $id)->first();

        return response()->json($email);
    }

    public function sendAnswerEmail(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'message' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'to' => 'required|email',
            'id' => 'required|integer',
        ]);

        Mail::to($validated['to'])->send(new EmailAnswer($validated['name'], $validated['message'], $validated['subject']));

        Email::create([
            'to' => $validated['name'],
            'email' => $validated['to'],
            'phone' => $validated['phone'],
            'message' => $validated['message'],
            'type' => 'system',
            'reply_id' => $validated['id'],
        ]);

        Email::where('id', $validated['id'])->update([
           'answered' => true,
        ]);

        return response()->json(['message' => 'E-mail enviado com sucesso!']);
    }
}
