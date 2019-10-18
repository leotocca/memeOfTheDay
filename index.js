fetch('https://api.imgflip.com/get_memes')
	.then(response => {
		response.status === 200
			? console.log('Successful request!')
			: console.log(`Oops, we get a ${response.status} error`);
		return response.json();
	})
	.then(json =>
		console.log(
			json.data.memes.map(element => {
				const { id, name, width, height, url } = element;
				return { id, name, width, height, url };
			})
		)
	);
