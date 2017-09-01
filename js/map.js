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
  if (valueName === 'bungalo') {
    return 'Бунгало';
  }
  return '';
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
var tokyoPin = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();

/* Создаем DOM элементы и отрисовываем их */

var createPin = function (pin) {
  var newElement = document.createElement('div');
  newElement.setAttribute('tabindex', '0');
  newElement.className = 'pin';
  newElement.innerHTML = '<img src="' + pin.author.avatar + '" alt="Pin" class="rounded" width="40" height="40">';
  newElement.style.left = '' + (pin.location.x + PIN_LEFT) + 'px';
  newElement.style.top = '' + (pin.location.y + PIN_TOP) + 'px';
  return newElement;
};

for (i = 0; i < advertList.length; i++) {
  fragment.appendChild(createPin(advertList[i]));
}

tokyoPin.appendChild(fragment);

var fillDialog = function (currentAdvert) {
  var element = template.cloneNode(true);
  var lodgeFeatures = element.querySelector('.lodge__features');
  var randomArrayFeatures = currentAdvert.offer.features;
  element.querySelector('.lodge__title').insertAdjacentHTML('afterbegin', '' + currentAdvert.offer.title + '');
  element.querySelector('.lodge__address').insertAdjacentHTML('afterbegin', '' + currentAdvert.offer.address + '');
  element.querySelector('.lodge__price ').insertAdjacentHTML('afterbegin', '' + currentAdvert.offer.price + '&#x20bd;/ночь');
  element.querySelector('.lodge__type').insertAdjacentHTML('afterbegin', '' + translatePlaceType(currentAdvert.offer.type) + '');
  element.querySelector('.lodge__rooms-and-guests').insertAdjacentHTML('afterbegin', '' + currentAdvert.offer.guests + ' гостей в ' + currentAdvert.offer.rooms + ' комнатах');
  element.querySelector('.lodge__checkin-time').insertAdjacentHTML('afterbegin', 'Заезд после ' + currentAdvert.offer.checkin + ', выезд до ' + currentAdvert.offer.checkout + '');

  for (i = 0; i < randomArrayFeatures.length; i++) {
    var newElement = document.createElement('span');
    var feature = randomArrayFeatures[i];
    newElement.className = 'feature__image feature__image--' + feature + '';
    fragment.appendChild(newElement);
  }

  lodgeFeatures.appendChild(fragment);

  element.querySelector('.lodge__description').insertAdjacentHTML('afterbegin', '' + currentAdvert.offer.description + '');
  document.querySelector('.dialog__title img:first-child').src = '' + currentAdvert.author.avatar + '';
  return element;
};

dialogPanelContainer.replaceChild(fillDialog(firstAdvert), dialogPanel);

/* Обратная связь на поведение пользователя */

var pin = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var onPopupEscPress = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closeDialog();
  }
};

var findActiveAdvert = function (currentPin) {
  var pinSrc = currentPin.querySelector('img').getAttribute('src');
  for (i = 0; i < advertList.length; i++) {
    var advertImg = advertList[i].author.avatar;
    if (pinSrc === advertImg) {
      return advertList[i];
    }
  }
  return;
};

var openDialog = function (currentPin) {
  for (i = 0; i < pin.length; i++) {
    pin[i].classList.remove('pin--active');
  }
  currentPin.classList.add('pin--active');
  var foundedAdvert = findActiveAdvert(currentPin);
  var node = fillDialog(foundedAdvert);
  var currentDialogPanel = document.querySelector('.dialog__panel');
  dialogPanelContainer.replaceChild(node, currentDialogPanel);
  dialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closeDialog = function (event) {
  if (event) {
    event.preventDefault();
  }
  for (i = 0; i < pin.length; i++) {
    pin[i].classList.remove('pin--active');
  }
  dialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

dialogClose.addEventListener('click', closeDialog);
closeDialog();

dialogClose.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    closeDialog();
  }
});

for (i = 0; i < pin.length; i++) {
  pin[i].addEventListener('click', function (event) {
    openDialog(event.currentTarget);
  });
  pin[i].addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      openDialog(event.currentTarget);
    }
  });
}

/* Валидация формы */

var timeInField = document.querySelector('#timein');
var timeOutField = document.querySelector('#timeout');
var typeOfPlaceField = document.querySelector('#type');

var changeTime = function (time, replacedTime) {
  replacedTime.value = time.value;
};

timeInField.addEventListener('change', function () {
  changeTime(timeInField, timeOutField);
});

timeOutField.addEventListener('change', function () {
  changeTime(timeOutField, timeInField);
});

var setMinPrice = function () {
  var price = document.querySelector('#price');
  var currentType = typeOfPlaceField.value;
  switch (currentType) {
    case 'flat':
      price.setAttribute('min', '1000');
      break;
    case 'house':
      price.setAttribute('min', '5000');
      break;
    case 'palace':
      price.setAttribute('min', '10000');
      break;
    default:
      price.setAttribute('min', '0');
      break;
  }
  return;
};

typeOfPlaceField.addEventListener('change', setMinPrice);

var capacityField = document.querySelector('#capacity');
var roomNumberField = document.querySelector('#room_number');

var setVisitorsNumber = function () {
  var roomNumberFieldValue = +roomNumberField.value;
  for (i = 0; i < capacityField.length; i++) {
    var capacityFieldValue = +capacityField[i].value;
    capacityField[i].disabled = false;
    if (
      capacityFieldValue > roomNumberFieldValue
      || (roomNumberFieldValue === 100 && capacityFieldValue !== 0)
      || (roomNumberFieldValue !== 100 && capacityFieldValue === 0)
    ) {
      capacityField[i].disabled = 'true';
      capacityField[i].removeAttribute('selected');
    } else {
      capacityField[i].selected = 'true';
    }
  }
  return;
};

setVisitorsNumber();
roomNumberField.addEventListener('change', setVisitorsNumber);

var titleInput = document.querySelector('#title');
var priceInput = document.querySelector('#price');
var addressInput = document.querySelector('#address');

var validateField = function (field) {
  field.addEventListener('invalid', function (evt) {
    field.style.border = "2px solid red";
  });
  field.addEventListener('change', function (evt) {
    if (field.validity.valid) {
      field.style.border = "none";
    } else {
      field.style.border = "2px solid red";
    }
  });
  return;
};

validateField(titleInput);
validateField(priceInput);
validateField(addressInput);