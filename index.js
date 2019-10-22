import { getMemes, ENDPOINT } from './api.js';

import {
	format,
	filterMemesLowerThan,
	sortResponseInAscendingOrder
} from './utils.js';

getMemes(ENDPOINT)
	.then(response => response.map(response => format(response)))
	.then(response => filterMemesLowerThan(response, 500))
	.then(response => sortResponseInAscendingOrder(response))
	.then(response => response)
	.then(response => console.dir(response))
	.catch(error => console.error(error.message));

const container = document.querySelector('.container');

container.addEventListener('click', element => {
	if (element.target.nodeName === 'BUTTON') {
		element.target.parentElement.querySelector('h1').style.display = 'none';
		element.target.innerText = 'Get another random meme!';
	}
});
