type CallbackFunction = (...args: unknown[]) => void;

class EventEmitter {
  _events: Record<string, CallbackFunction[]>;

  constructor() {
    this._events = {};
  }

  on(event: string, callback: CallbackFunction): void {
    if (this._events[event]) {
      this._events[event].push(callback);
    } else {
      this._events[event] = [callback];
    }
  }

  off(event: string, callback: CallbackFunction): void {
    const eventCallbacks = this._events[event];

    if (!eventCallbacks) {
      return;
    }

    const indexOfCallback = eventCallbacks.indexOf(callback);

    eventCallbacks.splice(indexOfCallback, 1);
  }

  _emit(event: string, ...args: unknown[]): void {
    const eventCallbacks = this._events[event];

    if (!eventCallbacks) {
      return;
    }

    eventCallbacks.forEach(function (callback) {
      callback(...args);
    });
  }

  hasListener(event: string): boolean {
    const eventCallbacks = this._events[event];

    if (!eventCallbacks) {
      return false;
    }

    return eventCallbacks.length > 0;
  }

  // TODO what is the type for any Class?
  static createChild(ChildObject): void {
    ChildObject.prototype = Object.create(EventEmitter.prototype, {
      constructor: ChildObject,
    });
  }
}

export = EventEmitter;
