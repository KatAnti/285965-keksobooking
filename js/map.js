'use strict';

/* Прописываем переменные для работы с функциями и циклами */

var PLACE_TYPE = ['flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var PLACE_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PIN_TOP = 75;
var PIN_LEFT = 29;
var placeFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var numberOfUser = [];
var advertList = [];

/* Генерируем рандомное целое число в промежутке от min до max */

var generateRandomNumber = function (min, max) {
  var random = min - 0.5 + Math.random() * (max - min + 1);
  random = Math.round(random);
  return random;
};

/* Генерируем рандомное значение из массива */

var getRandomArrayValue = function (list) {
  var listLength = list.length - 1;
  var result = generateRandomNumber(0, listLength);
  var value = list[result];
  return value;
};

/* Генерируем псевдо рандомное число (без повторений) */

var generateRandomUnique = function (list) {
  var listLength = list.length - 1;
  var result = generateRandomNumber(0, listLength);
  var value = list[result];
  list.splice(result, 1);
  return value;
};

/* Присваиваем значениям массива перевод */

var translatePlaceType = function (valueName) {
  if (valueName === 'flat') {
    return 'Квартира';
  }
  if (valueName === 'house') {
    return 'Дом';
  }
  return 'Бунгало';
};

/* Создаем массив случайной длины с рандомным порядком */

var compareRandom = function () {
  return Math.random() - 0.5;
};

var generateFeatures = function (list) {
  var сopyList = list.slice().sort(compareRandom);
  var listLength = сopyList.length - 1;
  var account = generateRandomNumber(1, listLength);
  сopyList.splice(account, listLength - account);
  return сopyList;
};

/* Создаем объекты */

for (var i = 1; i < 9; i++) {
  numberOfUser.push(i);
}

var Author = function () {
  this.avatar = 'img/avatars/user0' + generateRandomUnique(numberOfUser) + '.png';
};

var Location = function () {
  this.x = generateRandomNumber(300, 900);
  this.y = generateRandomNumber(100, 500);
};

var Offer = function (location) {
  this.title = generateRandomUnique(PLACE_TITLE);
  this.address = location.x + ',' + location.y;
  this.price = generateRandomNumber(1000, 1000000);
  this.type = getRandomArrayValue(PLACE_TYPE);
  this.rooms = generateRandomNumber(1, 5);
  this.guests = generateRandomNumber(1, 5);
  this.checkin = getRandomArrayValue(TIMES);
  this.checkout = getRandomArrayValue(TIMES);
  this.features = generateFeatures(placeFeatures);
  this.description = '';
  this.photos = [];
};

var Advert = function () {
  this.author = new Author();
  this.location = new Location();
  this.offer = new Offer(this.location);
};

/* Создаем массив с объектами*/

for (i = 0; i < 8; i++) {
  var advert = new Advert();
  advertList.push(advert);
}

/* Прописываем переменные для работы с DOM */

var firstAdvert = advertList[0];
var dialogPanelContainer = document.querySelector('#offer-dialog');
var template = document.querySelector('#lodge-template').content.querySelector('.dialog__panel');
var dialogPanel = document.querySelector('.dialog__panel');
var element = template.cloneNode(true);
var lodgeFeatures = element.querySelector('.lodge__features');
var randomArrayFeatures = firstAdvert.offer.features;
var tokyoPin = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();

/* Создаем DOM элементы и отрисовываем их */

for (i = 0; i < advertList.length; i++) {
  var newElement = document.createElement('div');
  newElement.className = 'pin';
  newElement.innerHTML = '<img src="' + advertList[i].author.avatar + '" alt="Pin" class="rounded" width="40" height="44">';
  newElement.style.left = '' + (advertList[i].location.x + PIN_LEFT) + 'px';
  newElement.style.top = '' + (advertList[i].location.y + PIN_TOP) + 'px';
  fragment.appendChild(newElement);
}

tokyoPin.appendChild(fragment);

element.querySelector('.lodge__title').insertAdjacentHTML('afterbegin', '' + firstAdvert.offer.title + '');
element.querySelector('.lodge__address').insertAdjacentHTML('afterbegin', '' + firstAdvert.offer.address + '');
element.querySelector('.lodge__price ').insertAdjacentHTML('afterbegin', '' + firstAdvert.offer.price + '&#x20bd;/ночь');
element.querySelector('.lodge__type').insertAdjacentHTML('afterbegin', '' + translatePlaceType(firstAdvert.offer.type) + '');
element.querySelector('.lodge__rooms-and-guests').insertAdjacentHTML('afterbegin', '' + firstAdvert.offer.guests + ' гостей в ' + firstAdvert.offer.rooms + ' комнатах');
element.querySelector('.lodge__checkin-time').insertAdjacentHTML('afterbegin', 'Заезд после ' + firstAdvert.offer.checkin + ', выезд до ' + firstAdvert.offer.checkout + '');

for (i = 0; i < randomArrayFeatures.length; i++) {
  newElement = document.createElement('span');
  var feature = randomArrayFeatures[i];
  newElement.className = 'feature__image feature__image--' + feature + '';
  fragment.appendChild(newElement);
}

lodgeFeatures.appendChild(fragment);

element.querySelector('.lodge__description').insertAdjacentHTML('afterbegin', '' + firstAdvert.offer.description + '');
document.querySelector('.dialog__title img:first-child').src = '' + firstAdvert.author.avatar + '';

dialogPanelContainer.replaceChild(element, dialogPanel);

