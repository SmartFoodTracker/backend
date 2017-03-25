/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import request from 'request';
import User from '../models/user';
import Item from '../models/item';


/**
* @api {get} /:userId/recipes Request Recipes For User
* @apiGroup Recipes
*
* @apiParam (required) {Number} userId user requesting recipes (for now use id: 1)
* @apiParam (optional) {String} cuisine one of the following: african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, or latin american
* @apiParam (optional) {String} intolerances one or more of the following comma seperated: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat
* @apiParam (optional) {String} query general recipe search string, ex: hamburger
* @apiParam (optional) {Number} page next 10 results
* @apiParam (optional) {String} type one of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink
*
* @apiExample {curl} Example usage:
*     curl http://food-fit.herokuapp.com/1/recipes?page=2
*
* @apiSuccessExample {json} Success-Response: 
*	{		
*		"data": [
*			{
*				"title": "Zesty Tomato Sauce",
*				"image": "https://spoonacular.com/recipeImages/zesty-tomato-sauce-268411.jpg",
*				"steps": ["Fill pan with water", ...],
*       		"sourceUrl": "https://spoonacular.com/apple-pie-syrup-534502",
*				"satisfiedIngredients": ["tomato"],
*				"unsatisfiedIngredients": ["pepper", "salt"]
*				"id": 32592
*			}
*			...
*		],
*		"totalPages": 90,
*		"page": 2
*	}
*/
export function getHomeRecipes(req, res) {
	User.findById(req.params.userId, (err, doc) => {
		if (err || doc == null) {
			res.sendStatus(400);
			return;
		}

		Item.find({'deviceId': doc.deviceId}, (err, docs) => {
			if (err || doc == null) {
				res.sendStatus(400);
				return;
			}

			req.query.ingredients = encodeURIComponent(docs.map((doc) => doc.title).join());
			getRecipes(req, res, docs.map((doc) => doc.title));
		});
	});
}

function getRecipes(req, res, inventory) {

	const ENDPOINT = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex';
	const RESULT_SIZE = 10;

	let requestUrl = `${ENDPOINT}?includeIngredients=${req.query.ingredients}&number=${RESULT_SIZE}&ranking=2&addRecipeInformation=true&instructionsRequired=true&fillIngredients=true`;

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
			try {
				let payloadData = JSON.parse(body).results.map((result) => recipeToResponse(result, inventory));
				let payload = {
					data: payloadData,
					totalPages: 90, // API always gives 900 ranked results, our page size is 10
					page: req.query.page || 1
				}

				res.send(payload);
			} catch (err) {
				console.error(err);
				console.error(JSON.parse(body).results);
				res.sendStatus(500);
			}
		} else {
			res.send(response);
		}
	});
}

function recipeToResponse(recipe, inventory) {
	let unsatisfiedIngredients = recipe.missedIngredients.map((ingredient) => ingredient.name);
	let satisfiedIngredients = recipe.usedIngredients.map((ingredient) => ingredient.name);

	let steps = recipe.analyzedInstructions.length > 0 ? recipe.analyzedInstructions[0].steps.map((s) => s.step): [];

	// parse out embedded step numbers, example: 'Do this.2. Then do this' => 'Do this. Then do this'
	steps = steps.map((step) => step.replace(/[0-9]+.\s/, ' '));

	// parse out end of string numbering, example: 'This.3.' => 'This.'
	steps = steps.map((step) => step.replace(/[0-9]+.$/, ' ')); 

	// parse out end of string numbering other case (without period), example: 'This.3' => 'This.'
	steps = steps.map((step) => step.replace(/[0-9]+$/, ' ')); 

	// split, example: 'Do this. Then do this' => 'Do this.', 'Then do this'
	let splitSteps = [];
	steps.forEach((step) => {
		step.split('. ').forEach((s) => {
			splitSteps.push(s);
		});
	});

	// after all this regex, protect against an empty string happening
	splitSteps = splitSteps.filter((step) => step.length > 0);

	return {
		title: recipe.title,
		image: recipe.image,
		steps: splitSteps,
		sourceUrl: recipe.sourceUrl,
		satisfiedIngredients: satisfiedIngredients,
		unsatisfiedIngredients: unsatisfiedIngredients,
		id: recipe.id
	};
}
