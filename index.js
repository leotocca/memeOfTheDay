fetch('https://api.imgflip.com/get_memes')
	.then(response => {
		response.status === 200
			? console.log('Successful request!')
			: console.log(`Oops, we get a ${response.status} error`);
		return response.json();
	})
	.then(json =>
		json.data.memes.map(element => {
			const { id, name, width, height, url } = element;
			return { id, name, width, height, url };
		})
	)
	.then(processedArr =>
		processedArr.filter(x => x.width < 500 && x.height < 500)
	);
