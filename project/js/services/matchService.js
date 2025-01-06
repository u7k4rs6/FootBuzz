// Match data service
import { API_KEY, API_BASE_URL } from '../config.js';
import { logError, isValidResponse } from '../utils/errorHandler.js';
import { fallbackMatches } from '../data/fallbackData.js';

export async function fetchMatches() {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
        console.warn('[FootBuzz] No API key provided. Using fallback data.');
        return fallbackMatches;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/matches`, {
            headers: {
                'X-Auth-Token': API_KEY
            }
        });
        
        if (!isValidResponse(response)) {
            throw new Error(`API returned status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.matches.map(match => ({
            team1: match.homeTeam.name,
            team2: match.awayTeam.name,
            score: `${match.score.fullTime.home ?? '-'} - ${match.score.fullTime.away ?? '-'}`,
            date: new Date(match.utcDate).toLocaleDateString()
        }));
    } catch (error) {
        logError('Match Service', error);
        return fallbackMatches;
    }
}