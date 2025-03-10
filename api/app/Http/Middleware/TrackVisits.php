<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Visit;
use Jenssegers\Agent\Agent;
use Stevebauman\Location\Facades\Location;

class TrackVisits
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $agent = new Agent();
        $ip = $request->ip();

        // Buscar localização (usando o pacote stevebauman/location)
        $position = Location::get($ip);

        Visit::create([
            'ip' => $ip,
            'country' => $position?->countryName,
            'city' => $position?->cityName,
            'region' => $position?->regionName,
            'browser' => $agent->browser(),
            'os' => $agent->platform(),
            'device' => $agent->device(),
            'url' => $request->fullUrl(),
            'referrer' => $request->headers->get('referer'),
            'user_agent' => $request->userAgent(),
            'user_id' => Auth::id(),
            'visited_at' => now(),
        ]);

        return $next($request);
    }
}
