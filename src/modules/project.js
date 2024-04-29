import { toDate, isToday, isThisWeek, subDays } from "date-fns";

export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getFormattedName() {
    return this.name.replace(/[^a-zA-Z0-9]/g, "");
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  findTask(taskName) {
    return this.tasks.find((task) => task.getName() === taskName);
  }

  contains(taskName) {
    return this.tasks.some((task) => task.getName() === taskName);
  }

  addTask(newTask) {
    if (!this.tasks.find((task) => task.getName() === newTask.name)) {
      this.tasks.push(newTask);
    }
  }

  deleteTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.name !== taskName);
  }

  getTasksToday() {
    return this.tasks.filter((task) => {
      return isToday(task.getDate());
    });
  }

  getTasksThisWeek() {
    return this.tasks.filter((task) => {
      return isThisWeek(task.getDate());
    });
  }

  sortTasksByPriority() {
    this.tasks.sort((a, b) => {
      return b.getPriority() - a.getPriority();
    });
  }
}
