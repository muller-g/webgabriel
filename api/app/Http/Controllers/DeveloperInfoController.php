<?php

namespace App\Http\Controllers;

use App\Models\DeveloperInfo;
use App\Models\Link;
use Illuminate\Http\Request;
use function App\Helpers\uploadFile;

class DeveloperInfoController extends Controller
{
    public function store(Request $request)
    {
        try {
            $data = $request->all();

            $developerInfo = DeveloperInfo::where('id', 1)->first();

            if($request->hasFile('file')) {
                $file = $request->file('file');
                $fileId = uploadFile($file);
                $developerInfo->file_id = $fileId;
            }

            if(isset($data['description']) && $data['description']){
                $developerInfo->description = $data['description'];
            }

            $developerInfo->update();

            return response()->json([ 'message' => 'Informações atualizadas com sucesso!' ]);
        } catch (\Exception $e) {
            return response()->json([ 'message' => $e->getMessage() ]);
        }
    }

    public function storeLinks(Request $request)
    {
        try {
            $data = $request->all();
            Link::truncate();
            $developerInfo = DeveloperInfo::where('id', 1)->first();

            $createdLink = Link::create([
                'url' => $data['url'],
                'title' => $data['title'],
                'developer_info_id' => $developerInfo->id,
            ]);

            if($request->hasFile('file')) {
                $file = $request->file('file');
                $fileId = uploadFile($file);
                $createdLink->file_id = $fileId;
            }

            $createdLink->update();

            return response()->json([ 'message' => 'Links atualizados com sucesso!' ]);
        } catch (\Exception $e) {
            return response()->json([ 'message' => $e->getMessage() ]);
        }
    }

    public function index()
    {
        $developerInfo = DeveloperInfo::with(['file', 'links.file'])->where('id', 1)->first();

        return response()->json($developerInfo);
    }
}
