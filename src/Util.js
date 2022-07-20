let iframeQueryParams = getIframeQueryParams();

var FAAppletClient = (function () {
  function FAAppletClient({ appletId } = {}) {
    this.registeredEvents = {};
    this.appletId = appletId;
    this.params = {};
    this.eventKey = `fa_applet[${appletId}]`;
    this.queryCallbacks = {};

    const urlParams = new URLSearchParams(window.location.search);
    let paramsHandler = "default";
    for (const [key, value] of urlParams.entries()) {
      if (key === "paramsHandler" && ["nested", '"nested"'].includes(value)) {
        paramsHandler = "nested";
      }
    }
    for (const [key, value] of urlParams.entries()) {
      if (paramsHandler === "nested") {
        this.params[key] = JSON.parse(decodeURI(value));
      } else {
        this.params[key] = value;
      }
    }
    this._postMessageTop = (eventName, payload = {}, callback) => {
      const requestId = btoa(Date.now() * Math.random()).slice(9);
      if (typeof callback === "function") {
        this.queryCallbacks[requestId] = callback;
      }
      const type = `${this.eventKey}.${eventName}`;
      window.top.postMessage({ type, payload, requestId }, "*");
    };

    function _eventHandlerMatches(eventName, eventType) {
      const splitType = eventType.split(".")[1];
      return splitType === eventName;
    }

    function _parentListener(eventKey, event, queryCallbacks) {
      const { data } = event;
      if (!data) {
        return console.log("Wrong type of event sent");
      }
      switch (data.type) {
        case `${eventKey}.getTeamMembers_response`:
          queryCallbacks[data.requestId](data.response);
          break;
        case `${eventKey}.createEntity_response`:
          queryCallbacks[data.requestId](data.response);
          break;
        case `${eventKey}.updateEntity_response`:
          queryCallbacks[data.requestId](data.response);
          break;
        case `${eventKey}.upsertEntity_response`:
          queryCallbacks[data.requestId](data.response);
          break;
        case `${eventKey}.upsertCompositeEntity_response`:
          queryCallbacks[data.requestId](data.response);
          break;
        case `${eventKey}.listEntityValues_response`:
          queryCallbacks[data.requestId](data.response);
          break;
        case `${eventKey}.getEntities_response`:
          queryCallbacks[data.requestId](data.response);
          break;
        case `${eventKey}.getFields_response`:
          queryCallbacks[data.requestId](data.response);
          break;
        case `${eventKey}.getFieldItems_response`:
          queryCallbacks[data.requestId](data.response);
          break;
        case `${eventKey}.globalSearch_response`:
          queryCallbacks[data.requestId](data.response);
          break;
        case `${eventKey}.getUserInfo_response`:
          queryCallbacks[data.requestId](data.response);
          break;
        default:
          break;
      }
    }

    const _eventHandler = (event) => {
      if (event.origin && !event.origin.includes("freeagent.network")) {
        return;
      }

      const data = event.data;
      if (!data) {
        return console.error("Wrong type of event sent");
      }
      Object.keys(this.registeredEvents).map((eventName) => {
        const eventHandler = this.registeredEvents[eventName];
        if (_eventHandlerMatches(eventName, data.type)) {
          return eventHandler(data.payload);
        }
      });
      _parentListener(`fa_applet[${appletId}]`, event, this.queryCallbacks);
    };

    window.addEventListener("message", _eventHandler);

    if (appletId) {
      this._postMessageTop("loaded", { appletId });
    }
  }

  FAAppletClient.prototype.getTeamMembers = function (payload, callback) {
    this._postMessageTop("getTeamMembers", payload, callback);
  };

  FAAppletClient.prototype.createEntity = function (payload, callback) {
    this._postMessageTop("createEntity", payload, callback);
  };

  FAAppletClient.prototype.updateEntity = function (payload, callback) {
    this._postMessageTop("updateEntity", payload, callback);
  };

  FAAppletClient.prototype.upsertEntity = function (payload, callback) {
    this._postMessageTop("upsertEntity", payload, callback);
  };

  FAAppletClient.prototype.upsertCompositeEntity = function (
    payload,
    callback
  ) {
    this._postMessageTop("upsertCompositeEntity", payload, callback);
  };

  FAAppletClient.prototype.listEntityValues = function (payload, callback) {
    this._postMessageTop("listEntityValues", payload, callback);
  };

  FAAppletClient.prototype.getEntities = function (payload, callback) {
    this._postMessageTop("getEntities", payload, callback);
  };

  FAAppletClient.prototype.getFields = function (payload, callback) {
    this._postMessageTop("getFields", payload, callback);
  };

  FAAppletClient.prototype.getFieldItems = function (payload, callback) {
    this._postMessageTop("getFieldItems", payload, callback);
  };

  FAAppletClient.prototype.getUserInfo = function (payload, callback) {
    this._postMessageTop("getUserInfo", payload, callback);
  };

  FAAppletClient.prototype.open = function () {
    this._postMessageTop("open");
  };

  FAAppletClient.prototype.close = function () {
    this._postMessageTop("close");
  };

  FAAppletClient.prototype.showSuccessMessage = function (message) {
    this._postMessageTop("showSuccessMessage", { message });
  };

  FAAppletClient.prototype.showErrorMessage = function (message) {
    this._postMessageTop("showErrorMessage", { message });
  };

  FAAppletClient.prototype.globalSearch = function (search, callback) {
    this._postMessageTop("globalSearch", { search }, callback);
  };

  FAAppletClient.prototype.logActivity = function (payload, callback) {
    this._postMessageTop("logActivity", payload, callback);
  };

  FAAppletClient.prototype.navigateTo = function (url) {
    this._postMessageTop("navigateTo", { url });
  };

  FAAppletClient.prototype.on = function (eventName, callback) {
    this.registeredEvents[eventName] = callback;
  };

  FAAppletClient.prototype.showModal = function (modalName, modalProps) {
    this._postMessageTop("showModal", { modalName, modalProps });
  };

  FAAppletClient.prototype.hideModal = function (modalName) {
    this._postMessageTop("hideModal", { modalName });
  };

  return FAAppletClient;
})();

function getIframeQueryParams() {
  let qs = document.location.search;
  qs = qs.replace(/\?/g, "");
  qs = qs.split("+").join(" ");

  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}

export { FAAppletClient, iframeQueryParams as params };
