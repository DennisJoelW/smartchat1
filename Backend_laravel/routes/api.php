<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SmartUserController;
use App\Http\Controllers\ChatHistoryController;

Route::post('/smart-users', [SmartUserController::class, 'store']); // Create a new user
Route::get('/smart-users/{id}', [SmartUserController::class, 'show']); // Get user by ID
Route::get('/smart-users/{id}/chat-history', [SmartUserController::class, 'getChatHistories']); // Get chat histories for a user
Route::get('/smart-users/username/{username}', [SmartUserController::class, 'getUserByUsername']); // Get user by username

Route::post('/chat-history', [ChatHistoryController::class, 'store']); // Create a new chat history
Route::get('/chat-history/{id}', [ChatHistoryController::class, 'show']); // Get chat history by chatID
Route::get('/chat-history/user/{userId}', [ChatHistoryController::class, 'indexByUser']); // Get chat history by userID

Route::put('/chat-history/{chatId}', [ChatHistoryController::class, 'updateChatHistory']); //Update chat history if user ask new question
Route::delete('/chat-history/{chatId}', [ChatHistoryController::class, 'deleteChat']); //Delete Chat