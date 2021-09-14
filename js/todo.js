const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
const LINE = "line";

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
function checkToDo(event){
  const li = event.target.parentElement;
  const span = li.querySelector("span");
  const check = li.querySelector("#check");
  span.classList.toggle(LINE); 

  if(span.classList.contains(LINE)){
    span.classList.add(LINE);
    check.innerText = "✓";
  }else{
    span.classList.remove(LINE);
    check.innerText = "";
  }

  for(let i=0; i < toDos.length; i++){
    if (toDos[i].id == li.id){
      toDos[i].checked = span.classList.contains(LINE);
    }
  }
  
  saveToDos();
}
function paintToDo(toDoObj) {
  const li = document.createElement("li");
  const check = document.createElement("button");
  const span = document.createElement("span");
  const button = document.createElement("button");

  li.id = toDoObj.id;
  check.id = "check"; 
  span.innerText = toDoObj.text;
  button.innerText = "✗";

  li.appendChild(check);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);

  if(toDoObj.checked){
    span.classList.add(LINE);
    check.innerText = "✓";
  }else{
    span.classList.remove(LINE);
    check.innerText = "";
  }

  check.addEventListener("click", checkToDo);
  button.addEventListener("click", deleteToDo);
}

function handleToDoSubmit(event) {
  event.preventDefault();

  const newToDoObj = {
    id: Date.now(),
    text: toDoInput.value,
    checked: false
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
  toDos.forEach(paintToDo);
}