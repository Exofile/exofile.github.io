class Character {
    constructor(name, region, colour, location){
        this.name = name;
        this.region = region;
        this.colour = colour;
        this.location = location;
    }
}

//create each character with their characteristics
var talkers = [
ahri = new Character("Ahri", "Ionia", "ca2f2f"),
neeko = new Character("Neeko", "Ixtal", "bfff00"),
ezreal = new Character("Ezreal", "Piltover", "e5cc15")]

parseDialogue("dialogue");

showImage("images/test.jpg", 200, 200, "Test Image", "This ID", "sidebar");

function parseDialogue(id){
    var dialogue = document.getElementById(id).innerHTML;
    var splitDialogue = dialogue.split(" ");
    document.getElementById(id).innerHTML = "";
    var splitSnippet = "Temp";
    //parse image
    if (splitSnippet == "[Image]"){
        console.log("It's an image!");
        var imageDatabase = "images/images.json";
        fetch(imageDatabase)
            .then(response => response.json())
            .then(json => {
                console.log(json);
            });
    }
    //parse a button
    else if (splitSnippet == "[Button]"){
        console.log("It's a button!");
    }
    //parse a breakline
    else if (splitSnippet == "[Break]"){
        console.log("It's a breakline!");
    }
    //parse text
    else{
        console.log("It's text!");
        speak(splitDialogue);
        var imageDatabase = "images/images.json";
        fetch(imageDatabase)
            .then(response => response.json())
            .then(json => {
                console.log(json);
            });
    }
}

function showImage(src, width, height, alt, id, imageElement){
    // create a new element for the image
    var image = document.createElement("img");
    image.src = src;
    image.width = width;
    image.height = height;
    image.alt = alt;
    image.id = id;
    //add the image to the specified element
    document.getElementById(imageElement).appendChild(image);
}

function speak(text){
    //Split the string on each space & wipe the element for reconstruction
    for(j = 0; j < text.length; j++){
        var isName = false;
        //check for all character calling cards
        for(i = 0; i < talkers.length; i++){
            if(text[j] == "[" + talkers[i].name  + "]"){
                //Add back their calling card with flair
                document.getElementById("dialogue").innerHTML = document.getElementById("dialogue").innerHTML + " " + text[j].fontcolor(talkers[i].colour).big();
             isName = true;
            }
        }
        //if word is not a calling card just add it back
        if (isName == false){
            document.getElementById("dialogue").innerHTML = document.getElementById("dialogue").innerHTML + " " + text[j];
        }
    }
}