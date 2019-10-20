export { apiEndpoint, getMemes };

const apiEndpoint = 'https://api.imgflip.com/get_memes';

function getMemes(url) {
	return fetch(url).then(response => {
		response.status === 200
			? console.log('Successful request!')
			: console.log(`Oops, we get a ${response.status} error`);
		return response.json();
	});
}
