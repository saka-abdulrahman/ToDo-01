const toDo = document.getElementById("tasks");
const add = document.getElementById("add");

toDo.innerHTML = "";
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  {
    title: "hh",
    date: "eee",
    isDone: false,
  },
];

printTasks();

function printTasks() {
  toDo.innerHTML = "";
  let i = 0;

  for (let task of tasks) {
    let content = `
      <div class="to-do" style="background-color: ${doneColor(i)}">
        <h3 class="content">${task.title}</h3>
        <h5 class="date"><span>${task.date}</span></h5>
        <div class="buttons">
          <button onclick="deleteTask(${i})" class="to-do-btn deleteC" id="delete">
            <span class="material-symbols-outlined"> delete </span>
          </button>
          <button onclick="doneChange(${i})" class="to-do-btn" id="done"> 
            <span class="material-symbols-outlined"> ${changeDoneIcon(
              i
            )} </span>
          </button>
          <button onclick="editTaskTitle(${i})" class="to-do-btn" id="edit">
            <span class="material-symbols-outlined"> edit </span>
          </button>
        </div>
      </div>`;

    toDo.innerHTML += content;
    i++;
  }
}

add.addEventListener("click", () => {
  let taskTitle = prompt("Enter the task title");

  if (typeof taskTitle === "string" && taskTitle.trim() !== "") {
    let now = new Date();
    let date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

    let newTask = {
      title: taskTitle,
      date: date,
      isDone: false,
    };
    tasks.push(newTask);

    saveTasks();
    printTasks();
  }
});

function deleteTask(index) {
  let sure = confirm(`Are you sure to delete "${tasks[index].title}"?`);

  if (sure) {
    tasks.splice(index, 1);
    saveTasks();
    printTasks();
  }
}

function editTaskTitle(index) {
  let nwEdit = prompt(
    `Enter the new title of "${tasks[index].title}"`,
    tasks[index].title
  );

  if (typeof nwEdit === "string" && nwEdit.trim() !== "") {
    tasks[index].title = nwEdit;
    saveTasks();
    printTasks();
  }
}

function doneColor(index) {
  return tasks[index].isDone ? "rgb(158, 253, 160)" : "#e8dfca";
}

function doneChange(index) {
  tasks[index].isDone = !tasks[index].isDone;
  saveTasks();
  printTasks();
}

function changeDoneIcon(index) {
  return tasks[index].isDone ? "cancel" : "check_circle";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
