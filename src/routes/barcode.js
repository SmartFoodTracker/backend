import request from 'request';

export function parseBarcode(req, res) {
	const key = 'e2a3f4e45a2523d43526f73562461366';
	const barcode = req.params.code;

	request(`https://api.outpan.com/v2/products/${barcode}?apikey=${key}`, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			res.send(JSON.parse(body).name);
		} else {
			res.send('Unknown product');
		}
	});
}