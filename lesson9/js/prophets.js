const sourceURL = "https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json";

fetch(sourceURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing

    const individuals = jsonObject['prophets'];

    for (let i = 0; i < individuals.length; i++) {
        let card = document.createElement('section');
        let info = document.createElement('div');
        let h2 = document.createElement('h2');
        let bDaySub = document.createElement('p');
        let bPlaceSub = document.createElement('p');
        let imgSrc = document.createElement('img');
        let ordinal = '';
        
        switch(i){
            case 1:
                ordinal = 'st';
            case 2:
                ordinal = 'nd';
            case 3:
                ordinal = 'rd';
            default:
                ordinal = "th";
        }


        h2.textContent = individuals[i].name + ' ' + individuals[i].lastname;
        bDaySub.textContent = "Date of Birth: " + individuals[i].birthdate;
        bPlaceSub.textContent = "Place of Birth: " + individuals[i].birthplace;
        imgSrc.setAttribute('src', individuals[i].imageurl);
        imgSrc.setAttribute('alt', h2.textContent + ", " + i + ordinal +" President of the LDS Church");
  
        let line = document.createElement('hr');

        card.appendChild(info);
        info.appendChild(h2);
        info.appendChild(line);
        info.appendChild(bDaySub);
        info.appendChild(bPlaceSub);
        card.appendChild(imgSrc);
        document.querySelector('div.cards').appendChild(card);
        
    }
  });

 