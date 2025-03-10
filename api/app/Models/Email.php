<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Email extends Model
{
    protected $guarded = [];

    public function reply() : HasOne
    {
        return $this->hasOne(Email::class, 'reply_id', 'id');
    }
}
