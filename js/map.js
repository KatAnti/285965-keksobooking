var placeType = ['flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var placeTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var placeFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var numberOfUser = [];
var advertList = [];
var tokyoPin = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();

for(var i = 1; i < 9; i++){
  numberOfUser.push(i);
};

var translatePlaceType = function(value){
  if(value == 'flat'){
    return 'Квартира';
  }
  if(value == 'house'){
    return 'Дом';
  }
  if(value == 'bungalo'){
    return 'Бунгало';
  }
};

var generateRandomNumber = function(min, max){
  var random = min - 0.5 + Math.random() * (max - min + 1)
  random = Math.round(random);
  return random;
}

var generateRandomString = function(list){
  var listLength = list.length -1;
  var result = generateRandomNumber(0, listLength);
  var value = list[result];
  return value;
}

var generateRandomUnique = function(list){
  var listLength = list.length -1;
  var result = generateRandomNumber(0, listLength);
  var value = list[result];
  list.splice(result, 1);
  return value;
}

var compareRandom = function(a, b) {
  return Math.random() - 0.5;
}

var generateFeatures = function(list){
  var сopyList = list.slice().sort(compareRandom);
  var listLength = сopyList.length - 1;
  var account = generateRandomNumber(1, listLength);
  сopyList.length = account;
  return сopyList;
}

var Author = function() {
  this.avatar = 'img/avatars/user0'+generateRandomUnique(numberOfUser)+'.png';
}

var Location = function() {
  this.x = generateRandomNumber(300,900);
  this.y = generateRandomNumber(100,500);
}

var Offer = function(location) {
  this.title = generateRandomUnique(placeTitle);
  this.address = location.x + ',' + location.y;
  this.price = generateRandomNumber(1000,1000000);
  this.type = generateRandomString(placeType);
  this.rooms = generateRandomNumber(1,5);
  this.guests = generateRandomNumber(1,5);
  this.checkin = generateRandomString(times);
  this.checkout = generateRandomString(times);
  this.features = generateFeatures(placeFeatures);
  this.description = '';
  this.photos = [];
}

var Advert = function() {
  this.author = new Author();
  this.location = new Location();
  this.offer = new Offer(this.location);
}

for(var i = 0 ; i < 8 ; i++){
  var advert = new Advert();
  advertList.push(advert);
}

for(var i = 0; i < advertList.length; i++){
  var newElement = document.createElement('div');
  newElement.className = 'pin';
  newElement.innerHTML = '<img src="'+advertList[i].author.avatar+'" alt="Pin" class="rounded" width="40" height="44">';
  newElement.style.left = ''+(advertList[i].location.x + 29)+'px';
  newElement.style.top = ''+(advertList[i].location.y + 75)+'px';

  fragment.appendChild(newElement);
};

tokyoPin.appendChild(fragment);

var dialogPanelContainer = document.querySelector('#offer-dialog');
var template = document.querySelector('#lodge-template').content.querySelector('.dialog__panel');
var dialogPanel = document.querySelector('.dialog__panel');
var element = template.cloneNode(true);
var lodgeFeatures = template.querySelector('.lodge__features');
var randomArrayFeatures = advertList[0].offer.features;

template.querySelector('.lodge__title').insertAdjacentHTML('afterbegin', ''+advertList[0].offer.title+'');
template.querySelector('.lodge__address').insertAdjacentHTML('afterbegin', ''+advertList[0].offer.address+'');
template.querySelector('.lodge__price ').insertAdjacentHTML('afterbegin', ''+advertList[0].offer.price+'&#x20bd;/ночь');
template.querySelector('.lodge__type').insertAdjacentHTML('afterbegin', ''+translatePlaceType(advertList[0].offer.type)+'');
template.querySelector('.lodge__rooms-and-guests').insertAdjacentHTML('afterbegin', ''+advertList[0].offer.guests+' гостей в '+advertList[0].offer.rooms+' комнатах');
template.querySelector('.lodge__checkin-time').insertAdjacentHTML('afterbegin', 'Заезд после '+advertList[0].offer.checkin+', выезд до '+advertList[0].offer.checkout+'');


for(var i = 0; i < randomArrayFeatures.length; i++){
  var newElement = document.createElement('span');
  var feature = randomArrayFeatures[i];
  newElement.className = 'feature__image feature__image--'+feature+'';
  fragment.appendChild(newElement);
};

lodgeFeatures.appendChild(fragment);

template.querySelector('.lodge__description').insertAdjacentHTML('afterbegin', ''+advertList[0].offer.description+'');
document.querySelector('.dialog__title img:first-child').src = ''+advertList[0].author.avatar+'';

dialogPanel = dialogPanelContainer.replaceChild(template, dialogPanel);

