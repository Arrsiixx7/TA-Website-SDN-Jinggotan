<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display all messages.
     */
    public function index(Request $request)
    {
        $query = Message::query()->latest();

        // Filter by read/unread
        if ($request->filled('filter')) {
            if ($request->filter === 'unread') {
                $query->where('is_read', false);
            } elseif ($request->filter === 'read') {
                $query->where('is_read', true);
            }
        }

        // Search by name or email
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $messages = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/messages', [
            'messages' => $messages,
            'filters' => [
                'filter' => $request->input('filter', 'all'),
                'search' => $request->input('search', ''),
            ],
            'unreadCount' => Message::where('is_read', false)->count(),
        ]);
    }

    /**
     * Display a specific message.
     */
    public function show($id)
    {
        $message = Message::findOrFail($id);

        return Inertia::render('admin/message-detail', [
            'message' => $message,
        ]);
    }

    /**
     * Mark a message as read.
     */
    public function markAsRead($id)
    {
        $message = Message::findOrFail($id);
        $message->update(['is_read' => true]);

        return back()->with('success', 'Pesan ditandai sudah dibaca');
    }
}
