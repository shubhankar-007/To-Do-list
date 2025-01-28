document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
  
    // Load tasks from localStorage
    function loadTasks() {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      savedTasks.forEach(taskText => {
        createTaskItem(taskText);
      });
    }
  
    // Save tasks to localStorage
    function saveTasks() {
      const tasks = Array.from(taskList.children).map(item => item.querySelector("span").textContent);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Create task list item
    function createTaskItem(taskText) {
      const listItem = document.createElement("li");
      listItem.className = "task-item";
  
      // Task text
      const taskSpan = document.createElement("span");
      taskSpan.textContent = taskText;
  
      // Buttons container
      const buttonContainer = document.createElement("div");
  
      // Edit button
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "edit-btn";
  
      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
  
      // Append buttons to container
      buttonContainer.appendChild(editBtn);
      buttonContainer.appendChild(deleteBtn);
  
      // Append elements to list item
      listItem.appendChild(taskSpan);
      listItem.appendChild(buttonContainer);
  
      // Append list item to the task list
      taskList.appendChild(listItem);
  
      // Add event listeners for edit and delete buttons
      editBtn.addEventListener("click", () => editTask(taskSpan));
      deleteBtn.addEventListener("click", () => deleteTask(listItem));
    }
  
    // Function to add a task
    function addTask() {
      const taskText = taskInput.value.trim(); // Remove unnecessary spaces
      if (!taskText) {
        alert("Task cannot be empty.");
        return;
      }
  
      createTaskItem(taskText);
      saveTasks();
      taskInput.value = "";
    }
  
    // Function to edit a task
    function editTask(taskSpan) {
      const newTask = prompt("Edit your task:", taskSpan.textContent);
      if (newTask !== null && newTask.trim() !== "") {
        taskSpan.textContent = newTask.trim();
        saveTasks();
      }
    }
  
    // Function to delete a task
    function deleteTask(listItem) {
      taskList.removeChild(listItem);
      saveTasks();
    }
  
    // Add task on button click
    addTaskBtn.addEventListener("click", addTask);
  
    // Add task on Enter key press
    taskInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        addTask();
      }
    });
  
    // Load tasks on page load
    loadTasks();
  });
  