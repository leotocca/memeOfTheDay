export { ENDPOINT, getMemes };

import { checkStatus } from './utils.js';

const ENDPOINT = 'https://api.imgflip.com/get_memes';

function getMemes(url) {
	return fetch(url)
		.then(response => {
			checkStatus(response);
			return response.json();
		})
		.then(response => response.data.memes);
}
