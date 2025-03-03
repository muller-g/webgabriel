<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Link extends Model
{
    protected $guarded = [];

    public function file(): belongsTo
    {
        return $this->belongsTo(File::class, 'file_id');
    }
}
