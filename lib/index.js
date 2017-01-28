import http from 'http';
import express from 'express';
import google from 'googleapis';

let jwtClient = new google.auth.JWT(
  "82124981093-compute@developer.gserviceaccount.com",
  null,
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCf0P8hXX59o0fM\n0l1dtYXKGvUHXRkfMJVRCc01F0hSBrDuoCG1uXkCwdJWvUQ0MQASbkrXHi98lvoI\nhJ7XoYjeKG093iLP8XhVtcZeAL5v+5shEf15pWO2ZW9kyZBZCoi/nb/EAfwT6ElJ\nu0IfNtN/Lt4mQx4iAD3gQoqSYWZxZ5hG9oNIypfn4dcsf8sQOBEs2QPSNF7iUrO2\niAv2Bme5tmDbaGGMn1DThQAxYrgKP71MBjJhGgcefnDgUBb0q5obiAuCTMPwJHyb\n7rJ3YxmDlYmb4zOQUv3UEFyefs3yELTYQPySwnzqlesznEK0GQf/mlz6hYIxnyv/\njz0qHOwrAgMBAAECggEADXh8SL+srcJZhvYkUIXAZSyogppiR7K8ozwEQ/lWazON\nLk/pB3w+qvDTXeROH2gR7XvGayNsNUA0iwtCqEJBWxhlPNXAcW6VCgRsV/gQFThL\n9xmhF+PM587c+M3UkOzGYgBV7ZuNN9BYfRJ/nEnuwcWdi/QUUiFbFdAGBhiXne9P\nUJxpYHgCR1CU2LF8ckApnxwqFxzSRB1ooQYyqeY8uro6lgaGqT/r2gKFzNSgAcrG\nyvP6auJv3SUrh4wIzpFUWwBsyDgdAH8NhDY3HeiODIq0h/AI0dCdCngHd/t+WYwK\n0QBBeUUuRaSrT0YbhR6fiw+oeRyqbUzHbITkVPc/QQKBgQDThkPzZWIYNYVqp5kw\nIA3zZoFqAp6cYNMKzT6Ii+9rpjmqGYxAfOuYEMCvGXCTorhHYH34/WOVlxf29OBT\ngEr00qSXSQ87OwDN+8YdNibPeubCwi8HIoegUztmZqMYTpBrxHRtzanDk1NecKsP\nc+rUkX/Eq8woxvPgqgGclJ+LEwKBgQDBa3BKtBLqIdKvMb7h8rtE7BNT9XOWV/1+\nWR8T0L6gFiFzFZjOlK4cB/x+WsDLUDqA9lc44tbBoR6FMbaPPoU2yYBKHTUiuWaC\nK5JG1hrsjh3D8oR/Y+c5Zec5Upmb0tiBkVbqpOdvne+k3NQnDUn54u0DycJEv8rG\nLSCWrE9liQKBgQCCZLJeyJC/+75TER4N3LS85uPARf0gyU9PyVZTNnBRHBdQFI+w\n8VEKXMlrJ3OOjzCqT4FYjFtnS80qH6ppzxxl77QmzpLlIGpOkHaAa3FhVZILXUlA\nTLjuzGBBr+O6iDPfOyvKxI1yUs+B2FKbJAoPH+JzirRALuUICcUUkUoIoQKBgQCk\n8UpBam722wEgBfwSEz0/+VJCNv7rJv410Sp/a3QkcLr1uWUmRgR0Qxs/ZYUj3LcH\nYwvepxMc7JlqXIqifV586jlM+rtlcVXJi/6iCdPMByW7BAWZ3UhB2nTknVwBVjzr\nwVWtpBL5TGYg4XDKHLsJLkuQ/21701LIzZMM6sSKgQKBgAJfUb93P5l36YIiNfce\nltBAX6w50Ur96/+KKRtDId5n0XQG3rWVYO2HlSIeHGhgawfopeQjssuSNBO5bGEL\nEhpysWnF1MK30rOAqU2YZ29lUScjZp8skRT1X8AWWiKiaBwGt/n/UhDeCblnTa9w\ny7cUHkSPoGxc4Whc8Ggbgkw7\n-----END PRIVATE KEY-----\n",
  ['https://www.googleapis.com/auth/urlshortener'],
  null
);

let urlshortener = google.urlshortener('v1');

let params = {
	auth: jwtClient,
 	shortUrl: 'http://goo.gl/xKbRu3'
};

var app = express();
var port = process.env.PORT || 8080;

app.get('/', (req, res) => {
	jwtClient.authorize(function (err, tokens) {
	 	if (err) {
			console.log(err);
			return;
		}
		urlshortener.url.get(params, function (err, response) {
		  if (err) {
		    res.send('Encountered error', err);
		  } else {
		    res.send('Long url is', response.longUrl);
		  }
		});
	});
});

app.listen(port);
console.log('restful server on ' + port);
