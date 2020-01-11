var indexVisibleImage = 0;
var indexNextImage;
var time = 3000;

// var http = require("http");
var adr = window.location.href;

var imageFiles = ["montyHallBlue.png", "montyHallGreen.png", "montyHallRed.png", "montyHallPc.png"];

var images = document.querySelectorAll(".image");
var authButtonEl = document.querySelector("#authButton");
var authCodeEl = document.querySelector("#authCode");
var emblemImageEl = document.querySelector("#emblemImage");
var statTableEl = document.getElementById("#datagrid");

authButtonEl.addEventListener("click", frameAuth);
authCodeEl.addEventListener("click", frameCode);

var apiKey = "775dca647cdc4959952ac8089d7a9f04";

for(var i = 0; i < images.length; i++){
	images[i].style.backgroundImage = "url(img/" + imageFiles[i] + ")";
	if(i != 0){
		images[i].style.display = "none";
	}
}

setTimeout(move, time);

function frameAuth(){
	console.log("Authenticating..");
    // window.open("https://www.bungie.net/en/OAuth/Authorize?client_id=31149&response_type=code");
}

function frameCode() {
    console.log("Passing Code..");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018467285129/Character/2305843009299616394/?components=200");
    xhr.setRequestHeader("X-API-Key", apiKey);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log("404 NOT FOUND");
        } else {
            console.log("Done");
            var json = JSON.parse(this.responseText);
            console.log(json.Response.character.data.light); // remove later!
            document.getElementById("emblemImage").src = "https://www.bungie.net" + json.Response.character.data.emblemBackgroundPath;
            // var mobility = json.Response.character.data.stats.2996146975;
            // console.log(mobility);
            statTableEl.rows[0].cells[1].innerHTML = "test";
        }
    }
    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
            console.log("Recieved bytes");
        } else {
            console.log("Recieved no content length");
        }

    };
    xhr.onerror = function () {
        console.log("Request failed");
    };
 
}

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