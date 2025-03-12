<?php

namespace App\Http\Controllers;

use App\Models\Email;
use App\Models\Visit;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class VisitsController extends Controller
{
    public function index()
    {
        $emails = Email::where('type', 'client')->count();
        $answerEmails = Email::where('type', 'system')->count();
        $diffIps = Visit::distinct('ip')->count();
        $country = Visit::distinct('country')->pluck('country');
        $region = Visit::distinct('region')->pluck('region');
        $city = Visit::distinct('city')->pluck('city');

        $visits = DB::table('visits')
            ->select('ip', 'visited_at')
            ->whereDate('visited_at', '>=', now()->subDays(30))
            ->orderBy('ip')
            ->orderBy('visited_at')
            ->get();

        $uniqueVisits = [];

        foreach ($visits as $visit) {
            $date = Carbon::parse($visit->visited_at)->toDateString();

            if (!isset($uniqueVisits[$date])) {
                $uniqueVisits[$date] = [];
            }

            if (!isset($uniqueVisits[$date][$visit->ip])) {
                $uniqueVisits[$date][$visit->ip] = [$visit->visited_at];
            } else {
                $lastVisit = Carbon::parse(end($uniqueVisits[$date][$visit->ip]));
                $currentVisit = Carbon::parse($visit->visited_at);

                if ($currentVisit->diffInHours($lastVisit) >= 1) {
                    $uniqueVisits[$date][$visit->ip][] = $visit->visited_at;
                }
            }
        }

        $visitCounts = [];

        foreach ($uniqueVisits as $date => $ips) {
            $visitCounts[] = [
                'day' => $date,
                'count' => array_sum(array_map(fn($visits) => count($visits), $ips))
            ];
        }

        usort($visitCounts, function ($a, $b) {
            return strtotime($a['day']) <=> strtotime($b['day']);
        });

        return response()->json([
            'visits' => $visitCounts,
            'emails' => $emails,
            'answer_emails' => $answerEmails,
            'diff_ips' => $diffIps,
            'country' => $country,
            'region' => $region,
            'city' => $city
        ]);
    }
}
