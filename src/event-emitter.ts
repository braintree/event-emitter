function EventEmitter(): void {
  this._events = {};
}

EventEmitter.prototype.on = function (event, callback): void {
  if (this._events[event]) {
    this._events[event].push(callback);
  } else {
    this._events[event] = [callback];
  }
};

EventEmitter.prototype.off = function (event, callback): void {
  const eventCallbacks = this._events[event];

  if (!eventCallbacks) {
    return;
  }

  const indexOfCallback = eventCallbacks.indexOf(callback);

  eventCallbacks.splice(indexOfCallback, 1);
};

EventEmitter.prototype._emit = function (event, ...args): void {
  const eventCallbacks = this._events[event];

  if (!eventCallbacks) {
    return;
  }

  eventCallbacks.forEach(function (callback) {
    callback(...args);
  });
};

EventEmitter.prototype.hasListener = function (event): boolean {
  const eventCallbacks = this._events[event];

  if (!eventCallbacks) {
    return false;
  }

  return eventCallbacks.length > 0;
};

EventEmitter.createChild = function (ChildObject): void {
  ChildObject.prototype = Object.create(EventEmitter.prototype, {
    constructor: ChildObject,
  });
};

export = EventEmitter;
