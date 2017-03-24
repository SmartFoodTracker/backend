/*
* Created by Andrew Hoskins
* Copyright 2017 ECE 492 Group 2 (Winter 2017), University of Alberta. All rights reserved.
*/

import fs from 'fs';
import speech from '@google-cloud/speech';

let speechClient = speech({
 	projectId: 'centering-aegis-157021',
	credentials: {
	  "type": "service_account",
	  "project_id": "centering-aegis-157021",
	  "private_key_id": "4579475e45b5c40c26e0d1396de44705dfdd9282",
	  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCf0P8hXX59o0fM\n0l1dtYXKGvUHXRkfMJVRCc01F0hSBrDuoCG1uXkCwdJWvUQ0MQASbkrXHi98lvoI\nhJ7XoYjeKG093iLP8XhVtcZeAL5v+5shEf15pWO2ZW9kyZBZCoi/nb/EAfwT6ElJ\nu0IfNtN/Lt4mQx4iAD3gQoqSYWZxZ5hG9oNIypfn4dcsf8sQOBEs2QPSNF7iUrO2\niAv2Bme5tmDbaGGMn1DThQAxYrgKP71MBjJhGgcefnDgUBb0q5obiAuCTMPwJHyb\n7rJ3YxmDlYmb4zOQUv3UEFyefs3yELTYQPySwnzqlesznEK0GQf/mlz6hYIxnyv/\njz0qHOwrAgMBAAECggEADXh8SL+srcJZhvYkUIXAZSyogppiR7K8ozwEQ/lWazON\nLk/pB3w+qvDTXeROH2gR7XvGayNsNUA0iwtCqEJBWxhlPNXAcW6VCgRsV/gQFThL\n9xmhF+PM587c+M3UkOzGYgBV7ZuNN9BYfRJ/nEnuwcWdi/QUUiFbFdAGBhiXne9P\nUJxpYHgCR1CU2LF8ckApnxwqFxzSRB1ooQYyqeY8uro6lgaGqT/r2gKFzNSgAcrG\nyvP6auJv3SUrh4wIzpFUWwBsyDgdAH8NhDY3HeiODIq0h/AI0dCdCngHd/t+WYwK\n0QBBeUUuRaSrT0YbhR6fiw+oeRyqbUzHbITkVPc/QQKBgQDThkPzZWIYNYVqp5kw\nIA3zZoFqAp6cYNMKzT6Ii+9rpjmqGYxAfOuYEMCvGXCTorhHYH34/WOVlxf29OBT\ngEr00qSXSQ87OwDN+8YdNibPeubCwi8HIoegUztmZqMYTpBrxHRtzanDk1NecKsP\nc+rUkX/Eq8woxvPgqgGclJ+LEwKBgQDBa3BKtBLqIdKvMb7h8rtE7BNT9XOWV/1+\nWR8T0L6gFiFzFZjOlK4cB/x+WsDLUDqA9lc44tbBoR6FMbaPPoU2yYBKHTUiuWaC\nK5JG1hrsjh3D8oR/Y+c5Zec5Upmb0tiBkVbqpOdvne+k3NQnDUn54u0DycJEv8rG\nLSCWrE9liQKBgQCCZLJeyJC/+75TER4N3LS85uPARf0gyU9PyVZTNnBRHBdQFI+w\n8VEKXMlrJ3OOjzCqT4FYjFtnS80qH6ppzxxl77QmzpLlIGpOkHaAa3FhVZILXUlA\nTLjuzGBBr+O6iDPfOyvKxI1yUs+B2FKbJAoPH+JzirRALuUICcUUkUoIoQKBgQCk\n8UpBam722wEgBfwSEz0/+VJCNv7rJv410Sp/a3QkcLr1uWUmRgR0Qxs/ZYUj3LcH\nYwvepxMc7JlqXIqifV586jlM+rtlcVXJi/6iCdPMByW7BAWZ3UhB2nTknVwBVjzr\nwVWtpBL5TGYg4XDKHLsJLkuQ/21701LIzZMM6sSKgQKBgAJfUb93P5l36YIiNfce\nltBAX6w50Ur96/+KKRtDId5n0XQG3rWVYO2HlSIeHGhgawfopeQjssuSNBO5bGEL\nEhpysWnF1MK30rOAqU2YZ29lUScjZp8skRT1X8AWWiKiaBwGt/n/UhDeCblnTa9w\ny7cUHkSPoGxc4Whc8Ggbgkw7\n-----END PRIVATE KEY-----\n",
	  "client_email": "82124981093-compute@developer.gserviceaccount.com",
	  "client_id": "105650527182388350874",
	  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
	  "token_uri": "https://accounts.google.com/o/oauth2/token",
	  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/82124981093-compute%40developer.gserviceaccount.com"
	}
});

/**
* @api {post} /speech/:sampleRate Parse Speech File
* @apiGroup Speech
* @apiDescription With no "sampleRate" parameter given, default is 32000Hz. Pass sample rate either 32000 or 16000, depending on the environment.
*
* @apiParam (optional) {String} sampleRate either 32000 or 16000
* @apiParam (body) {Binary} file raw audio file
* @apiExample {curl} Example usage:
 *     curl -X POST --data-binary @"bridge.raw" -H "Content-Type: audio/wav" localhost:8080/speech/16000
*/
export function parseSpeech(req, res) {
	// if sample rate given, it must be 16k or 32k, otherwise its an error
	let sampleRate = null;
	if (req.params.sampleRate) {
		if (req.params.sampleRate == '16000' || req.params.sampleRate === '32000') {
			sampleRate = parseInt(req.params.sampleRate);
		} else {
			res.sendStatus(400);
			return;
		}
	}

	fs.writeFile('audio.raw', req.body, 'binary', (err) => {
		speechClient.recognize('./audio.raw', {
			encoding: 'LINEAR16',
			sampleRate: sampleRate || 32000
		}, (err, transcript) => {
			if (err) {
				res.sendStatus(400);
			} else if (!transcript) {
				res.send('Unable to recognize');
			} else {
				res.send(transcript);
			}
		});
	});
}

