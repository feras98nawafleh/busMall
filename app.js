'use strict';

var userAttempts = 0;
var maxAttemps = 25;
let rightImage= document.getElementById('right');
let middleImage= document.getElementById('middle');
let leftImage= document.getElementById('left');
let rightImageIndex, middleImageIndex, leftImageIndex;

function Item (name, src, id) {
  this.name = name;
  this.src = src;
  this.id = id;
  this.shown = 0;
  this.clicked = 0;
  Items.push(this);
}
var Items = [];

new Item('bag', 'images/bag.jpg', 0);
new Item('banana', 'images/banana.jpg', 1);
new Item('bathroom', 'images/bathroom.jpg', 2);
new Item('boots', 'images/boots.jpg', 3);
new Item('breakfast', 'images/breakfast.jpg', 4);
new Item('bubblegum', 'images/bubblegum.jpg', 5);
new Item('chair', 'images/chair.jpg', 6);
new Item('cthulhu', 'images/cthulhu.jpg', 7);
new Item('dog-duck', 'images/dog-duck.jpg', 8);
new Item('dragon', 'images/dragon.jpg', 9);
new Item('pen', 'images/pen.jpg', 10);
new Item('pet-sweep', 'images/pet-sweep.jpg', 11);
new Item('scissors', 'images/scissors.jpg', 12);
new Item('shark', 'images/shark.jpg', 13);
new Item('sweep', 'images/sweep.jpg', 14);
new Item('tauntaun', 'images/tauntaun.jpg', 15);
new Item('unicorn', 'images/unicorn.jpg', 16);
new Item('water-can', 'images/water-can.jpg', 17);
new Item('wine-glass', 'images/wine-glass.jpg', 18);


function getRandomIndex() {
    return Math.floor(Math.random() * Items.length);
}

function renderPhotos() {
    let indexes = [];
    //giving each column it's index to render 
    rightImageIndex = getRandomIndex();
    indexes.push(rightImageIndex);

    do{
    middleImageIndex = getRandomIndex();
    indexes.push(middleImageIndex);
    } while(indexes.includes(middleImageIndex));

    do {
    leftImageIndex = getRandomIndex();
    indexes.push(leftImageIndex);
    } while(indexes.includes(middleImageIndex));

    rightImage.src = Items[rightImageIndex].src;
    middleImage.src = Items[middleImageIndex].src;
    leftImage.src = Items[leftImageIndex].src;

    console.log(rightImageIndex, middleImageIndex, leftImageIndex);
}

renderPhotos();



