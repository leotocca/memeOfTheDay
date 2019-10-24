import { getMemes, ENDPOINT } from './api.js';

import {
	format,
	filterMemesLowerThan,
	sortResponseInAscendingOrder
} from './utils.js';

const container = document.querySelector('.container');
const img = document.querySelector('.container img');

getMemes(ENDPOINT)
	.then(response => response.map(response => format(response)))
	.then(response => filterMemesLowerThan(response, 500))
	.then(response => sortResponseInAscendingOrder(response))
	.then(response => {
		console.dir(response);
		return getMemeOfTheDay(response);
	})
	.catch(error => console.error(error.message));

function getRandomMeme(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function getMemeOfTheDay(arr) {
	const currentDate = new Date();
	img.setAttribute('src', `${arr[currentDate.getDate() - 1].url}`);
}

container.addEventListener('click', element => {
	if (element.target.nodeName === 'BUTTON') {
		element.target.parentElement.querySelector('h1').style.display = 'none';
		element.target.innerText = 'Get another random meme!';
	}
});
