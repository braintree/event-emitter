# CHANGELOG

## UNRELEASED

- Update (sub-)dependencies
  - cross-spawn to 7.0.6
  - micromatch to 4.0.8
  - picomatch to 2.3.1

## 2.0.1

- Update braces to 3.0.3

## 2.0.0

 - BREAKING CHANGES
   - Update to node v18

 - Dev Dependency Updates
   - Update eslint to v8.47.0
   - Update eslint-plugin-prettier to v5
   - Update jest to v29.5.0
   - Update prettier to v3
   - Update typescript to v5.1.65

## 1.0.2

- Revert incorrect Typescript typing where callback function for `on`

## 1.0.1

- Correct Typescript typing where callback function for `on` does not require an argument

## 1.0.0

- in Typescript, `on` can specify event payload type as a Generic

  ```typescript
  type EventPayload = {
    foo: string;
  };

  emitter.on<EventPayload>("event-name", (payload) => {
    // payload is of type EventPayload
  });
  ```

_Breaking Changes_

- remove `createChild` helper
- `_emit` has been renamed to `emit`
- `emit` now only takes one event payload argument instead of any number of arguments

## 0.4.1

- Add missing type defs to package

## 0.4.0

- Add typescript types

## 0.3.0

- Fix issue where `off` would throw an error if no events existed for named event
- Add `hasListener` method

## 0.2.0

- Add `off` method

## 0.1.0

- Initial release
