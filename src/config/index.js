/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

const config = {
	test: {
		mongo: 'mongodb://localhost/fit_test_db'
	},
	development: {
		mongo: process.env.MONGODB_URI
	},
	production: {
		mongo: process.env.MONGODB_URI
	}
};

export default config;