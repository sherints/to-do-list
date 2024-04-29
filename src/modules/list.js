import Task from "./task";
import Project from "./project";
import { compareAsc } from "date-fns";

export default class List {
  constructor() {
    this.projects = [];
    this.projects.push(new Project("Today"));
    this.projects.push(new Project("This Week"));
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(name) {
    return this.projects.find((project) => project.getName() === name);
  }

  contains(name) {
    return this.projects.some((project) => project.getName() === name);
  }

  addProject(newProject) {
    if (this.projects.find((project) => project.name === newProject.name)) {
      return;
    }
    this.projects.push(newProject);
  }

  deleteProject(name) {
    const toDelete = this.projects.find(
      (project) => project.getName() === name
    );
    this.projects.splice(this.projects.indexOf(toDelete), 1);
  }

  updateTodayProject() {
    this.getProject("Today").tasks = [];

    this.projects.forEach((project) => {
      if (project.getName() !== "Today" && project.getName() !== "This Week") {
        const todayTasks = project.getTasksToday();
        todayTasks.forEach((task) => {
            const taskName = `${task.getName()} (${project.getName()})`;
          this.getProject("Today").addTask(
            new Task(taskName, task.getDate(), task.getPriority(), task.getNotes())
          );
        });
      }
    });
  }

  updateWeekProject() {
    this.getProject("This Week").tasks = [];

    this.projects.forEach((project) => {
      if (project.getName() !== "Today" && project.getName() !== "This Week") {
        const weekTasks = project.getTasksThisWeek();
        weekTasks.forEach((task) => {
          const taskName = `${task.getName()} (${project.getName()})`;
          this.getProject("This Week").addTask(
            new Task(taskName, task.getDate(), task.getPriority(), task.getNotes())
          );
        });
      }
    });

    this.getProject("This Week").setTasks(
      this.getProject("This Week")
        .getTasks()
        .sort((taskA, taskB) => compareAsc(taskA.getDate(), taskB.getDate()))
    );
  }
}
