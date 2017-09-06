'use strict';

(function () {
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
    for (var i = 0; i < capacityField.length; i++) {
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

  var addValidateHandlers = function (field) {
    field.addEventListener('invalid', function () {
      this.style.border = '2px solid red';
    });
    field.addEventListener('change', function () {
      if (this.validity.valid) {
        this.style.border = 'none';
      } else {
        this.style.border = '2px solid red';
      }
    });
    return;
  };

  addValidateHandlers(titleInput);
  addValidateHandlers(priceInput);
  addValidateHandlers(addressInput);
})();
