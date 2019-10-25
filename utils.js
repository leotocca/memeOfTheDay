export {
	checkStatus,
	format,
	filterMemesLowerThan,
	sortResponseInAscendingOrder,
	setImageHover
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

function setImageHover(meme) {
	if (!document.querySelector('.test')) {
		addTitleHTML(meme);
	} else {
		updateTitle(meme);
	}
}

function addTitleHTML(meme) {
	const tempDiv = document.createElement('div');
	const div = document.createElement('div');
	const text = document.createElement('p');

	text.innerText = meme.name;

	div.classList.add('image-hover');

	tempDiv.appendChild(div);
	div.appendChild(text);

	document
		.querySelector('.btn-get-meme')
		.insertAdjacentHTML('beforebegin', tempDiv.innerHTML);
}

function updateTitle(meme) {
	document.querySelector('.test p').innerHTML = meme.name;
}
