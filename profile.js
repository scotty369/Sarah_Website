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
            <form id="edit-form">
                <label for="edit-name">Client Name:</label>
                <input type="text" id="edit-name" name="edit-name" value="${searchName}" required>
                
                <label for="edit-hair-description">Hair Description:</label>
                <textarea id="edit-hair-description" name="edit-hair-description" required>${result.hairDescription}</textarea>
                
                <label for="edit-services-rendered">Services Rendered:</label>
                <textarea id="edit-services-rendered" name="edit-services-rendered" required>${result.servicesRendered}</textarea>
                
                <label for="edit-cost">Appointment Cost:</label>
                <input type="number" id="edit-cost" name="edit-cost" value="${parseFloat(result.cost.replace('$', ''))}" required>
                
                <label for="edit-date">Service Date:</label>
                <input type="date" id="edit-date" name="edit-date" value="${result.date}" required>
                
                <button type="submit">Update Profile</button>
            </form>
        `;
        
        document.getElementById('edit-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect updated data
            const updatedName = document.getElementById('edit-name').value.trim();
            const updatedHairDescription = document.getElementById('edit-hair-description').value.trim();
            const updatedServicesRendered = document.getElementById('edit-services-rendered').value.trim();
            const updatedCost = parseFloat(document.getElementById('edit-cost').value.trim());
            const updatedDate = document.getElementById('edit-date').value;
            
            if (!updatedName || !updatedHairDescription || !updatedServicesRendered || isNaN(updatedCost) || updatedCost <= 0 || !updatedDate) {
                alert('Please fill out all fields correctly.');
                return;
            }
            
            // Update the profile in local storage
            profiles[updatedName] = {
                hairDescription: updatedHairDescription,
                servicesRendered: updatedServicesRendered,
                cost: `$${updatedCost.toFixed(2)}`,
                date: updatedDate
            };
            localStorage.setItem('clientProfiles', JSON.stringify(profiles));
            
            // Show success message and clear form
            document.getElementById('search-results').innerHTML = '<p>Profile updated successfully!</p>';
        });
    } else {
        document.getElementById('search-results').innerHTML = '<p>No client found.</p>';
    }
});
