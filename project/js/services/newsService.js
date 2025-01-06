// News data service
import { API_KEY, API_BASE_URL } from '../config.js';
import { logError, isValidResponse } from '../utils/errorHandler.js';
import { fallbackNews } from '../data/fallbackData.js';

export async function fetchNews() {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
        console.warn('[FootBuzz] No API key provided. Using fallback data.');
        return fallbackNews;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/competitions/CL/news`, {
            headers: {
                'X-Auth-Token': API_KEY
            }
        });
        
        if (!isValidResponse(response)) {
            throw new Error(`API returned status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.articles.map(article => ({
            title: article.title,
            image: article.image || 'images/default-news.jpg',
            content: article.summary
        }));
    } catch (error) {
        logError('News Service', error);
        return fallbackNews;
    }
}