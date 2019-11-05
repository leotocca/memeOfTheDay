import { getMemes, ENDPOINT } from './api.js';

import {
	format,
	filterMemesLowerThan,
	sortResponseInAscendingOrder,
	updateMemeTitle
} from './utils.js';

const container = document.querySelector('.container');
const img = document.querySelector('.image-container img');

const memes = getMemes(ENDPOINT)
	.then(response => response.map(format))
	.then(response => filterMemesLowerThan(response, 500))
	.then(sortResponseInAscendingOrder)
	.catch(error => console.log(error.message));

memes
	.then(response => {
		console.dir(response);
		return getMemeOfTheDay(response);
	})
	.catch(error => console.error(error.message));

function getRandomMeme(memes) {
	const randomNumber = Math.floor(Math.random() * memes.length);
	const memeURL = memes[randomNumber].url;
	const memeALT = memes[randomNumber].name;
	img.src = memeURL;
	img.alt = memeALT;
	return memes[randomNumber];
}

function getMemeOfTheDay(arr) {
	const currentDate = new Date();
	const meme = arr[currentDate.getDate() - 1];
	img.setAttribute('src', meme.url);
	document.querySelector('.overlay p').innerHTML = meme.name;
}

container.addEventListener('click', element => {
	if (element.target.nodeName === 'BUTTON') {
		element.target.parentElement.querySelector('h1').innerText = 'Random meme';
		element.target.innerText = 'Get another random meme!';
		memes
			.then(getRandomMeme)
			.then(updateMemeTitle)
			.catch(error => console.error(error.message));
	}
});
