'use strict';

function getRandomIndex() {
  return Math.floor(Math.random() * Item.Items.length);
}

var userAttempts = 0;
var maxAttempts = 25;
let photosSection = document.getElementById('photos');
let rightImage = document.getElementById('right');
let middleImage = document.getElementById('middle');
let leftImage = document.getElementById('left');
let displayResultButton = document.getElementById('hidden');
let leftImageIndex;
let middleImageIndex;
let rightImageIndex;

function Item(name, src) {
  this.name = name;
  this.src = src;
  this.clicked = 0;
  this.shown = 0;
  Item.Items.push(this);
  namesArr.push(this.name);
}
Item.Items = [];

let namesArr = [];
let votesArr = [];
let shownArr = [];
let shownBefore = [];

new Item('bag.jpg', 'images/bag.jpg');
new Item('banana.jpg', 'images/banana.jpg');
new Item('bathroom.jpg', 'images/bathroom.jpg');
new Item('boots.jpg', 'images/boots.jpg');
new Item('breakfast.jpg', 'images/breakfast.jpg');
new Item('bubblegum.jpg', 'images/bubblegum.jpg');
new Item('chair.jpg', 'images/chair.jpg');
new Item('cthulhu.jpg', 'images/cthulhu.jpg');
new Item('dog-duck.jpg', 'images/dog-duck.jpg');
new Item('dragon.jpg', 'images/dragon.jpg');
new Item('pen.jpg', 'images/pen.jpg');
new Item('pet-sweep.jpg', 'images/pet-sweep.jpg');
new Item('scissors.jpg', 'images/scissors.jpg');
new Item('shark.jpg', 'images/shark.jpg');
new Item('sweep.png', 'images/sweep.png');
new Item('tauntaun.jpg', 'images/tauntaun.jpg');
new Item('unicorn.jpg', 'images/unicorn.jpg');
new Item('water-can.jpg', 'images/water-can.jpg');
new Item('wine-glass.jpg', 'images/wine-glass.jpg');

function renderImages() {
  leftImageIndex = getRandomIndex();
  middleImageIndex = getRandomIndex();
  rightImageIndex = getRandomIndex();

  while (leftImageIndex === rightImageIndex || leftImageIndex === middleImageIndex || rightImageIndex === middleImageIndex || shownBefore.includes(leftImageIndex) || shownBefore.includes(middleImageIndex) || shownBefore.includes(rightImageIndex)) {
    leftImageIndex = getRandomIndex();
    middleImageIndex = getRandomIndex();
    rightImageIndex = getRandomIndex();
  }

  shownBefore = [leftImageIndex, rightImageIndex, middleImageIndex];

  leftImage.src = Item.Items[leftImageIndex].src;
  middleImage.src = Item.Items[middleImageIndex].src;
  rightImage.src = Item.Items[rightImageIndex].src;
  Item.Items[leftImageIndex].shown++;
  Item.Items[middleImageIndex].shown++;
  Item.Items[rightImageIndex].shown++;
}

renderImages();

let photosDiv = document.getElementById('photos');
photosDiv.addEventListener('click', userClick);

function userClick(event) {
  if (userAttempts < maxAttempts) {
    if (event.target.id === 'left') {
      Item.Items[leftImageIndex].clicked++;
      userAttempts++;
    } else if (event.target.id === 'right') {
      userAttempts++;
      Item.Items[rightImageIndex].clicked++;
    } else if (event.target.id === 'middle') {
      Item.Items[middleImageIndex].clicked++;
      userAttempts++;
    } else {
      alert('Please click exactly on the image');
    }
    renderImages();
  } else {
    photosDiv.removeEventListener('click', userClick);
    updateStorage();
    for (let i = 0; i < Item.Items.length; i++) {
      votesArr.push(Item.Items[i].clicked);
      shownArr.push(Item.Items[i].shown);
    }
    displayResultButton.id = 'visible';
    displayResultButton.addEventListener('click', results);
  }
}

function results() {
  let list = document.getElementById('score-list');
  for (let i = 0; i < Item.Items.length; i++) {
    let listItem = document.createElement('li');
    list.appendChild(listItem);
    listItem.textContent = `${Item.Items[i].name} had ${Item.Items[i].clicked}  clicked,  and was seen ${Item.Items[i].shown} times`;
  }
  for (let i = 0; i < Item.Items.length; i++) {
    votesArr.push(Item.Items[i].clicked);
    shownArr.push(Item.Items[i].shown);
  }
 showChart();
}

function updateStorage() {
  let stringArr = JSON.stringify(Item.Items);
  localStorage.setItem('clicked', stringArr);
}
function getStorage() {
  let data = localStorage.getItem('clicked');
  let parsedArr = JSON.parse(data);
  if (parsedArr !== null) {
    Item.Items=parsedArr;
  }
}
getStorage();

function showChart() {
  const data = {
    labels: namesArr,
    datasets: [
    {
      label: 'Votes',
      data: votesArr,
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 205, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(201, 203, 207, 0.7)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',

      ],
      borderWidth: 4
    },
    {
      label: 'Shown',
      data: shownArr,
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 205, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(201, 203, 207, 0.7)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 4
    }
    ]
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  let myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}