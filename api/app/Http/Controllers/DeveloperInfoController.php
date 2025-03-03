<?php

namespace App\Http\Controllers;

use App\Models\DeveloperInfo;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DeveloperInfoController extends Controller
{
    public function store(Request $request)
    {
        try {
            $fileId = null;
            $data = $request->all();

            $developerInfo = DeveloperInfo::where('id', 1)->first();

            if($request->hasFile('file')) {
                $file = $request->file('file');

                $fileId = $this->uploadFile($file);
            }

            if(isset($data['description']) && $data['description']){
                $developerInfo->description = json_encode($data['description']);
            }

            $developerInfo->file_id = $fileId;
            $developerInfo->save();

            return response()->json([ 'message' => 'Informações atualizadas com sucesso!' ]);
        } catch (\Exception $e) {
            return response()->json([ 'message' => $e->getMessage() ]);
        }
    }

    public function uploadFile($file)
    {
        try {
            $fileRandName = Str::random(10) . '.' . $file->getClientOriginalExtension();

            $savedFile = File::create([
                'original_name' => $file->getClientOriginalName(),
                'name' => $fileRandName,
                'extension' => $file->getClientOriginalExtension(),
                'mime_type' => $file->getClientMimeType(),
                'path' => '',
            ]);

            Storage::disk('public')->put('files/' . $fileRandName, $file->getContent());

            return $savedFile->id;
        } catch (\Exception $e) {
            return response()->json([ 'message' => $e->getMessage() ]);
        }
    }
}
