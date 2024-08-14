<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class SmartUser extends Model
{
    protected $table = 'smart_user';
    protected $fillable = ['username'];

    // Define the relationship with ChatHistory
    public function chatHistories()
    {
        return $this->hasMany(ChatHistory::class, 'user_id');
    }
}
