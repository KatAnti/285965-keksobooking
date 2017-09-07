'use strict';

(function () {
  var ESC_KEYCODE = 27;
  window.data = {
    advertList: [],
    generateRandomNumber: function (min, max) {
      var random = min - 0.5 + Math.random() * (max - min + 1);
      random = Math.round(random);
      return random;
    },
    generateRandomUnique: function (list) {
      var listLength = list.length - 1;
      var result = this.generateRandomNumber(0, listLength);
      var value = list[result];
      list.splice(result, 1);
      return value;
    },
    getRandomArrayValue: function (list) {
      var listLength = list.length - 1;
      var result = this.generateRandomNumber(0, listLength);
      var value = list[result];
      return value;
    },
    translatePlaceType: function (valueName) {
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
    },
    compareRandom: function () {
      return Math.random() - 0.5;
    },
    generateFeatures: function (list) {
      var сopyList = list.slice().sort(this.compareRandom);
      var listLength = сopyList.length - 1;
      var account = this.generateRandomNumber(1, listLength);
      сopyList.splice(account, listLength - account);
      return сopyList;
    },
    setAdverts: function (advertList) {
      this.advertList = advertList;
    },
    openDialog: function (currentPin) {
      var pin = document.querySelectorAll('.pin');
      for (var i = 0; i < pin.length; i++) {
        pin[i].classList.remove('pin--active');
      }
      currentPin.classList.add('pin--active');
      var foundedAdvert = window.card.findActiveAdvert(currentPin);
      var node = window.card.fillDialog(foundedAdvert);
      var currentDialogPanel = document.querySelector('.dialog__panel');
      var dialogPanelContainer = document.querySelector('#offer-dialog');
      dialogPanelContainer.replaceChild(node, currentDialogPanel);
      document.querySelector('.dialog').classList.remove('hidden');
      document.addEventListener('keydown', this.onPopupEscPress);
    },
    closeDialog: function (event) {
      if (event) {
        event.preventDefault();
      }
      var pin = document.querySelectorAll('.pin');
      for (var i = 0; i < pin.length; i++) {
        pin[i].classList.remove('pin--active');
      }
      document.querySelector('.dialog').classList.add('hidden');
      document.removeEventListener('keydown', this.onPopupEscPress);
    },
    onPopupEscPress: function (event) {
      if (event.keyCode === ESC_KEYCODE) {
        window.data.closeDialog();
      }
    },
  };
})();
