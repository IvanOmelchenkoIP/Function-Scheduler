'use strict';

class TaskContainer {
  constructor() {
    this.tasks = new Map();

    //will be applied, if no arguments are applied while running
    this.defaultArgs = new Map();
    //added to applied or default arguments at ther end of the argument array
    this.boundArgs = new Map();

    this.taskAmount = new Map();
  }

  addTask(name, func) {
    const task = this.tasks.get(name);
    if (!task) {
      this.tasks.set(name, [func]);
    } else {
      const max = this.taskAmount.get(name);
      if (max && task.length > max) return;
      task.push(func);
    }
    return this;
  }

  deleteTask(name) {
    if (name) {
      this.tasks.delete(name);
      this.defaultArgs.delete(name);
      this.boundArgs.delete(name);
      this.taskAmount.delete(name);
    } else {
      this.tasks.clear();
      this.defaultArgs.clear();
      this.boundArgs.clear();
      this.taskAmount.clear();
    }
    return this;
  }

  setDefaultArgs(name, ...args) {
    const task = this.tasks.get(name);
    if (!task) return;

    args = args || new Array();
    this.defaultArgs.set(name, args);

    return this;
  }

  setBoundArgs(name, ...args) {
    const task = this.tasks.get(name);
    if (!task) return;

    args = args || new Array();
    this.boundArgs.set(name, args);

    return this;
  }

  getTasks(name) {
    const task = this.tasks.get(name);
    if (!task) return undefined;
    return task;
  }

  getTaskArguments(name) {
    const task = this.tasks.get(name);
    if (!task) return undefined;

    return [this.defaultArgs.get(name), this.boundArgs.get(name)];
  }

  setMaxTasks(names, amount) {
    amount = amount > 0 ? amount : null;

    if (names === null) {
      names = this.task.keys;
      for (const name of names) {
        const task = this.tasks.get(name);
        if (!task) continue;
        this.taskNum.set(name, amount);
      }
      return this;
    }

    const many = Array.isArray(names);
    if (many) {
      for (const name of names) {
        const task = this.tasks.get(name);
        if (!task) continue;
        this.taskAmount.set(name, amount);
      }
    } else {
      const name = names;
      const task = this.tasks.get(name);
      if (!task) return;
      this.taskAmount.set(name, amount);
    }
    return this;
  }
}

module.exports = TaskContainer;
