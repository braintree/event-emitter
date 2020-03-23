const EventEmitter = require('../event-emitter');

describe('EventEmitter', () => {
  it('can emit when no one is listening', () => {
    const emitter = new EventEmitter();

    expect(function () {
      emitter._emit('foo');
    }).not.toThrowError();
  });

  it('can subscribe to events', done => {
    const emitter = new EventEmitter();

    emitter.on('foo', function () {
      done();
    });

    emitter._emit('foo');
  });

  it('can unsubscribe from events', () => {
    const emitter = new EventEmitter();
    const spy = jest.fn();

    emitter.on('foo', spy);

    emitter.off('foo', spy);

    emitter._emit('foo');

    expect(spy).not.toBeCalled();
  });

  it('does not error when unsubscribing from an event that does not exist', () => {
    const emitter = new EventEmitter();
    const spy = jest.fn();

    expect(function () {
      emitter.off('foo', spy);
    }).not.toThrowError();
  });

  it('only unsubscribes from specific function', () => {
    const emitter = new EventEmitter();
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();

    emitter.on('foo', spy1);
    emitter.on('foo', spy2);
    emitter.on('foo', spy3);

    emitter.off('foo', spy2);

    emitter._emit('foo');

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(0);
    expect(spy3).toBeCalledTimes(1);
  });

  it('calls events with arguments', done => {
    const expected1 = 'somethinghere';
    const expected2 = 'somethingElse';
    const emitter = new EventEmitter();

    emitter.on('foo', function (actual1, actual2) {
      expect(actual1).toBe(expected1);
      expect(actual2).toBe(expected2);
      done();
    });

    emitter._emit('foo', expected1, expected2);
  });

  it('aborts with callbacks that error', () => {
    const emitter = new EventEmitter();
    const thirdCallback = jest.fn();

    emitter.on('foo', function () {});

    emitter.on('foo', function () {
      throw new Error('danger zone!');
    });

    emitter.on('foo', thirdCallback);

    expect(function () {
      emitter._emit('foo');
    }).toThrowError('danger zone!');

    expect(thirdCallback).not.toBeCalled();
  });

  it('can check if event has listeners', () => {
    const emitter = new EventEmitter();
    const noop = jest.fn();

    emitter.on('a', noop);
    emitter.on('b', noop);
    emitter.off('b', noop);

    expect(emitter.hasListener('a')).toBe(true);
    expect(emitter.hasListener('b')).toBe(false);
    expect(emitter.hasListener('c')).toBe(false);
  });

  describe('createChild', () => {
    it('can create a child class', () => {
      let child;

      function ChildClass() {
        EventEmitter.call(this);
      }

      EventEmitter.createChild(ChildClass);

      child = new ChildClass();

      expect(child).toBeInstanceOf(EventEmitter);
    });
  });
});
