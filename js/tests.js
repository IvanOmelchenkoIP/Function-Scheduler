'use strict';

const FunctionScheduler = require('./functionScheduler.js');
const schedule = new FunctionScheduler();

const interval = 1500;
const counter = 3;

const tests = {
  fn1: () => {
    console.log("\n1-----");
    console.log("Adding no task and no arguments:\n");
    schedule.addTask();
  },
  fn2: () => {
    console.log("\n2-----");
    console.log("Adding null for task and arguments:\n");
    schedule.addTask(null, null);
  },
  fn3: () => {
    console.log("\n3-----");
    console.log("Adding undefined for task and arguments:\n");
    schedule.addTask(undefined, undefined);
  },
  fn4: () => {
    console.log("\n4-----");
    console.log("Adding wrong type task and arguments:\n");
    schedule.addTask("a", 8);
  },
  fn5: () => {
    console.log("\n5-----");
    console.log("Adding wrong type task but right type arguments:\n");
    schedule.addTask(1, [3, 5, 6]);
  },
  fn6: () => {
    console.log("\n6-----");
    console.log("Adding right type task and right type artguments:\n");
    schedule.addTask((a1, a2) => console.log(a1 + a2), [5, 4]);
    schedule.delTask();
  },
  fn7: () => {
    console.log("\n7-----");
    console.log("Adding task and artguments when one exists:\n");
    schedule.addTask((a1, a2) => console.log(a1 + a2), [4, 7]);
    schedule.addTask((a1, a2) => console.log(a1 - a2), [7, 4]);
    schedule.delTask();
  },
  fn8: () => {
    console.log("\n8-----");
    console.log("Deleting task with its arguments:\n");
    schedule.addTask((a1, a2) => console.log(a1 + a2), [4, 7]);
    schedule.delTask();
  },
  fn9: () => {
    console.log("\n9-----");
    console.log("Deleting task while there is no task:\n");
    schedule.delTask();
  },
  fn10: () => {
    console.log("\n10-----");
    console.log("Adding task that uses no arguments and deleting it after:\n");
    schedule.addTask(() => console.log(3), null);
    schedule.delTask();
  },
  fn11: () => {
    console.log("\n11-----");
    console.log("Adding task that uses no arguments:\n");
    schedule.addTask(() => console.log(3), null);
  },
  fn12: () => {
    console.log("\n12-----");
    console.log(
      "Adding task that uses no arguments with arguments of right type:\n"
    );
    schedule.addTask(() => console.log(true), [4, 7]);
  },
  fn13: () => {
    console.log("\n13-----");
    console.log(
      "Adding task that uses no arguments with arguments of wrong type and deleting it after:\n"
    );
    schedule.addTask(() => console.log(true), "abc");
    schedule.delTask();
  },
  fn14: () => {
    console.log("\n14-----");
    console.log("Running when no task:\n");
    schedule.runTask(1000, 4);
  },
  fn15: () => {
    console.log("\n15-----");
    console.log("Running when no task with wrong interval:\n");
    schedule.runTask("abc", 4);
  },
  fn16: () => {
    console.log("\n16-----");
    console.log("Running when no task when wrong counter:\n");
    schedule.runTask(1000, null);
  },
  fn17: () => {
    console.log("\n17-----");
    console.log("Running when no task when both parameters are wrong:\n");
    schedule.runTask(-20, 0);
  },
  fn18: () => {
    console.log("\n18-----");
    console.log("Running when there is task with wrong interval:\n");
    schedule.addTask((a1, a2) => console.log(a1 + a2), [5, 4]);
    schedule.runTask(undefined, 4);
  },
  fn19: () => {
    console.log("\n19-----");
    console.log("Running when there is task with wrong counter:\n");
    schedule.addTask((a1, a2) => console.log(a1 + a2), [5, 4]);
    schedule.runTask(2000, [3, 5]);
  },
  fn20: () => {
    console.log("\n20-----");
    console.log(
      "Running when there is task with wrong interval and counter:\n"
    );
    schedule.addTask((a1, a2) => console.log(a1 + a2), [5, 4]);
    schedule.runTask(undefined, () => 5);
  },
  fn21: () => {
    console.log("\n21-----");
    console.log("Running task correctly:\n");
    schedule.addTask((a1, a2) => console.log(a1 + a2), [5, 4]);
    schedule.runTask(interval / counter, counter);
  },
  fn22: () => {
    console.log("\n22-----");
    console.log("Running a task that uses no arguments correctly:\n");
    schedule.delTask();
    schedule.addTask(() => console.log(true), null);
    schedule.runTask(interval / counter, counter);
  },
  fn23: () => {
    console.log("\n23-----");
    console.log("Provocating wrong running:\n");
    schedule.delTask();
    schedule.addTask((a1, a2) => a1.a2(), [true, [1, 4, 5]]);
    schedule.runTask(interval / counter, counter);
  },
  fn24: () => {
    console.log("\n24-----");
    console.log("Adding a task and running it and trying to run same task:\n");
    schedule.delTask();
    schedule.addTask((a1, a2) => console.log(a1 - a2), [7, 4]);
    schedule.runTask(interval / counter, counter);
    schedule.runTask(interval / counter, counter);
  },
  fn25: () => {
    console.log("\n25-----");
    console.log("Adding a task while another one is running:\n");
    schedule.delTask();
    schedule.addTask((a1, a2) => console.log(a1 + a2), [7, 4]);
    schedule.runTask(interval / counter, counter);
    schedule.addTask((a1, a2) => console.log(a1 - a2), [7, 4]);
  },
  fn26: () => {
    console.log("\n26-----");
    console.log("Deleting a task while it is running:\n");
    schedule.delTask();
    schedule.addTask((a1, a2) => console.log(a1 + a2), [7, 4]);
    schedule.runTask(interval / counter, counter);
    schedule.delTask();
  },
  fn27: () => {
    console.log("\n27-----");
    console.log(
      "Adding a task, deleting a it while it is running and then adding and running new task:\n"
    );
    schedule.delTask();
    schedule.addTask((a1, a2) => console.log(a1 + a2), [7, 4]);
    schedule.runTask(interval / counter, counter);
    schedule.delTask();
    schedule.addTask((a1, a2) => console.log(a1 - a2), [7, 4]);
    schedule.runTask(interval / counter, counter);
  },
};

const launchTests = (obj) => {
  const keys = Object.keys(obj);
  let count = 0;
  console.log("\nLaunching Scheduler class tests:");
  const id = setInterval(() => {
    obj[keys[count]]();
    count++;
    if (count > keys.length) clearInterval(id);
  }, interval * 2);
};

launchTests(tests);