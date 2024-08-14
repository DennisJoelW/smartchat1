<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatHistory extends Model
{
    use HasFactory;

    protected $primaryKey = 'chatid'; // Specify the custom primary key

    protected $fillable = ['user_id', 'date', 'questions_answers'];

    protected $casts = [
        'questions_answers' => 'array',
    ];

    public function smartUser()
    {
        return $this->belongsTo(SmartUser::class, 'user_id');
    }
}
