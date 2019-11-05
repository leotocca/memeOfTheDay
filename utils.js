export {
	checkStatus,
	format,
	filterMemesLowerThan,
	sortResponseInAscendingOrder,
	updateMemeTitle
};

function checkStatus(response) {
	response.status === 200
		? console.log('Successful request!')
		: console.error(`Oops, we get a ${response.status} error`);
}

function format(response) {
	const { id, name, width, height, url } = response;
	return { id, name, width, height, url };
}

function filterMemesLowerThan(response, size) {
	return response.filter(x => x.width >= size || x.height >= size);
}

function sortResponseInAscendingOrder(response) {
	return response.sort((a, b) => Number(a.id) - Number(b.id));
}

function updateMemeTitle(meme) {
	document.querySelector('.overlay p').innerHTML = meme.name;
}
