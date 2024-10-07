let stations = [];

class Station {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;
        this.trains = 0;
    }

    addTrains(count) {
        this.trains += count;
        this.checkCapacity();
    }

    removeTrains(count) {
        if (this.trains >= count) {
            this.trains -= count;
        } else {
            alert(`Error: Not enough trains at ${this.name} to remove.`);
        }
        this.checkCapacity();
    }

    checkCapacity() {
        const stationElement = document.getElementById(this.name);
        if (this.trains > this.capacity) {
            stationElement.querySelector('.warning').innerText = "Warning: Capacity exceeded!";
        } else {
            stationElement.querySelector('.warning').innerText = "";
        }
        stationElement.querySelector('.train-count').innerText = `Trains: ${this.trains}`;
    }
}

function addStation() {
    const name = document.getElementById("station-name").value;
    const capacity = parseInt(document.getElementById("station-capacity").value);

    if (!name || isNaN(capacity)) {
        alert("Please enter valid station name and capacity.");
        return;
    }

    const station = new Station(name, capacity);
    stations.push(station);
    displayStation(station);
}

function displayStation(station) {
    const stationList = document.getElementById("station-list");
    const stationDiv = document.createElement("div");
    stationDiv.className = "station";
    stationDiv.id = station.name;

    stationDiv.innerHTML = `
        <h3>${station.name} (Capacity: ${station.capacity})</h3>
        <p class="train-count">Trains: 0</p>
        <p class="warning"></p>
        <div class="actions">
            <button onclick="addTrains('${station.name}', 1)">+1 Train</button>
            <button onclick="removeTrains('${station.name}', 1)">-1 Train</button>
        </div>
    `;

    stationList.appendChild(stationDiv);
}

function findStationByName(name) {
    return stations.find(station => station.name === name);
}

function addTrains(stationName, count) {
    const station = findStationByName(stationName);
    if (station) {
        station.addTrains(count);
    }
}

function removeTrains(stationName, count) {
    const station = findStationByName(stationName);
    if (station) {
        station.removeTrains(count);
    }
}
