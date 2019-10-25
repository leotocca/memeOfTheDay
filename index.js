import { getMemes, ENDPOINT } from './api.js';

import {
	format,
	filterMemesLowerThan,
	sortResponseInAscendingOrder,
	setImageHover
} from './utils.js';

const body = document.querySelector('.body');
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
	const memeURL = arr[randomNumber].url;
	const memeALT = arr[randomNumber].name;
	img.setAttribute('src', `${memeURL}`);
	img.setAttribute('alt', `${memeALT}`);
	return arr[randomNumber];
}

function getMemeOfTheDay(arr) {
	const currentDate = new Date();
	const memeURL = arr[currentDate.getDate() - 1].url;
	img.setAttribute('src', `${memeURL}`);
}

body.addEventListener('click', element => {
	if (element.target.nodeName === 'BUTTON') {
		element.target.parentElement.querySelector('h1').style.display = 'none';
		element.target.innerText = 'Get another random meme!';
		memes
			.then(memes => getRandomMeme(memes))
			.then(meme => setImageHover(meme))
			.catch(error => console.error(error.message));
	}
});
