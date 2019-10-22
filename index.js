'use strict';

import { getMemes, apiEndpoint } from './api.js';

getMemes(apiEndpoint)
	.then(response => parseResponse(response))
	.then(response => filterResponse(response))
	.then(response => sortResponse(response))
	.then(response => console.dir(response))
	.catch(error => console.log(error));

function getRandomMeme(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function parseResponse(response) {
	return response.data.memes.map(element => {
		const { id, name, width, height, url } = element;
		return { id, name, width, height, url };
	});
}

function filterResponse(response) {
	return response.filter(x => x.width < 500 && x.height < 500);
}

function sortResponse(response) {
	return response.sort((a, b) => (Number(a.id) > Number(b.id) ? 1 : -1));
}

const container = document.querySelector('.container');

container.addEventListener('click', element => {
	if (element.target.nodeName === 'BUTTON') {
		element.target.parentElement.querySelector('h1').style.display = 'none';
		element.target.innerText = 'Get another random meme!';
	}
});

// fetch('https://api.imgflip.com/get_memes')
// 	.then(response => {
// 		response.status === 200
// 			? console.log('Successful request!')
// 			: console.log(`Oops, we get a ${response.status} error`);
// 		return response.json();
// 	})
// 	.then(json =>
// 		json.data.memes.map(element => {
// 			const { id, name, width, height, url } = element;
// 			return { id, name, width, height, url };
// 		})
// 	)
// 	.then(processedArr =>
// 		processedArr.filter(x => x.width < 500 && x.height < 500)
// 	)
// 	.then(filteredArr =>
// 		console.dir(
// 			filteredArr.sort((a, b) => (Number(a.id) > Number(b.id) ? 1 : -1))
// 		)
// 	)
// 	.then(sortedArr => console.dir(sortedArr))
// 	.catch(error => console.error(error));
