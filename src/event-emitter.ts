type CallbackFunction<T = unknown> = (eventPayload?: T) => void;

class EventEmitter {
  _events: Record<string, CallbackFunction[]>;

  constructor() {
    this._events = {};
  }

  on<T>(event: string, callback: CallbackFunction<T>): void {
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

  emit(event: string, eventPayload?: unknown): void {
    const eventCallbacks = this._events[event];

    if (!eventCallbacks) {
      return;
    }

    eventCallbacks.forEach(function (callback) {
      callback(eventPayload);
    });
  }

  hasListener(event: string): boolean {
    const eventCallbacks = this._events[event];

    if (!eventCallbacks) {
      return false;
    }

    return eventCallbacks.length > 0;
  }
}

export = EventEmitter;
