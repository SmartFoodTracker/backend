import request from 'request';


export function getRecipes(req, res) {

	const ENDPOINT = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex';
	const RESULT_SIZE = 10;

	let requestUrl = `${ENDPOINT}?includeIngredients=${req.query.ingredients}&number=${RESULT_SIZE}&ranking=2&addRecipeInformation=true&instructionsRequired=true`;

	// enum: places like american, japanese
	if (req.query.cuisine) {
		requestUrl = requestUrl + `&cuisine=${req.query.cuisine}`;
	}

	// enum: allergy things like gluten, nuts
	if (req.query.intolerances) {
		requestUrl = requestUrl + `&intolerances=${req.query.intolerances}`;
	}

	// string: recipe search query like burger
	if (req.query.query) {
		requestUrl = requestUrl + `&query=${req.query.query}`;
	}

	// number: paginated request offset
	if (req.query.page) {
		let offset = req.query.page * RESULT_SIZE;
		requestUrl = requestUrl + `&offset=${offset}`;
	}

	// enum: type of food like dessert, salad, soup
	if (req.query.type) {
		requestUrl = requestUrl + `&type=${req.query.type}`;
	}

	let options = {
		url: requestUrl,
		headers: {
			'X-Mashape-Key': 'Uy01syGBrhmshkXhYeSBAnq42u5op1j3PXojsnD1I5DgLO4e7M',
			'Accept': 'application/json'
		}
	};

	request(options, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			let payload = JSON.parse(body).results.map((result) => {
				return {
					title: result.title,
					image: result.image,
					steps: result.analyzedInstructions[0].steps.map((s) => s.step)
				}
			});

			res.send(payload);
		} else {
			res.send(response);
		}
	});
}