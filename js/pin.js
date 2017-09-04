'use strict';

(function () {
  var PIN_TOP = 75;
  var PIN_LEFT = 29;
  var tokyoPin = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  var createPin = function (pin) {
    var newElement = document.createElement('div');
    newElement.setAttribute('tabindex', '0');
    newElement.className = 'pin';
    newElement.innerHTML = '<img src="' + pin.author.avatar + '" alt="Pin" class="rounded" width="40" height="40">';
    newElement.style.left = '' + (pin.location.x + PIN_LEFT) + 'px';
    newElement.style.top = '' + (pin.location.y + PIN_TOP) + 'px';
    return newElement;
  };

  for (var i = 0; i < window.data.advertList.length; i++) {
    fragment.appendChild(createPin(window.data.advertList[i]));
  }

  tokyoPin.appendChild(fragment);
  window.map.pin = document.querySelectorAll('.pin');

  for (i = 0; i < window.map.pin.length; i++) {
    window.map.pin[i].addEventListener('click', function (event) {
      window.map.openDialog(event.currentTarget);
    });
    window.map.pin[i].addEventListener('keydown', function (event) {
      if (event.keyCode === window.map.ENTER_KEYCODE) {
        window.map.openDialog(event.currentTarget);
      }
    });
  }
})();
