import { getMemes, ENDPOINT } from './api.js';

import {
	format,
	filterMemesLowerThan,
	sortResponseInAscendingOrder
} from './utils.js';

const container = document.querySelector('.container');
const img = document.querySelector('.container img');

const memes = getMemes(ENDPOINT)
	.then(response => response.map(response => format(response)))
	.then(response => filterMemesLowerThan(response, 500))
	.then(response => sortResponseInAscendingOrder(response));

memes
	.then(response => {
		console.dir(response);
		return getMemeOfTheDay(response);
	})
	.catch(error => console.error(error.message));

function getRandomMeme(arr) {
	const randomNumber = Math.floor(Math.random() * arr.length);
	const memeUrl = arr[randomNumber].url;
	img.setAttribute('src', `${memeUrl}`);
}

function getMemeOfTheDay(arr) {
	const currentDate = new Date();
	const memeUrl = arr[currentDate.getDate() - 1].url;
	img.setAttribute('src', `${memeUrl}`);
}

container.addEventListener('click', element => {
	if (element.target.nodeName === 'BUTTON') {
		element.target.parentElement.querySelector('h1').style.display = 'none';
		element.target.innerText = 'Get another random meme!';
		memes.then(memes => getRandomMeme(memes));
	}
});
