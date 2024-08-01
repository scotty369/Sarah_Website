document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const searchName = document.getElementById('search-name').value.trim();
    
    // Basic validation
    if (!searchName) {
        document.getElementById('search-results').innerHTML = '<p>Please enter a client name.</p>';
        return;
    }
    
    // Retrieve client data from local storage
    const profiles = JSON.parse(localStorage.getItem('clientProfiles')) || {};
    
    const result = profiles[searchName];
    
    if (result) {
        document.getElementById('search-results').innerHTML = `
            <div>
                <strong>Client Name:</strong> ${searchName}
                <p><strong>Hair Description:</strong> ${result.hairDescription}</p>
                <p><strong>Services Rendered:</strong> ${result.servicesRendered}</p>
                <p><strong>Appointment Cost:</strong> ${result.cost}</p>
            </div>
        `;
    } else {
        document.getElementById('search-results').innerHTML = '<p>No client found.</p>';
    }
});
