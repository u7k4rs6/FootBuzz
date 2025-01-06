// API Service
import { API_KEY, API_BASE_URL } from './config.js';

export async function fetchMatches() {
    try {
        const response = await fetch(`${API_BASE_URL}/matches`, {
            headers: {
                'X-Auth-Token': '05a0d71553msh9923e84724becbep1d7b7cjsnbff25da81a54'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch matches');
        }
        
        const data = await response.json();
        return data.matches.map(match => ({
            team1: match.homeTeam.name,
            team2: match.awayTeam.name,
            score: `${match.score.fullTime.home ?? '-'} - ${match.score.fullTime.away ?? '-'}`,
            date: new Date(match.utcDate).toLocaleDateString()
        }));
    } catch (error) {
        console.error('Error fetching matches:', error);
        return [];
    }
}

export async function fetchNews() {
    try {
        const response = await fetch(`${API_BASE_URL}/competitions/CL/news`, {
            headers: {
                'X-Auth-Token': API_KEY
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        return data.articles.map(article => ({
            title: article.title,
            image: article.image || 'images/default-news.jpg',
            content: article.summary
        }));
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}