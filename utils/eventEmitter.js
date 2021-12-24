export class EventEmitter {
  constructor() {
    this.name = "EventEmitter";
    this.resolvers = {};
  }

  on(eventName, callback) {
    new Promise((resolve, reject) => {
      if (!this.resolvers[eventName]) {
        this.resolvers[eventName] = {};
      }
      this.resolvers[eventName].resolver = resolve;
      this.resolvers[eventName].rejecter = reject;
    })
      .then(() => {
        callback();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  emit(eventName) {
    this.resolvers[eventName].resolver();
  }

  stop(eventName) {
    this.resolvers[eventName].rejecter();
  }
}

class RouterEmitter extends EventEmitter {
  constructor() {
    super();
    this.name = "RouterEmitter";
  }
}
