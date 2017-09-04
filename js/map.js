'use strict';

(function () {
  window.map = {
    openDialog: function (currentPin) {
      for (var i = 0; i < this.pin.length; i++) {
        this.pin[i].classList.remove('pin--active');
      }
      currentPin.classList.add('pin--active');
      var foundedAdvert = window.card.findActiveAdvert(currentPin);
      var node = window.card.fillDialog(foundedAdvert);
      var currentDialogPanel = document.querySelector('.dialog__panel');
      this.dialogPanelContainer.replaceChild(node, currentDialogPanel);
      this.dialog.classList.remove('hidden');
      document.addEventListener('keydown', this.onPopupEscPress);
    },
    closeDialog: function (event) {
      if (event) {
        event.preventDefault();
      }
      for (var i = 0; i < window.map.pin.length; i++) {
        window.map.pin[i].classList.remove('pin--active');
      }
      window.map.dialog.classList.add('hidden');
      document.removeEventListener('keydown', window.map.onPopupEscPress);
    },
    onPopupEscPress: function (event) {
      if (event.keyCode === window.map.ESC_KEYCODE) {
        window.map.closeDialog();
      }
    },
    pin: document.querySelectorAll('.pin'),
    dialog: document.querySelector('.dialog'),
    dialogPanelContainer: document.querySelector('#offer-dialog'),
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
  };
})();
