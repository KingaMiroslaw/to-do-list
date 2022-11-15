let todoInput; 
let errorInfo; 
let addBtn;
let ulList;

let popup; 
let popupInfo; 
let todoToEdit; 
let popupInput; 
let popupAddBtn; 
let popupCloseBtn; 

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
}; 

const prepareDOMElements = () => {
  todoInput = document.querySelector(".todo-input");
  errorInfo = document.querySelector(".error-info");
  addBtn = document.querySelector(".btn-add");
  ulList = document.querySelector(".todolist ul");

  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupInput = document.querySelector(".popup-input");
  popupAddBtn = document.querySelector(".accept");
  popupCloseBtn = document.querySelector(".cancel");
}; 

const prepareDOMEvents = () => {
  addBtn.addEventListener("click", addNewToDo);
  ulList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener("click", closePopup);
  popupAddBtn.addEventListener("click", changeTodoText);
  todoInput.addEventListener("keyup", enterKeyCheck);
}; 

const addNewToDo = () => {
  if (todoInput.value !== "") {
    const newToDo = document.createElement("li");
    newToDo.textContent = todoInput.value;
    createToolsArea(newToDo);

    ulList.append(newToDo);

    todoInput.value = "";
    errorInfo.textContent = "";
  } else {
    errorInfo.textContent = "Enter the content of the task!";
  }
};

const createToolsArea = (newToDos) => {
  const toolsPanel = document.createElement("div");
  toolsPanel.classList.add("tools");
  newToDos.append(toolsPanel); 

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.textContent = "EDIT";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
  if (e.target.matches(".complete")) {
    console.log("complete");
    e.target.closest("li").classList.toggle("completed"); 
    e.target.classList.toggle("completed");
  } else if (e.target.matches(".edit")) {
    editTodo(e);
  } else if (e.target.matches(".delete")) {
    deleteTodo(e);
  }
};

const editTodo = (e) => {
  todoToEdit = e.target.closest("li");
  popupInput.value = todoToEdit.firstChild.textContent.trim();
  console.log(todoToEdit.firstChild);
  popup.style.display = "flex";
};

const closePopup = () => {
  popup.style.display = "none";
  popupInfo.textContent = "";
};

const changeTodoText = () => {
  if (popupInput.value !== "") {
    todoToEdit.firstChild.textContent = popupInput.value;
    popup.style.display = "none";
    popupInfo.textContent = "";
  } else {
    popupInfo.textContent = "You must provide some content!";
  }
};

const deleteTodo = (e) => {
  e.target.closest("li").remove();

  const allTodos = ulList.querySelectorAll("li");

  if (allTodos.length === 0) {
    errorInfo.textContent = "No tasks on the list!";
  }
};

const enterKeyCheck = (e) => {
  if (e.key === "Enter") {
    addNewToDo();
  }
};

document.addEventListener("DOMContentLoaded", main);
