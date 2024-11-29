// Abstract base class
class BaseMap {
    #containerId;
    #center;
    #zoom;

    constructor(containerId, center, zoom) {
        if (new.target === BaseMap) {
            throw new Error("BaseMap is an abstract class and cannot be instantiated directly.");
        }
        this.#containerId = containerId;
        this.#center = center;
        this.#zoom = zoom;
        this.map = null;
    }

    initializeMap() {
        throw new Error("initializeMap() must be implemented by a subclass.");
    }

    get containerId() {
        return this.#containerId;
    }

    get center() {
        return this.#center;
    }

    get zoom() {
        return this.#zoom;
    }

    addMarker(lat, lng, message, iconUrl, imageUrl) {
        throw new Error("addMarker() must be implemented by a subclass.");
    }

    loadMarkersFromJson(url) {
        throw new Error("loadMarkersFromJson() must be implemented by a subclass.");
    }
}

class LeafletMap extends BaseMap {
    constructor(containerId, center, zoom) {
        super(containerId, center, zoom);
        this.map = this.initializeMap();
    }

    initializeMap() {
        const map = L.map(this.containerId, {
            center: this.center,
            zoom: this.zoom,
            dragging: true,
            scrollWheelZoom: true,
            zoomControl: true,
        });
        this.#initTileLayer(map);
        return map;
    }

    #initTileLayer(map) {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
        }).addTo(map);
    }

    addMarker(lat, lng, message, iconUrl, imageUrl) {
        const customIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -30],
        });

        const popupContent = `
            <div style="text-align: center;">
                <h2>${message}</h2>
                <img 
                    src="${imageUrl}" 
                    alt="${message}" 
                    style="width: 150%; max-width: 200px; height: auto; border-radius: 8px; margin-top: 10px; cursor: pointer;"
                >
            </div>
        `;
        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
        marker.bindPopup(popupContent);
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                data.forEach((marker) => {
                    const iconUrl = this.#getIconUrl(marker.message);
                    this.addMarker(marker.latitude, marker.longitude, marker.message, iconUrl, marker.imageUrl);
                });
            })
            .catch((error) => console.error('Error loading markers:', error));
    }

    #getIconUrl(message) {
        if (message.toLowerCase().includes("peak") || message.toLowerCase().includes("mt.")) {
            return "../pics/mountain.png"; // Mountain icon
        } else if (message.toLowerCase().includes("trek")) {
            return "../pics/trail.png"; // Trail icon
        } else if (message.toLowerCase().includes("water")) {
            return "../pics/water.png"; // Water source icon
        } else if (message.toLowerCase().includes("trail")) {
            return "../pics/hiking.png"; // Generic trail icon
        } else {
            return "../pics/pin-point.png"; // Default icon
        }
    }
}

// Usage example
const myMap = new LeafletMap('map', [8.331246, 124.959404], 15);

// Load markers from your JSON file
myMap.loadMarkersFromJson('map1.json');
