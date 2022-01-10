'use strict';

const TaskContainer = require('./taskContainer.js');
const FunctionScheduler = require('./functionScheduler.js');

const container = new TaskContainer();
const scheduler = FunctionScheduler.of(container);

container
  .addTask('t1', (x) => console.log(`Task1 fn.1, ${x}`))
  .setMaxTasks('t1', 3)
  .addTask('t1', (x) => console.log(`Task1 fn.2, ${x}`))
  .addTask('t1', (x) => console.log(`Task1 fn.3, ${x}`))
  .setDefaultArgs('t1', 'default_arg');

scheduler.run('t1', 500, 5);

setTimeout(() => {
  console.log('pasued');
  scheduler.pause('t1');
}, 1300);
setTimeout(() => {
  console.log('resumed');
  scheduler.resume('t1');
}, 1400);
