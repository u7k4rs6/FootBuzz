// Error handling utilities
export function logError(context, error) {
    console.error(`[FootBuzz] ${context}:`, error.message || 'Unknown error');
}

export function isValidResponse(response) {
    return response && response.ok && response.status === 200;
}