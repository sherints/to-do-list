import { format } from "date-fns";
import Project from "./project";
import Task from "./task";
import List from "./list";

export default class make_UI {

  addProject(project) {
    const projectContainer = document.querySelector(".project-container");
    const btnWrapper = document.createElement("div");

    btnWrapper.classList.add("proj-btn-wrapper");
    btnWrapper.classList.add(project.getFormattedName());

    const newProject = document.createElement("button");
    const removeBtn = document.createElement("button");

    // removeBtn.textContent = "x";
    removeBtn.classList.add("proj-remove-btn");

    newProject.textContent = project.getName();
    newProject.classList.add("proj-button");

    btnWrapper.appendChild(removeBtn);
    btnWrapper.appendChild(newProject);

    projectContainer.appendChild(btnWrapper);
    newProject.addEventListener("click", () => {
      
      this.switchProject(project);
    });
  }

  loadProjects(projects) {
    const projectContainer = document.querySelector(".project-container");
    for (let project of projects) {
      if (project.getName() === "Today" || project.getName() === "This Week")
        continue;
      const btn = document.createElement("button");
      const removeBtn = document.createElement("button");
      removeBtn.addEventListener("click", () => {
        this.removeProject(project);
      });
      removeBtn.textContent = "X";
      removeBtn.classList.add("proj-remove-btn");
      btn.appendChild(removeBtn);
      btn.textContent = project.getName();
      btn.style.width = "100%";
      btn.addEventListener("click", () => {
        document.querySelector(".task-page").innerHTML = "";
        this.loadTasks(project);
      });
      projectContainer.appendChild(btn);
    }
  }

  // project is a Project()
  loadTasks(project) {
    project.sortTasksByPriority();
    const taskContainer = document.querySelector(".tasks-container");
    taskContainer.innerHTML = "";
    document.querySelector(".curr-proj-name").textContent = project.getName();
    for (let task of project.getTasks()) {
      taskContainer.innerHTML += `
            <div class='task-wrapper'>
              <div class='task-closed-wrapper'>
                <button class='task-remove-btn'>X</button>
                <div class='task-info-wrapper'>
                  <button class='task-btn'>${task.getName()}</button>
                  <p class='task-notes'>${task.getNotes()}</p>
                </div>
                <p class='due-date'>${task.getFormattedDate()}</p>
                <p class='task-priority' style='display: flex; justify-content: center; align-items: center; background: ${task.getPriorityColor()}'>${task.getPriorityText()}</p>
              </div>
            </div>
            `;

    }
    if (project.getName() === "Today" || project.getName() === "This Week") {
      document.querySelector(".add-task-btn").style.display = "none";
    } else {
      document.querySelector(".add-task-btn").style.display = "block";
    }
    for (const task of document.querySelectorAll(".task-closed-wrapper")) {
      task.querySelector('.task-remove-btn').addEventListener("click", () => {
        const taskName = task.querySelector('.task-btn').textContent;
        project.deleteTask(taskName);
        this.removeTask(taskName)
      });
    }
  }

  switchProject(newProject) {
    document.querySelector(".tasks-container").innerHTML = "";
    this.loadTasks(newProject);
  }

  removeProject(toRemove) {
    for (const project of document
      .querySelector(".project-container")
      .querySelectorAll(".proj-btn-wrapper")) {
      const projButton = project.querySelector(".proj-button");
      if (projButton.textContent === toRemove.getName()) {
        document
          .querySelector(".project-container")
          .removeChild(projButton.parentNode);
        break;
      }
    }
  }

  removeTask(taskName) {
    const taskContainer = document.querySelector(".tasks-container");
    for (const taskWrapper of taskContainer.querySelectorAll(".task-wrapper")) {
      if (taskWrapper.querySelector(".task-btn").textContent === taskName) {
        taskContainer.removeChild(taskWrapper);
        break;
      }
    }
  }
}
