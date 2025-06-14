// Function to update the query parameters in the URL
function updateQueryString(key, value) {
    const url = new URL(window.location);
    if (key && value) {
        url.searchParams.set('key', key);
        url.searchParams.set('value', value);
    } else {
        // If one of the inputs is empty, remove it from the URL
        url.searchParams.delete('key');
        url.searchParams.delete('value');
    }
    window.history.replaceState({}, '', url);
}

// Event listener for key input field
document.getElementById('keyInput').addEventListener('input', function () {
    const key = this.value;
    const value = document.getElementById('valueInput').value;
    updateQueryString(key, value);
});

// Event listener for value input field
document.getElementById('valueInput').addEventListener('input', function () {
    const value = this.value;
    const key = document.getElementById('keyInput').value;
    updateQueryString(key, value);
});

// Event listener for API request button
document.getElementById('sendApiRequest').addEventListener('click', function() {
    const key = document.getElementById('keyInput').value;
    const value = document.getElementById('valueInput').value;

    if (key && value) {
        const apiUrl = `https://httpbin.org/get?key=${key}&value=${value}`;

        // Send the GET request
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log('API Response:', data);
            })
            .catch(error => {
                console.error('Error making the API request:', error);
            });
    } else {
        alert("Please enter both key and value.");
    }
});
