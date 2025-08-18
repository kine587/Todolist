const listContainer = document.getElementById("list-container");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");

let tasks = [];

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

// load in each individual task
const buildPage = (tasks) => {
  listContainer.replaceChildren(); // recomended
  // listContainer.innerHTML = ""; can use not recomended
  // loop over task create some elements
  tasks.forEach((task) => {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("description");
    descriptionElement.textContent = task.description;

    taskContainer.append(descriptionElement);

    listContainer.append(taskContainer);
  });
};

// render our page
const renderPage = () => {
  //load in task from local storage
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  // add some filters a-z newest to oladest

  buildPage(tasks);
};

renderPage();
