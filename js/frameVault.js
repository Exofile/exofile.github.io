var indexVisibleImage = 0;
var indexNextImage;
var time = 3000;

var imageFiles = ["montyHallBlue.png", "montyHallGreen.png", "montyHallRed.png", "montyHallPc.png"];

var bungieImage = "url(https://www.bungie.net/common/destiny2_content/icons/d41dd918d42681c5b0ad00880274b22c.png)";

var images = document.querySelectorAll(".image");
var authButton = document.querySelector("#authButton");

window.addEventListener("click", frameAuth);

function frameAuth(){
	console.log("Authenticating..");
	window.open("https://www.bungie.net/en/OAuth/Authorize?client_id=31149&response_type=code");
}

var apiKey = "775dca647cdc4959952ac8089d7a9f04";

localStorage.setItem("tabbed", true);

window.addEventListener("storage", function(e){
	if(localStorage.getItem("tabbed") && localStorage.getItem("tabbed")){
		// Reload authorization code from LocalStorage
		localStorage.removeItem("tabbed");
	}
});

if(localStorage.getItem("tabbed")){
	// Save authentication code to LocalStorage and close the tab
	window.close();
};
/*
POST https://www.bungie.net/Platform/App/OAuth/Token/ HTTP/1.1
Content-Type: application/x-www-form-urlencoded

client_id="31149"&grant_type=authorization_code&code={auth-code}

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.bungie.net/platform/Destiny/Manifest/InventoryItem/1274330687/", true);
xhr.setRequestHeader("X-API-Key", apiKey);

xhr.onreadystatechange = function(){
	if(this.readyState === 4 && this.status === 200){
		var json = JSON.parse(this.responseText);
		console.log(json.Response.data.inventoryItem.itemName); //Gjallarhorn
	}
}

xhr.send();

var exoEmblem = new XMLHttpRequest();
exoEmblem.open("GET", "https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018467285129/Character/2305843009299616394/", true);
exoEmblem.setRequestHeader("X-API-Key", apiKey);

exoEmblem.onreadystatechange = function(){
	if(this.readyState === 4 && this.status === 400){
		var json = JSON.parse(this.responseText);
		console.log(json.Response.character.data.emblemPath); //Exofile's Emblem
		console.log("beep");
	}
}

exoEmblem.send();

*/

for(var i = 0; i < images.length; i++){
	images[i].style.backgroundImage = "url(img/" + imageFiles[i] + ")";
	if(i != 0){
		images[i].style.display = "none";
	}
}

setTimeout(move, time);

function move(){
	if(indexVisibleImage === images.length - 1){
		indexNextImage = 0;
	}else{
		indexNextImage = indexVisibleImage + 1;
	}
	
	images[indexNextImage].style.left = "500px";
	images[indexNextImage].style.display = "initial";
	images[indexNextImage].style.animation = "inFromRight 2s forwards";
	
	images[indexVisibleImage].style.animation = "outFromLeft 2s forwards";
	
	indexVisibleImage = indexNextImage;
	
	setTimeout(move, time);
}