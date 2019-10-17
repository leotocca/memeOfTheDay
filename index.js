fetch('https://api.imgflip.com/get_memes').then(response =>
	response.status === 200
		? console.log('Successful request!')
		: console.log(`Oops, we get a ${response.status} error`)
);
