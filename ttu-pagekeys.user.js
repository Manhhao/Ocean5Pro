// ==UserScript==
// @name         ッツ PageUp/PageDown Ocean5Pro fix
// @match        https://reader.ttsu.app/*
// @version      1.0
// @description  Corrects PageUp/PageDown events to work properly in ッツ
// @author       Manhhao
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
  const originalAddEventListener = window.addEventListener;

  window.addEventListener = function (type, listener, options) {
    if (type !== 'keydown') {
      return originalAddEventListener.call(this, type, listener, options);
    }

    function onKeydown(event) {
      if (event.key !== 'PageUp' && event.key !== 'PageDown') {
        return listener.call(this, event);
      }

      const fixedEvent = new Proxy(event, {
        get(target, property) {
          return property === 'code' ? event.key : target[property];
        }
      });

      return listener.call(this, fixedEvent);
    }

    return originalAddEventListener.call(this, type, onKeydown, options);
  };
})();