const btnSearch = document.querySelector('.search-btn');
const btnClear = document.querySelector('.clear-btn');
const searchContainer = document.querySelector('.searchCondition');

function searchDestination() {
    const input = document.getElementById('destinationInput').value.toLowerCase().trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    searchContainer.style.display = 'none'; // hide by default

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
        let found = false;

        //Match by country name
        const matchedCountry = data.countries.find(country =>
            country.name.toLowerCase().includes(input)
        );
        if (matchedCountry) {
            matchedCountry.cities.forEach(city => {
            const cityDiv = document.createElement('div');
            cityDiv.classList.add('city');
            cityDiv.innerHTML = `
                <h3>${city.name}</h3>
                <img src="${city.imageUrl}" alt="${city.name}" width="200">
                <p>${city.description}</p>
            `;
            resultDiv.appendChild(cityDiv);
            });
            found = true;
        }

        //Match by "beach"/"beaches" or beach names
        if (input.includes("beach")) {
            data.beaches.forEach(beach => {
            const beachDiv = document.createElement('div');
            beachDiv.classList.add('city');
            beachDiv.innerHTML = `
                <h3>${beach.name}</h3>
                <img src="${beach.imageUrl}" alt="${beach.name}" width="200">
                <p>${beach.description}</p>
            `;
            resultDiv.appendChild(beachDiv);
            });
            found = true;
        } else {
            data.beaches
            .filter(beach => beach.name.toLowerCase().includes(input))
            .forEach(beach => {
                const beachDiv = document.createElement('div');
                beachDiv.classList.add('city');
                beachDiv.innerHTML = `
                <h3>${beach.name}</h3>
                <img src="${beach.imageUrl}" alt="${beach.name}" width="200">
                <p>${beach.description}</p>
                `;
                resultDiv.appendChild(beachDiv);
                found = true;
            });
        }

        //Match by "temple"/"temples" or temple names
        if (input.includes("temple")) {
            data.temples.forEach(temple => {
            const templeDiv = document.createElement('div');
            templeDiv.classList.add('city');
            templeDiv.innerHTML = `
                <h3>${temple.name}</h3>
                <img src="${temple.imageUrl}" alt="${temple.name}" width="200">
                <p>${temple.description}</p>
            `;
            resultDiv.appendChild(templeDiv);
            });
            found = true;
        } else {
            data.temples
            .filter(temple => temple.name.toLowerCase().includes(input))
            .forEach(temple => {
                const templeDiv = document.createElement('div');
                templeDiv.classList.add('city');
                templeDiv.innerHTML = `
                <h3>${temple.name}</h3>
                <img src="${temple.imageUrl}" alt="${temple.name}" width="200">
                <p>${temple.description}</p>
                `;
                resultDiv.appendChild(templeDiv);
                found = true;
            });
        }

        //Nothing matched
        /*if (!found) {
            resultDiv.innerHTML = 'Destination not found.';
        }*/

        if (found) {
            searchContainer.style.display = 'block'; // show container when something found
        } else {
            resultDiv.innerHTML = 'Destination not found.';
            searchContainer.style.display = 'block'; // show panel with message
        }

        })
        .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
        searchContainer.style.display = 'block';
        });
}

// Attach event listeners
btnSearch.addEventListener('click', searchDestination);
btnClear.addEventListener('click', () => {
    document.getElementById('destinationInput').value = '';
    document.getElementById('result').innerHTML = '';
    searchContainer.style.display = 'none'; // hide again when cleared
});
