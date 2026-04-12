<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\AdminNotification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'recipients' => 'required|array|min:1',
            'recipients.*' => 'exists:users,id',
        ]);

        $recipients = User::whereIn('id', $request->recipients)->get();
        $sentCount = 0;

        foreach ($recipients as $admin) {
            try {
                Mail::to($admin->email)->send(new AdminNotification(
                    $request->subject,
                    $request->message,
                    auth()->user()->name
                ));
                $sentCount++;
            } catch (\Exception $e) {
                // Continue sending to other recipients even if one fails
            }
        }

        return back()->with('success', "Email berhasil dikirim ke {$sentCount} admin");
    }
}
