export function getterify(obj, objName = "unnamed dictionary") {
  Object.defineProperty(obj, "get", {
    enumerable: false,
    value(name) {
      if (!this.hasOwnProperty(name)) {
        throw TypeError(`Property "${name}" not found in ${objName}`);
      }

      return this[name];
    },
  });

  return obj;
}
