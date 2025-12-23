const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);
addBtn.addEventListener("click", addTask);

// إضافة مهمة
function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  createTaskElement(task);
  saveTask(task);
  taskInput.value = "";
}

// إنشاء عنصر المهمة
function createTaskElement(task) {
  const li = document.createElement("li");
  li.textContent = task.text;
  li.dataset.id = task.id;

  if (task.completed) {
    li.classList.add("completed");
  }

  // إكمال المهمة
  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    toggleTask(task.id);
  });

  // زر الحذف
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "delete-btn";

  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    li.remove();
    deleteTask(task.id);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// LocalStorage
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => createTaskElement(task));
}

function deleteTask(id) {
  let tasks = getTasks();
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTask(id) {
  const tasks = getTasks();
  tasks.forEach(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
