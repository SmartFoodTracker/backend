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