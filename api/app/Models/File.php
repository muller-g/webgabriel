<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    protected $guarded = [];

    public function developer_info() : BelongsTo
    {
        return $this->belongsTo(DeveloperInfo::class, 'file_id', 'id');
    }
}
