<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class DeveloperInfo extends Model
{
    protected $guarded = [];
    protected $table = 'developer_info';

    public function file() : HasOne
    {
        return $this->hasOne(File::class, 'id', 'file_id');
    }
}
