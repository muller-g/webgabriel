<?php

namespace App\Helpers;

use App\Models\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

if (!function_exists('uploadFile')) {
    function uploadFile($file) {
        try {
            $fileRandName = Str::random(10) . '.' . $file->getClientOriginalExtension();

            $savedFile = File::create([
                'original_name' => $file->getClientOriginalName(),
                'name' => $fileRandName,
                'extension' => $file->getClientOriginalExtension(),
                'mime_type' => $file->getClientMimeType(),
                'path' => '/storage/files/' . $fileRandName,
            ]);

            Storage::disk('public')->put('files/' . $fileRandName, $file->getContent());

            return $savedFile->id;
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }
}
