<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('smart_user', function (Blueprint $table) {
            $table->id(); // User ID (auto-incrementing primary key)
            $table->string('username'); // Username
            $table->timestamps(); // Created and updated timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('smart_user');
    }
};
