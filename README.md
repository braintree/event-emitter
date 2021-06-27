# event-emitter

A helper module for creating objects with event emitter capabilities.

## Installation

**npm**

```bash
npm install --save @braintree/event-emitter
```

This module uses commonjs. You must use a build tool such as [Browserify](http://browserify.org/) or [Webpack](https://webpack.js.org/) to include it in your frontend project.

## Usage

### Creating an Object that Inherits from Event Emitter

```js
import EventEmitter from "@braintree/event-emitter";

class MyClass extends EventEmitter() {
  // my class definition
}

const emitter = new MyClass();
```

### Listen for events

```js
emitter.on("event-name", function (data) {
  console.log("called with", data.payload, "!");
});

emitter.emit("event-name", { payload: "foo" }); // logs "called with foo!"
```

### Unsubscribe from events

```js
const cb = function () {};

emitter.on("event-name", cb);
emitter.off("event-name", cb);

emitter.emit("event-name", { payload: "foo" }); // cb is not called
```

## Tests

```bash
npm test
```
