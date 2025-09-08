// Example: Connect to backend to calculate emissions
async function calculateEmissions(data) {
    try {
        const res = await fetch('http://localhost:5000/api/buyer/calculate-emissions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (res.ok) {
            // Use result in frontend
            console.log('Emissions calculated:', result);
        } else {
            alert(result.message || 'Calculation failed');
        }
    } catch (err) {
        alert('Error connecting to backend');
    }
}