document.getElementById('client-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Collect form data
    const name = document.getElementById('name').value.trim();
    const hairDescription = document.getElementById('hair-description').value.trim();
    const servicesRendered = document.getElementById('services-rendered').value.trim();
    const cost = parseFloat(document.getElementById('cost').value.trim());
    
    // Basic validation
    const messageElement = document.getElementById('message');
    if (!name || !hairDescription || !servicesRendered || isNaN(cost) || cost <= 0) {
        messageElement.innerText = 'Please fill out all fields correctly.';
        messageElement.style.color = 'red';
        return;
    }
    
    // Log the collected data (for development purposes)
    console.log({
        name,
        hairDescription,
        servicesRendered,
        cost
    });
    
    // Simulate saving data to local storage
    let profiles = JSON.parse(localStorage.getItem('clientProfiles')) || {};
    profiles[name] = {
        hairDescription,
        servicesRendered,
        cost: `$${cost.toFixed(2)}`
    };
    localStorage.setItem('clientProfiles', JSON.stringify(profiles));
    
    // Show success message
    messageElement.innerText = 'Profile saved successfully!';
    messageElement.style.color = 'green';
    
    // Clear form fields
    document.getElementById('client-form').reset();
});
