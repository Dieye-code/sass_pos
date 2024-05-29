<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    use HasFactory, HasUlids;
    protected $guarded = ['id'];
    protected $keyType = 'string';
    public $incrementing = false;
}
