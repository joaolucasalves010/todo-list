// seleção de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")

// funções
function verifyValue(value) {
  if (!value) return // se não tiver nenhum valor o evento n executa
  else {
    return value // retorna valor do input
  }
}

function saveTodo(text) {
  const todo = document.createElement("div")
  todo.classList.add("todo")

  const todoTitle = document.createElement("h3") // criando h3
  todoTitle.innerText = text // definindo titulo
  todo.appendChild(todoTitle) // colocando na div

  const doneBtn = document.createElement("button") // criando botão
  doneBtn.classList.add("finish-todo") // adicionando class finish-todo
  doneBtn.innerHTML = `<i class="fa-solid fa-check"></i>` // template literals do icone do botão

  const editBtn = document.createElement("button")
  editBtn.classList.add("edit-todo")
  editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`

  const removeBtn = document.createElement("button")
  removeBtn.classList.add("remove-todo")
  removeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`

  todo.appendChild(todoTitle)
  todo.appendChild(doneBtn)
  todo.appendChild(editBtn)
  todo.appendChild(removeBtn)
  todoList.appendChild(todo)

  todoInput.value = "" // Resetar texto do input
  todoInput.focus()
}

// eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const inputValue = verifyValue(todoInput.value) // verificar se tem algo no input

  if (inputValue) {
    //save todo
    saveTodo(inputValue)
  }
})
