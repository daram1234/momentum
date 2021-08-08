const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((todo)=>todo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(toDoObj) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");

  li.id = toDoObj.id;
  span.innerText = toDoObj.text;
  button.innerText = "X";

  li.appendChild(button);
  li.appendChild(span);
  toDoList.appendChild(li);

  button.addEventListener("click", deleteToDo);
}

function handleToDoSubmit(event) {
  event.preventDefault();

  const newToDoObj = {
    id: Date.now(),
    text: toDoInput.value
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDos();

  toDoInput.value = "";
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = JSON.parse(localStorage.getItem(TODOS_KEY));

if (savedToDos) {
  toDos = savedToDos;
  toDos.forEach( paintToDo);
}