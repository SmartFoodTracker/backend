import request from 'request';
import User from '../models/user';
import Item from '../models/item';


/**
* @api {get} /recipes Generic Request Recipes
* @apiGroup Recipes
*
* @apiParam (required) {String} ingredients comma seperated list of food item names
* @apiParam (optional) {String} cuisine one of the following: african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, or latin american
* @apiParam (optional) {String} intolerances one or more of the following comma seperated: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat
* @apiParam (optional) {String} query general recipe search string, ex: hamburger
* @apiParam (optional) {Number} page next 10 results
* @apiParam (optional) {String} type one of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink
*
* @apiExample {curl} Example usage:
*     curl http://food-fit.herokuapp.com/recipes?ingredients=tomato%2Clettuce%2Cchedder+cheese&intolerances=peanut&page=2
*
* @apiSuccessExample {json} Success-Response: 
*		[
*			{
*				title: 'Zesty Tomato Sauce',
*				image: 'https://spoonacular.com/recipeImages/zesty-tomato-sauce-268411.jpg',
*				steps: ['Fill pan with water', ...]
*			}
*			...
*		]
*/
export function getRecipes(req, res) {

	const ENDPOINT = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex';
	const RESULT_SIZE = 10;

	let requestUrl = `${ENDPOINT}?includeIngredients=${req.query.ingredients}&number=${RESULT_SIZE}&ranking=2&addRecipeInformation=true&instructionsRequired=true`;

	if (req.query.cuisine) {
		requestUrl = requestUrl + `&cuisine=${req.query.cuisine}`;
	}

	if (req.query.intolerances) {
		requestUrl = requestUrl + `&intolerances=${req.query.intolerances}`;
	}

	if (req.query.query) {
		requestUrl = requestUrl + `&query=${req.query.query}`;
	}

	if (req.query.page) {
		let offset = (req.query.page - 1) * RESULT_SIZE;
		requestUrl = requestUrl + `&offset=${offset}`;
	}

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
			let payloadData = JSON.parse(body).results.map((result) => {
				return {
					title: result.title,
					image: result.image,
					steps: result.analyzedInstructions[0].steps.map((s) => s.step)
				}
			});

			let payload = {
				data: payloadData,
				totalPages: 90, // API always gives 900 ranked results, our page size is 10
				page: req.query.page || 1
			}

			res.send(payload);
		} else {
			res.send(response);
		}
	});
}


/**
* @api {get} /:userId/recipes Request Recipes For User
* @apiGroup Recipes
*
* @apiParam (required) {Number} userId user requesting recipes (for now use id: 1)
*
* @apiExample {curl} Example usage:
*     curl http://food-fit.herokuapp.com/1/recipes
*
* @apiSuccessExample {json} Success-Response: 
*		[
*			{
*				title: 'Zesty Tomato Sauce',
*				image: 'https://spoonacular.com/recipeImages/zesty-tomato-sauce-268411.jpg',
*				steps: ['Fill pan with water', ...]
*			}
*			...
*		]
*/
export function getHomeRecipes(req, res) {
	User.findById(req.params.userId, (err, doc) => {
		if (err) {
			res.sendStatus(400);
		}

		Item.find({'deviceId': doc.deviceId}, (err, docs) => {
			if (err) {
				res.sendStatus(400);
			}

			req.query.ingredients = encodeURIComponent(docs.map((doc) => doc.title).join());
			getRecipes(req, res);
		});
	});
}






















