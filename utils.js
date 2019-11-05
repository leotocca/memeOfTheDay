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
	if (!document.querySelector('.overlay')) {
		addTitleHTML(meme);
	} else {
		updateTitle(meme);
	}
}

function addTitleHTML(meme) {
	const div = document.createElement('div');
	const text = document.createElement('p');

	div.classList.add('overlay');

	text.classList.add('text');
	text.innerText = meme.name;

	div.appendChild(text);

	document.querySelector('.image-container').appendChild(div);
	//.insertAdjacentHTML('beforebegin', tempDiv.innerHTML);
}

function updateTitle(meme) {
	document.querySelector('.overlay p').innerHTML = meme.name;
}
