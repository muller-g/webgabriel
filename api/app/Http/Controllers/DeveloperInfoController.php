<?php

namespace App\Http\Controllers;

use App\Models\DeveloperInfo;
use Illuminate\Http\Request;
use function App\Helpers\uploadFile;

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

                $fileId = uploadFile($file);
            }

            if(isset($data['description']) && $data['description']){
                $developerInfo->description = $data['description'];
            }

            $developerInfo->file_id = $fileId;
            $developerInfo->update();

            return response()->json([ 'message' => 'Informações atualizadas com sucesso!' ]);
        } catch (\Exception $e) {
            return response()->json([ 'message' => $e->getMessage() ]);
        }
    }

    public function index()
    {
        $developerInfo = DeveloperInfo::with('file')->where('id', 1)->first();

        return response()->json($developerInfo);
    }
}
