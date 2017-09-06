'use strict';

(function () {
  var generateAdvertListArray = function () {
    var numberOfUser = [];
    var PLACE_TYPE = ['flat', 'house', 'bungalo'];
    var TIMES = ['12:00', '13:00', '14:00'];
    var PLACE_TITLE = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
    ];
    var placeFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var advertList = [];

    for (var i = 1; i < 9; i++) {
      numberOfUser.push(i);
    }

    var Author = function () {
      this.avatar = 'img/avatars/user0' + window.data.generateRandomUnique(numberOfUser) + '.png';
    };

    var Location = function () {
      this.x = window.data.generateRandomNumber(300, 900);
      this.y = window.data.generateRandomNumber(100, 500);
    };

    var Offer = function (location) {
      this.title = window.data.generateRandomUnique(PLACE_TITLE);
      this.address = location.x + ',' + location.y;
      this.price = window.data.generateRandomNumber(1000, 1000000);
      this.type = window.data.getRandomArrayValue(PLACE_TYPE);
      this.rooms = window.data.generateRandomNumber(1, 5);
      this.guests = window.data.generateRandomNumber(1, 5);
      this.checkin = window.data.getRandomArrayValue(TIMES);
      this.checkout = window.data.getRandomArrayValue(TIMES);
      this.features = window.data.generateFeatures(placeFeatures);
      this.description = '';
      this.photos = [];
    };

    var Advert = function () {
      this.author = new Author();
      this.location = new Location();
      this.offer = new Offer(this.location);
    };

    for (i = 0; i < 8; i++) {
        var advert = new Advert();
        advertList.push(advert);
    }

    return advertList;
  };

  var advertListArray = generateAdvertListArray();
  window.data.setAdverts(advertListArray);
  window.pin.renderPin(advertListArray);
  var pin = document.querySelectorAll('.pin');
  window.pin.addHandlers(pin);
  window.card.fillCardByFirstAdvert(advertListArray[0]);
  window.card.addHandlers();


  /* window.map = {
    advertListArray: generateAdvertListArray(),
    pin: document.querySelectorAll('.pin'),
    dialog: document.querySelector('.dialog'),

  }; */
})();

