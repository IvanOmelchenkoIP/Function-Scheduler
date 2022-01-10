'use strict';

class FunctionScheduler {
  constructor(taskContainer) {
    this.container = taskContainer;

    this.intervalIds = new Object(null);
    this.counters = new Object(null);
    this.currentArgs = new Object(null);
    this.intervalTimes = new Object(null);
  }

  static of(taskContainer) {
    return new FunctionScheduler(taskContainer);
  }

  run(name, interval = 0, counter = 1, ...tmpArgs) {
    const taskArgs = this.container.getTaskArguments(name);
    const [defaultArgs, boundArgs] = taskArgs;
    const primaryArgs = tmpArgs[0] === undefined ? defaultArgs : tmpArgs;
    const args = primaryArgs.concat(boundArgs);
    this.currentArgs[name] = primaryArgs;

    let idAssigned = false;
    this.counters[name] = counter > 0 ? counter : 0;
    this.intervalTimes[name] = interval;
    const id = setInterval(() => {
      const tasks = this.container.getTasks(name);
      if (!idAssigned) {
        this.intervalIds[name] = id;
        idAssigned = true;
      }

      if (this.counters[name] === 0 || !tasks) {
        this.intervalTimes[name] = null;
        this.currentArgs[name] = null;
        this.stop(name);
        return;
      }

      for (const task of tasks) {
        if (task.length) task(...args);
        else task();
      }

      this.counters[name]--;
    }, interval);
  }

  stop(name) {
    if (name) {
      const id = this.intervalIds[name];
      if (id) {
        clearInterval(id);
        this.intervalIds[name] = null;
      }
    } else {
      names = Object.keys(this.intervalIds);
      for (const name of names) {
        const id = this.intervalIds[name];
        clearInterval(id);
        this.intervalIds[name] = null;
      }
    }
  }

  pause(name) {
    this.stop(name);
  }

  resume(name) {
    if (name) {
      const counter = this.counters[name];
      const interval = this.intervalTimes[name];
      const args = this.currentArgs[name];
      const running = this.intervalIds[name];
      if (counter && !running) this.run(name, interval, counter, ...args);
    } else {
      const names = Object.keys(this.counters);
      for (const name of names) {
        const counter = this.counters[name];
        const interval = this.intervalTimes[name];
        const args = this.currentArgs[name];
        const running = this.intervalIds[name];
        if (!running)this.run(name, interval, counter, ...args);
      }
    }
  }
}

module.exports = FunctionScheduler;
