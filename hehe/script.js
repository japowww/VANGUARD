const waterSources = [
    { name: "Water Source 1", url: "/water/page1.html" },  
    { name: "Water Source 2", url: "/water/page2.html" }, 
];

document.getElementById('waterSourceForm').addEventListener('submit', function (event) {
    event.preventDefault();  

    const searchQuery = document.getElementById('searchInput').value.toLowerCase();

    const results = waterSources.filter(source => source.name.toLowerCase().includes(searchQuery));

    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';  

    if (results.length === 0) {
        resultsContainer.innerHTML = 'No water sources found.';
    } else {
        results.forEach(source => {
            const resultButton = document.createElement('button');
            resultButton.classList.add('btn', 'btn-link', 'd-block', 'my-2');
            resultButton.textContent = source.name;
            resultButton.setAttribute('data-url', source.url);  

            // Create an anchor tag dynamically
            const link = document.createElement('a');
            link.href = source.url;  // Set the href to the page URL
            link.style.display = "none";  // Hide the link
            resultButton.appendChild(link);  // Append the link to the button

            resultButton.addEventListener('click', function () {
                // Simulate a click on the link
                link.click();  
            });

            resultsContainer.appendChild(resultButton);
        });
    }
});