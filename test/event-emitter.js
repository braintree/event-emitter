'use strict';

var EventEmitter = require('../event-emitter');
var sinon = require('sinon');

describe('EventEmitter', function () {
  it('can emit when no one is listening', function () {
    var emitter = new EventEmitter();

    expect(function () {
      emitter._emit('foo');
    }).not.to.throw();
  });

  it('can subscribe to events', function (done) {
    var emitter = new EventEmitter();

    emitter.on('foo', function () {
      done();
    });

    emitter._emit('foo');
  });

  it('can unsubscribe from events', function () {
    var emitter = new EventEmitter();
    var spy = sinon.stub();

    emitter.on('foo', spy);

    emitter.off('foo', spy);

    emitter._emit('foo');

    expect(spy.callCount).to.equal(0);
  });

  it('does not error when unsubscribing from an event that does not exist', function () {
    var emitter = new EventEmitter();
    var spy = sinon.stub();

    expect(function () {
      emitter.off('foo', spy);
    }).to.not.throw();
  });

  it('only unsubscribes from specific function', function () {
    var emitter = new EventEmitter();
    var spy1 = sinon.stub();
    var spy2 = sinon.stub();
    var spy3 = sinon.stub();

    emitter.on('foo', spy1);
    emitter.on('foo', spy2);
    emitter.on('foo', spy3);

    emitter.off('foo', spy2);

    emitter._emit('foo');

    expect(spy1.callCount).to.equal(1);
    expect(spy2.callCount).to.equal(0);
    expect(spy3.callCount).to.equal(1);
  });

  it('calls events with arguments', function (done) {
    var expected1 = 'somethinghere';
    var expected2 = 'somethingElse';
    var emitter = new EventEmitter();

    emitter.on('foo', function (actual1, actual2) {
      expect(actual1).to.equal(expected1);
      expect(actual2).to.equal(expected2);
      done();
    });

    emitter._emit('foo', expected1, expected2);
  });

  it('aborts with callbacks that error', function () {
    var emitter = new EventEmitter();
    var thirdCallback = sinon.stub();

    emitter.on('foo', function () {});

    emitter.on('foo', function () {
      throw new Error('danger zone!');
    });

    emitter.on('foo', thirdCallback);

    expect(function () {
      emitter._emit('foo');
    }).to.throw('danger zone!');

    expect(thirdCallback).not.to.have.beenCalled;
  });

  it('can check if event has listeners', function () {
    var emitter = new EventEmitter();
    var noop = sinon.stub();

    emitter.on('a', noop);
    emitter.on('b', noop);
    emitter.off('b', noop);

    expect(emitter.hasListener('a')).to.equal(true);
    expect(emitter.hasListener('b')).to.equal(false);
    expect(emitter.hasListener('c')).to.equal(false);
  });

  describe('createChild', function () {
    it('can create a child class', function () {
      var child;

      function ChildClass() {
        EventEmitter.call(this);
      }

      EventEmitter.createChild(ChildClass);

      child = new ChildClass();

      expect(child).to.be.an.instanceof(EventEmitter);
    });
  });
});
