import { getMemes, ENDPOINT } from './api.js';

import {
	format,
	filterMemesLowerThan,
	sortResponseInAscendingOrder
} from './utils.js';

let memesArray = [];
let currentDayMeme = {};

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
	return arr[currentDate.getDate() - 1];
}

const container = document.querySelector('.container');

container.addEventListener('click', element => {
	if (element.target.nodeName === 'BUTTON') {
		element.target.parentElement.querySelector('h1').style.display = 'none';
		element.target.innerText = 'Get another random meme!';
	}
});
