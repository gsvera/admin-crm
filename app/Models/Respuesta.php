<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Respuesta extends Model
{
    use HasFactory;

    public $error = false;
    public $message = "";
    public $data = [];

    public function getResult()
    {
        $arr = ["error" => $this->error, "message" => $this->message, "data" => $this->data];
        return $arr;
    }
    public function setResult($data)
    {
        $this->error = $data["error"];
        $this->message = $data["message"];
        $this->data = $data["data"];
    }
}
