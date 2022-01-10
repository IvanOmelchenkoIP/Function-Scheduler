'use strict';

class FunctionScheduler {
  constructor() {
    this.task = null;
    this.args = null;
    this._active = false;
    this._intervalId = null;

    this._errMsg = {
      add: `There was a error adding your task!
Make sure you entered correct task parameters or delete current task!`,
      run: `There was a error running your task!
Make sure there is a task to run with correct arguments, you entered pasrameters correctly or there is no task running!`,
    };
  }

  addTask(func, params) {
    if (!this._canAdd(func, params)) return this._err(this._errMsg['add']);

    this.task = func;
    this.args = params;

    console.log(`Your task and its arguments were added.\n`);
  }

  _canAdd(func, params) {
    if (this.task) return false;
    if (this.args) return false;

    if (!func || typeof func !== 'function') return false;
    if (func.length && (!params || !Array.isArray(params))) return false;

    return true;
  }

  runTask(interval = null, counter = 1) {
    if (!this._canRun(interval, counter)) return this._err(this._errMsg['run']);

    this._active = true;
    console.log(`Your task started its execution with set parameters.\n`);
    const intervalId = setInterval(() => {
      if (counter == 0) this._clearTask(intervalId);
      try {
        console.log(`Your task was finished. Results:\n`);
        this.task.length ? this.task(...this.args) : this.task();
      } catch (err) {
        this._err(this._errMsg['run']);
        console.error(err);
        clearInterval(intervalId);
        this._active = false;
        return;
      }
      counter--;
    }, interval);
  }

  _clearTask(intervalId) {
    clearInterval(intervalId);
    this._active = false;
    console.log(`Execution of your task was stopped.\n`);
  }

  _canRun(interval, counter) {
    if (this._active) return false;

    if (!interval || !+interval || interval <= 0) return false;
    if (!counter || !+counter || counter < 1) return false;

    if (!this.task) return false;
    if (this.task.length && !this.args) return false;

    return true;
  }

  delTask() {
    this.task = null;
    this.args = null;
    this.active = false;

    console.log(`Current task and its arguments were deleted. 
Active task execution was stopped.\n`);
  }

  _err(msg) {
    if (!msg) return;
    console.log(`Your command could not be executed.\n${msg}\n`);
  }
}

module.exports = FunctionScheduler;
