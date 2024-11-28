const waterSources = [
    { name: "Water Source 1", url: "./water/page1.html" },  
    { name: "Water Source 2", url: "./water/page2.html" }, 
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

            resultButton.addEventListener('click', function () {
                // Ensure the window location URL is correct
                window.location.href = "../water/page1.html";  
            });

            resultsContainer.appendChild(resultButton);
        });
    }
});
