// Example: Connect to backend to get marketplace credits
async function fetchMarketplaceCredits() {
    try {
        const res = await fetch('http://localhost:5000/api/marketplace/credits');
        const credits = await res.json();
        if (res.ok) {
            // Use credits in frontend
            console.log('Marketplace credits:', credits);
        } else {
            alert(credits.message || 'Failed to fetch credits');
        }
    } catch (err) {
        alert('Error connecting to backend');
    }
}