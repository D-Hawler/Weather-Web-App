import { createCard } from './createDOM.js';

window.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('data'));
  if (data) {
    createCard(data);
  };
});

document.querySelector('#search').addEventListener('click', () => {
    const input = document.querySelector('#city').value;

    if (input) {
        const key = '?key=V2TUW9VDE44V4G5XKN8QE5DXZ';
        const link = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

        const fullLink = link + input + key;

        fetch(fullLink , {mode: 'cors'})
          .then(response => {
            if (!response.ok) {
              if (response.status === 400) {
                badRequest();
              };
            };
            return response.json();
          })
          .then(data => {
            createCard(data);
            localStorage.setItem('data', JSON.stringify(data));
          })
          .catch(error => {
            console.error(error.message);
          });
    };
});






function badRequest() {
    const input = document.querySelector('#city');

    input.setCustomValidity('No such city or country was found in the database.');
    input.reportValidity();
};





// {
//    resolvedAddress:"London, England, United Kingdom"
//   "address": "London",
//   "days": [
//     {
//        conditions: "Rain, Partially cloudy",
//       "datetime": "2025-06-27",
//       "temp": 67.6,
//       "tempmax": 78,
//       "tempmin": 56.4,
//       "icon": "rain",
//       "description": "Partly cloudy throughout the day with early morning rain."
//       // ... другие поля ...
//     },
//     // ... другие дни ...
//   ]
//   // ... другие поля ...
// }