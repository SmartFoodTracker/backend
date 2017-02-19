import request from 'request';


export function getRecipes(req, res) {

	const ENDPOINT = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex';
	const RESULT_SIZE = 10;

	let requestUrl = `${ENDPOINT}?includeIngredients=${req.query.ingredients}&number=${RESULT_SIZE}&ranking=1&addRecipeInformation=true`;

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
			res.send(body);
			// todo, parse out the important parts and send to android app
			// - name
			// - steps
			// - picture
			// - summary of ingredients and anything missing
		} else {
			res.send(response);
			// res.send('error getting recipes from spoonacular');
		}
	});
}