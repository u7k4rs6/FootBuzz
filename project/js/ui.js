// UI module
export function createMatchCard(match) {
    const matchCard = document.createElement('div');
    matchCard.className = 'match-card';
    matchCard.innerHTML = `
        <h3>${match.team1} vs ${match.team2}</h3>
        <p class="score">${match.score}</p>
        <p class="date">${match.date}</p>
    `;
    return matchCard;
}

export function createNewsCard(item) {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';
    newsCard.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="news-content">
            <h3>${item.title}</h3>
            <p>${item.content}</p>
        </div>
    `;
    return newsCard;
}