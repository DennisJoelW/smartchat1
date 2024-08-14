<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('chat_histories', function (Blueprint $table) {
            $table->id('chatid'); // Chat ID (auto-incrementing primary key)
            $table->foreignId('user_id')->constrained('smart_user')->onDelete('cascade'); // Foreign key referencing smart_user table
            $table->timestamp('date'); // Date of the chat
            $table->json('questions_answers'); // JSON column to store array of questions and answers
            $table->timestamps(); // Created and updated timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('chat_histories');
    }
};
