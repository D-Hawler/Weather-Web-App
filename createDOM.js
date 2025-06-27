window.addEventListener('beforeunload', () => {
    const temperatureMeasurementType = [degrees, degreesSymbol];
    localStorage.setItem('temperatureMeasurementType', JSON.stringify(temperatureMeasurementType));
});

window.addEventListener('DOMContentLoaded', () => {
    const temperatureMeasurementType = JSON.parse(localStorage.getItem('temperatureMeasurementType'));

    degrees = temperatureMeasurementType[0] || false;
    degreesSymbol = temperatureMeasurementType[1] || '°F';

    document.querySelector('section > div:last-child > button').textContent = degreesSymbol;
});


let degrees = false;
let degreesSymbol = '°F';
document.querySelector('section > div:last-child > button').addEventListener('click', (event) => {
    degrees = !degrees;
    degreesSymbol = degrees ? '°C' : '°F';

    event.target.textContent = degreesSymbol;
});

function temperatureConversion(tempArr) {
    return tempArr.map((num) => Math.round((num - 32) * 5 / 9) / 10);
};

function createCard({ resolvedAddress, days }) {
    const mainContent = document.querySelector('section > div:nth-of-type(1)');
    mainContent.textContent = '';

    const h1 = document.createElement('h1');
    h1.textContent = resolvedAddress;
    mainContent.appendChild(h1);

    const div = document.createElement('div');
    mainContent.appendChild(div);

    for (let i = 0; i < 15; i++) {
        let tempArr = [days[i].tempmax, days[i].temp, days[i].tempmin];

        if (degrees) {
            tempArr = temperatureConversion(tempArr);
        };

        const card = document.createElement('div');
        card.classList.add('card');

        const ul = document.createElement('ul');
        
        const maxTemp = document.createElement('li');
        maxTemp.textContent = `Max temp: ${tempArr[0]}` + degreesSymbol.charAt(1);
        ul.appendChild(maxTemp);

        const temp = document.createElement('li');
        temp.textContent = `Temp: ${tempArr[1]}` + degreesSymbol.charAt(1);
        ul.appendChild(temp);

        const minTemp = document.createElement('li');
        minTemp.textContent = `Min temp: ${tempArr[2]}` + degreesSymbol.charAt(1);
        ul.appendChild(minTemp);

        const alignment = document.createElement('div');

        const conditions = document.createElement('p');
        conditions.textContent = `Conditions: ${days[i].conditions}`;

        const data = document.createElement('p');
        const formatted = dayjs(days[i].datetime).format('DD.MM.YYYY');
        data.textContent = `Data: ${formatted}`;

        card.appendChild(ul);

        alignment.appendChild(conditions);
        alignment.appendChild(data);
        card.appendChild(alignment);

        div.appendChild(card);
    };
};

export { createCard };