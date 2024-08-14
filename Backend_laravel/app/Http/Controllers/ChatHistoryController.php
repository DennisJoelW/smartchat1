<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChatHistory;

class ChatHistoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:smart_user,id',
            'date' => 'required|date',
            'questions_answers' => 'required|array',
        ]);

        $chatHistory = ChatHistory::create($request->all());
        return response()->json($chatHistory, 201);
    }


    public function show($id)
    {
        $chatHistory = ChatHistory::find($id);
        return response()->json($chatHistory);
    }

    
    public function indexByUser($userId)
    {
        $chatHistories = ChatHistory::where('user_id', $userId)->get();
        return response()->json($chatHistories);
    }


    public function updateChatHistory(Request $request, $chatId)
    {
    try {
        $chatHistory = ChatHistory::findOrFail($chatId);

        $questionsAnswers = $chatHistory->questions_answers;

        $newQuestionAnswer = [
            'question' => $request->input('question'),
            'answer' => $request->input('answer')
        ];

        $questionsAnswers[] = $newQuestionAnswer;

        $chatHistory->questions_answers = $questionsAnswers;

        $chatHistory->save();

        return response()->json([
            'message' => 'Chat history updated successfully',
            'chatHistory' => $chatHistory
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error updating chat',
            'error' => $e->getMessage()
        ], 500);
    }
    }

    public function addChat(Request $request)
    {
        try {
            $chatHistory = new ChatHistory;
            $chatHistory->user_id = $request->input('user_id');
            $chatHistory->date = now();
            $chatHistory->questions_answers = $request->input('questions_answers', []); 

            $chatHistory->save();

            return response()->json([
                'message' => 'New chat added successfully',
                'chatHistory' => $chatHistory
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error adding new chat',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteChat($chatId)
    {
    try {
        $chatHistory = ChatHistory::findOrFail($chatId);

        $chatHistory->delete();

        return response()->json([
            'message' => 'Chat deleted successfully'
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error deleting chat',
            'error' => $e->getMessage()
        ], 500);
    }
}

    
}
