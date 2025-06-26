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
                }
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            };
            return response.json();
          })
          .then(data => {
            console.log(data);
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