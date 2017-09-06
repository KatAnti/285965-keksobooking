'use strict';

(function () {
  var template = document.querySelector('#lodge-template').content.querySelector('.dialog__panel');
  var dialogPanel = document.querySelector('.dialog__panel');
  var fragment = document.createDocumentFragment();
  var dialogPanelContainer = document.querySelector('#offer-dialog');
  var dialog = document.querySelector('.dialog');

  window.card = {
    findActiveAdvert: function (currentPin) {
      var pinSrc = currentPin.querySelector('img').getAttribute('src');
      for (var i = 0; i < window.data.advertList.length; i++) {
        var advertImg = window.data.advertList[i].author.avatar;
        if (pinSrc === advertImg) {
          return window.data.advertList[i];
        }
      }
      return false;
    },
    fillDialog: function (currentAdvert) {
      var element = template.cloneNode(true);
      var lodgeFeatures = element.querySelector('.lodge__features');
      var randomArrayFeatures = currentAdvert.offer.features;
      element.querySelector('.lodge__title').insertAdjacentHTML('afterbegin', '' + currentAdvert.offer.title + '');
      element.querySelector('.lodge__address').insertAdjacentHTML('afterbegin', '' + currentAdvert.offer.address + '');
      element.querySelector('.lodge__price ').insertAdjacentHTML('afterbegin', '' + currentAdvert.offer.price + '&#x20bd;/ночь');
      element.querySelector('.lodge__type').insertAdjacentHTML('afterbegin', '' + window.data.translatePlaceType(currentAdvert.offer.type) + '');
      element.querySelector('.lodge__rooms-and-guests').insertAdjacentHTML('afterbegin', '' + currentAdvert.offer.guests + ' гостей в ' + currentAdvert.offer.rooms + ' комнатах');
      element.querySelector('.lodge__checkin-time').insertAdjacentHTML('afterbegin', 'Заезд после ' + currentAdvert.offer.checkin + ', выезд до ' + currentAdvert.offer.checkout + '');

      for (var i = 0; i < randomArrayFeatures.length; i++) {
        var newElement = document.createElement('span');
        var feature = randomArrayFeatures[i];
        newElement.className = 'feature__image feature__image--' + feature + '';
        fragment.appendChild(newElement);
      }

      lodgeFeatures.appendChild(fragment);

      element.querySelector('.lodge__description').insertAdjacentHTML('afterbegin', '' + currentAdvert.offer.description + '');
      document.querySelector('.dialog__title img:first-child').src = '' + currentAdvert.author.avatar + '';
      return element;
    },
    fillCardByFirstAdvert: function (firstAdvert) {
      dialogPanelContainer.replaceChild(this.fillDialog(firstAdvert), dialogPanel);
    },
    addHandlers: function () {
      var dialogClose = dialog.querySelector('.dialog__close');
      dialogClose.addEventListener('click', window.data.closeDialog);
      window.data.closeDialog();

      dialogClose.addEventListener('keydown', function (event) {
        if (event.keyCode === window.data.ENTER_KEYCODE) {
          window.data.closeDialog();
        }
      });
    }
  };




})();
