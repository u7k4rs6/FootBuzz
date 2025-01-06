import { fetchMatches } from './js/services/matchService.js';
import { fetchNews } from './js/services/newsService.js';
import { createMatchCard, createNewsCard } from './js/ui.js';
import { initializeNavigation } from './js/navigation.js';

// Initialize navigation
initializeNavigation();

// Populate matches
async function initializeMatches() {
    const matchContainer = document.querySelector('.match-container');
    const matches = await fetchMatches();
    matchContainer.innerHTML = '';
    matches.forEach(match => {
        matchContainer.appendChild(createMatchCard(match));
    });
}

// Populate news
async function initializeNews() {
    const newsContainer = document.querySelector('.news-container');
    const news = await fetchNews();
    newsContainer.innerHTML = '';
    news.forEach(item => {
        newsContainer.appendChild(createNewsCard(item));
    });
}

// Initialize data
initializeMatches();
initializeNews();

// Refresh match data every 5 minutes
setInterval(initializeMatches, 5 * 60 * 1000);