import { format } from "date-fns";

export default class Task {
  constructor(name, dueDate, priority = 0, notes = "") {
    this.name = name;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getPriority() {
    return this.priority;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  getPriorityText() {
    switch (parseInt(this.priority)) {
      case 0:
        return "Low";
      case 1:
        return "Medium";
      case 2:
        return "High";
    }
  }

  getPriorityColor() {
    switch (parseInt(this.priority)) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "red";
    }
  }

  getNotes() {
    return this.notes;
  }

  setNotes(notes) {
    this.notes = notes;
  }

  setDate(date) {
    this.dueDate = date;
  }

  getDate() {
    return this.dueDate;
  }

  getFormattedDate() {
    return format(this.dueDate, "MM/dd/yyyy");
  };

  getFormattedName() {
    return this.name.replace(/[^a-zA-Z0-9]/g, "");
  }
}
