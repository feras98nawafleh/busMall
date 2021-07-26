'use strict';

var userAttempts = 0;
var maxAttempts = 25;
let photosSection = document.getElementById('photos');
let rightImage = document.getElementById('right');
let middleImage = document.getElementById('middle');
let leftImage = document.getElementById('left');
let displayResultButton = document.getElementById('hidden');
let rightImageIndex;
let middleImageIndex;
let leftImageIndex;

var Items = [];
let namesArr = [];

function Item (name, src, id) {
  this.name = name;
  this.source = src;
  this.id = id;
  this.shown = 0;
  this.clicked = 0;
  Items.push(this);
  namesArr.push(this.name);
}
console.log(namesArr);


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
new Item('sweep', 'images/sweep.png', 14);
new Item('tauntaun', 'images/tauntaun.jpg', 15);
new Item('unicorn', 'images/unicorn.jpg', 16);
new Item('water-can', 'images/water-can.jpg', 17);
new Item('wine-glass', 'images/wine-glass.jpg', 18);


function getRandomIndex() {
  return Math.floor(Math.random() * Items.length);
}

function renderPhotos() {
  let shownPrevious = [];
    rightImageIndex = getRandomIndex();
      while(shownPrevious.includes(rightImageIndex)) {
        rightImageIndex = getRandomIndex();
        shownPrevious = [];
        shownPrevious[rightImageIndex];
    }

  middleImageIndex = getRandomIndex();
  if(middleImageIndex === rightImageIndex) {
    middleImageIndex = getRandomIndex();
    while(shownPrevious.includes(middleImageIndex)) {
      middleImageIndex = getRandomIndex();
      shownPrevious = [];
      shownPrevious[rightImageIndex, middleImageIndex];
    }
  }

  leftImageIndex = getRandomIndex();
  while(leftImageIndex === middleImageIndex || leftImageIndex === rightImageIndex) {
    leftImageIndex = getRandomIndex();
  }
  while(shownPrevious.includes(leftImageIndex)) {
    leftImageIndex = getRandomIndex();
    shownPrevious = [];
    shownPrevious[rightImageIndex, middleImageIndex, leftImageIndex];
  }

  rightImage.src = Items[rightImageIndex].source;
  Items[rightImageIndex].shown++;
  middleImage.src = Items[middleImageIndex].source;
  Items[middleImageIndex].shown++;
  leftImage.src = Items[leftImageIndex].source;
  Items[leftImageIndex].shown++;

}
renderPhotos(); 
photosSection.addEventListener('click', handleClick);
rightImage.addEventListener('click',handleClick);
middleImage.addEventListener('click', handleClick);
leftImage.addEventListener('click',handleClick);
displayResultButton.addEventListener('click', showResults);

function showResults() {
  let scoreList = document.getElementById('score-list');
  for (let i = 0; i < Items.length; i++) {
    let listItem = document.createElement('li');
    scoreList.appendChild(listItem);
    listItem.textContent=`${Items[i].name} has ${Items[i].clicked} votes and was shown ${Items[i].shown} times`
  }
}
let votesArr = [];
let shownArr = [];

function handleClick(e) {
  if (userAttempts < maxAttempts) {
    //increment user's attempts by 1 each time the user clicks an image
    userAttempts++;
    if(e.target.id === 'photos') {
      userAttempts--;
    } else if(e.target.id === 'right') {
      Items[rightImageIndex].clicked++;
    } else if(e.target.id === 'middle') {
      Items[middleImageIndex].clicked++;
    } else if (e.target.id === 'left') {
      Items[leftImageIndex].clicked++;
    }
    //display new 3 images
    renderPhotos();
  } else {
    displayResultButton.id = 'visible';
    rightImage.removeEventListener('click',handleClick);
    middleImage.removeEventListener('click', handleClick)
    leftImage.removeEventListener('click',handleClick);
    }


    for (let i = 0; i < Items.length; i++) {
      console.log(Items[i].clicked);
      votesArr.push(Items[i].clicked);
      shownArr.push(Items[i].shown);
    }
    console.log(votesArr);



    photos.removeEventListener('click', handleClick);

    showChart();
    userAttempts++;

  }
  function showChart() {

    const data = {
      labels: namesArr,
      datasets: [{
        label: 'Votes',
        data: votesArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
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
        borderWidth: 1
      },
      {
        label: 'Shown',
        data: shownArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
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
        borderWidth: 1
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
  
  
    var myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
  
  }

