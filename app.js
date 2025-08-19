const listContainer = document.getElementById("list-container");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const showCompletedInput = document.getElementById("show-completed");

let filters = { showCompleted: false };
let tasks = [];

showCompletedInput.addEventListener("change", (e) => {
  filters.showCompleted = e.target.checked;
  renderPage();
});

const saveTaskToStorage = () =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

//use local storage

//create a todo
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(taskForm);
  const userInput = formData.get("task-input");
  taskInput.value = "";

  // validation
  if (!userInput) {
    return alert("add some text please!");
  }

  tasks.push({
    timestamp: new Date(),
    description: userInput,
    complete: false,
  });
  saveTaskToStorage();
  renderPage();
});

//create delete button
const deleteTaskBtn = (task) => {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";

  //event function
  deleteBtn.addEventListener("click", () => {
    const taskIndex = task.indexOff(task);
    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
    }

    saveTaskToStorage();
    renderPage();
  });

  return deleteBtn;
};
// eddit button
const editTaskBtn = (task, inputElement) => {
  const editTaskBtn = document.createElement("button");
  editTaskBtn.classList.add("edit-button");
  editTaskBtn.textContent = "edit";

  editTaskBtn.addEventListener("click", () => {
    inputElement.readOnly = !inputElement.readOnly;
    editTaskBtn.textContent = inputElement.readOnly ? "edit" : "Save";
    task.description = inputElement.value;
    saveTaskToStorage();
  });

  return editTaskBtn;
};

const completeTaskInput = (task) => {
  const inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.checked = task.complete;

  inputElement.addEventListener("change", (e) => {
    task.complete = e.target.checked;
    saveTaskToStorage();
    renderPage();
  });
  return inputElement;
};

// load in each individual task
const buildPage = (tasks) => {
  listContainer.replaceChildren(); // recomended
  // listContainer.innerHTML = ""; can use not recomended
  // loop over task create some elements
  tasks.forEach((task) => {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const descriptionElement = document.createElement("input");
    descriptionElement.classList.add("description");
    descriptionElement.value = task.description;
    descriptionElement.readOnly = true;

    taskContainer.append(
      descriptionElement,
      completeTaskInput(task),
      editTaskBtn(task, descriptionElement),
      deleteTaskBtn(tasks)
    );

    listContainer.append(taskContainer);
  });
};

const filterArray = (tasks) => {
  return tasks.filter((task) => filters.showCompleted || !task.complete);
};

// render our page
const renderPage = () => {
  //load in task from local storage
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  // add some filters a-z newest to oladest

  buildPage(filterArray(tasks));
};

renderPage();

/* localStorage.setItem("tasks", JSON.stringify(tasks))
localStorage.getItem("tasks") */ //save to local storage
