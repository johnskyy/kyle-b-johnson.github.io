const today = Date.now();
const day = today.getDay();

if (day == 5) {
  document
    .getElementById('info-banner')
    .innerHTML(
      'Saturday = Preston Pancakes in the Park! 9:00 a.m. Saturday at the city park pavilion.'
    );
} else document.getElementById('info-banner').innerHTML('Today is ' + day);


