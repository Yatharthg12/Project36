//Create variables here
var dog,dogImg, dogImg1;
var happyDog;
var database;
var foodS;
var foodStock;
var feed, addFood;
var lastFed;
var foodObj;

function preload(){
  //load images here
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() { 
  background(46,139,87);
  //foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed: "+ lastFed%12 + " PM",350,30);
}else if(lastFed==0){
  text("Last Fed: 12AM",350,30);
}else{
  text("Last Fed: "+ lastFed+" AM",350,30);
}

drawSprites()
  
}

function readStock(data){
  foodS = data.val();
  //console.log(foodS);
}

function writeStock(x){

if(x <= 0){
  x=0;
}else{
  x=x-1;
}

  database.ref('/').set({
    Food: x
  })
}

function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


