

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

env = 'dev';
sys = {
	dev : {
		client_id : '*******',
		client_secret : '**************',
		getTokenUrl : 'https://apis.104api-dev.com.tw/oauth2/token',
		sendCardUrl : 'https://apis.104api-dev.com.tw/prohrm/1.0/hrmapi/external/transferTpCard',
	},
	prod:{
		client_id : '*******',
		client_secret : '**************',
		getTokenUrl : 'https://apis.104api.com.tw/oauth2/token',
		sendCardUrl : 'https://apis.104api.com.tw/prohrm/1.0/hrmapi/external/transferTpCard',
	}
}
sendCard();






function getAccessToken(){
	/*
		curl -X POST https://apis.104api-dev.com.tw/oauth2/token \
		 -u '104另外提供:104另外提供' \
		 -H 'content-type: application/x-www-form-urlencoded' \
		 -d 'grant_type=client_credentials&scope=prohrm'
	 */
	let xhr = new XMLHttpRequest();

	xhr.open('POST',
		sys[env].getTokenUrl,
		false,
		sys[env].client_id,
		sys[env].client_secret);

	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send('grant_type=client_credentials&scope=prohrm');

	if (xhr.status === 200) {
		let res  = xhr.responseText;
		//console.log(res);
		return JSON.parse(res).access_token;
	} else {
		throw new Error('getAccessToken error : ' + xhr.responseText)
	}
}

function sendCard(){
	/*
		curl -X POST --header 'Content-Type: application/json'
		--header 'Accept: application/json'
		--header 'Authorization: Bearer {your access token}'
		-d '{body data parameter}' ' https://apis.104api-dev.com.tw/prohrm/1.0/hrmapi/external/transferTpCard'
	 */

	let cards = [
		{
			"uno" : 89203289,
			"cardData": [
				{ "empNo": "0003", "cardTime": 1574065698000, "temperature": 37 },
				{ "empNo": "0004", "cardTime": 1574065698000, "temperature": 37 },
				{ "empNo": "0007", "cardTime": 1574065698000 }
			]
		},
		{
			"uno" : 89203200,
			"cardData": [
				{ "empNo": "0003", "cardTime": 1574065698000, "temperature": 37 },
				{ "empNo": "0004", "cardTime": 1574065698000, "temperature": 37 },
				{ "empNo": "0007", "cardTime": 1574065698000 }
			]
		}
	]

	console.log("ENV：" + env);
	console.log("1. 呼叫getAccessToken: " + sys[env].getTokenUrl);
	let token = getAccessToken();
	console.log("2. 取得Access Token:" + '\n     ' + token);

	//注入驗證資訊，發送打卡資料
	console.log("3. 注入驗證資訊 Authorization");

	let xhr = new XMLHttpRequest();
	xhr.open('POST', sys[env].sendCardUrl,false);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.setRequestHeader('Authorization', 'Bearer ' + token);

	console.log("4. 傳送打卡資料：" + sys[env].sendCardUrl +  '\n     ' + JSON.stringify(cards));
	xhr.send(JSON.stringify(cards));

	//onsole.log(xhr.status);
	console.log("5. 接收處理回傳資訊：" + '\n     ' + xhr.responseText);
}


