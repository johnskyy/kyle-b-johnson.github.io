const sourceURL = "https://byui-cit230.github.io/weather/data/towndata.json";


async function getHomepageTowns() {
    var townInfo = await getTownData(sourceURL);
    // var townInfo = sourceURL;
    var townIndex = [5,6,1];
    var imageArray = [];
    
    for(i of townIndex){

        let index = townIndex[i];

        let card = document.createElement('section');
        let info = document.createElement('div');
        let townName = document.createElement('h2');
        let founding = document.createElement('p');
        let population = document.createElement('p');
        let motto = document.createElement('p');
        let rainfall = document.createElement('p');

        townName.textContent = townInfo.towns[i].name;
        motto.textContent = townInfo.towns[i].motto;
        founding.textContent = "Founded in " + townInfo.towns[i].yearFounded;
        population.textContent = "Population: " + townInfo.towns[i].currentPopulation;
        rainfall.textContent = "Average Rainfall: " + townInfo.towns[i].averageRainfall; 

        info.appendChild(townName);
        info.appendChild(motto);
        info.appendChild(founding);
        info.appendChild(population);
        info.appendChild(rainfall);
        card.appendChild(info);
        document.querySelector('div.town-cards').appendChild(card);
    }

    
    
}

/**
 * 
 * @param {URL} url 
 */
async function getTownData(url){
    return fetch(url)
        .then(function(response){
            return response.json();
        })
}
