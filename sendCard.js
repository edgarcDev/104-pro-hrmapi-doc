

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function getAccessToken(){
	/*
		curl -X POST https://apis.104api-dev.com.tw/oauth2/token \
		 -u '104另外提供:104另外提供' \
		 -H 'content-type: application/x-www-form-urlencoded' \
		 -d 'grant_type=client_credentials&scope=prohrm'
	 */
	let authUrl = 'https://apis.104api-dev.com.tw/oauth2/token';
	let id = '104另外提供';
	let secret = '104另外提供';

	let xhr = new XMLHttpRequest();

	xhr.open('POST',authUrl,false,id,secret);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send('grant_type=client_credentials&scope=prohrm');

	if (xhr.status === 200) {
		let res  = xhr.responseText;
		console.log(res);
		return JSON.parse(res).access_token;
	}
}

function sendCard(){
	/*
		curl -X POST --header 'Content-Type: application/json'
		--header 'Accept: application/json'
		--header 'Authorization: Bearer {your access token}'
		-d '{body data parameter}' ' https://apis.104api-dev.com.tw/prohrm/1.0/hrmapi/external/transferTpCard'
	 */

	let sendCardUrl = 'https://apis.104api-dev.com.tw/prohrm/1.0/hrmapi/external/transferTpCard';

	let cards = [
		{
			"uno" : 89203289,
			"cardData": [
				{ "empNo": "0003", "cardTime": 1574065698000},
				{ "empNo": "0004", "cardTime": 1574065698000},
				{ "empNo": "0007", "cardTime": 1574065698000}
			]
		},
		{
			"uno" : 89203281,
			"cardData": [
				{ "empNo": "0003", "cardTime": 1574065698000},
				{ "empNo": "0004", "cardTime": 1574065698000},
				{ "empNo": "0007", "cardTime": 1574065698000}
			]
		}
	]
	let token = getAccessToken();

	let xhr = new XMLHttpRequest();
	xhr.open('POST',sendCardUrl,false);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.setRequestHeader('Authorization', 'Bearer ' + token);
	xhr.send(JSON.stringify(cards));

	console.log(xhr.status);
	console.log(xhr);
}



sendCard();