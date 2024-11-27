class LeafletMap {
    constructor(containerId, center, zoom) {
        this.map = L.map(containerId, {
            center: center,
            zoom: zoom,
            dragging: true, // Enable dragging
            scrollWheelZoom: true, // Enable zooming with the mouse wheel
            zoomControl: true, // Ensure zoom controls are visible
        });
        this.initTileLayer();
    }

    initTileLayer() {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
        }).addTo(this.map);
    }

    addMarker(lat, lng, message, imageUrl) {
        const popupContent = `
            <div style="text-align: center;">
                <h2>${message}</h2>
                <img 
                    src="${imageUrl}" 
                    alt="${message}" 
                    style="width: 150%; max-width: 200px; height: auto; border-radius: 8px; margin-top: 10px; cursor: pointer;"
                    onclick="showModal('${imageUrl}', '${message}')"
                >
            </div>
        `;
        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(popupContent);
    }
    

    loadMarkersFromJson(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                data.forEach((marker) => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message, marker.imageUrl);
                });
            })
            .catch((error) => console.error('Error loading markers:', error));
    }
}

const myMap = new LeafletMap('map', [8.331246,124.959404], 15);

myMap.loadMarkersFromJson('map1.json');
