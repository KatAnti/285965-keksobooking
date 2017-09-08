'use strict';

(function () {
  var PIN_TOP = 75;
  var PIN_LEFT = 29;
  var tokyoPin = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  var ENTER_KEYCODE = 13;

  var createPin = function (pin) {
    var newElement = document.createElement('div');
    newElement.setAttribute('tabindex', '0');
    newElement.className = 'pin';
    newElement.innerHTML = '<img src="' + pin.author.avatar + '" alt="Pin" class="rounded" width="40" height="40">';
    newElement.style.left = '' + (pin.location.x + PIN_LEFT) + 'px';
    newElement.style.top = '' + (pin.location.y + PIN_TOP) + 'px';
    return newElement;
  };

  window.pin = {
    renderPin: function (advert) {
      fragment.appendChild(createPin(advert));
      tokyoPin.appendChild(fragment);
      return fragment;
    },
    addHandlers: function (pin) {
      pin.addEventListener('click', function (event) {
        window.data.openDialog(event.currentTarget);
      });
      pin.addEventListener('keydown', function (event) {
        if (event.keyCode === ENTER_KEYCODE) {
          window.data.openDialog(event.currentTarget);
        }
      });
    }
  };
})();
