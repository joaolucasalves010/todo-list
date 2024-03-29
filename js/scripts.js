// seleção de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const searchInput = document.querySelector("#search-input")
const eraseBtn = document.querySelector("#erase-button")
const filterBtn = document.querySelector("#filter-select")

let oldInputValue

// funções
function verifyValue(value) {
  if (!value) return // se não tiver nenhum valor o evento n executa
  else {
    return value // retorna valor do input
  }
}

function saveTodo(text, done = 0, save = 1) {
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

  // utilizando dados da localStorage
  if (done) {
    todo.classList.add("done")
  }

  if (save) {
    saveTodoLocalStorage({ text, done })
  }

  todo.appendChild(todoTitle)
  todo.appendChild(doneBtn)
  todo.appendChild(editBtn)
  todo.appendChild(removeBtn)
  todoList.appendChild(todo)

  todoInput.value = "" // Resetar texto do input
  todoInput.focus()
}

function toggleForms() {
  editForm.classList.toggle("hide")
  todoForm.classList.toggle("hide")
  todoList.classList.toggle("hide")
}

function updateTodo(text) {
  const todos = document.querySelectorAll(".todo")

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3")

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text

      updateTodoStatusLocalStorage(oldInputValue, text)
    }
  })
}

function getSearchTodos(text) {
  const todos = document.querySelectorAll(".todo")

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3").innerText.toLowerCase()

    const normalizedSearch = text.toLowerCase()

    if (!todoTitle.includes(normalizedSearch)) {
      todo.style.display = "none"
    } else {
      todo.style.display = "flex"
    }
  })
}

function filterTodoTask(task) {
  const todos = document.querySelectorAll(".todo")

  if (task === "all") {
    todos.forEach((todo) => {
      todo.style.display = "flex"
    })
  } else if (task === "done") {
    todos.forEach((todo) => {
      todo.classList.contains("done")
        ? (todo.style.display = "flex")
        : (todo.style.display = "none")
    })
  } else {
    todos.forEach((todo) => {
      todo.classList.contains("done")
        ? (todo.style.display = "none")
        : (todo.style.display = "flex")
    })
  }
}

function loadTodos() {
  const todos = getTodosLocalStorage()

  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0)
  })
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

todoForm.addEventListener("keyup", (e) => {
  e.preventDefault()

  const inputValue = verifyValue(todoInput.value) // verificar se tem algo no input

  if (inputValue && e.key === "Enter") {
    //save todo
    saveTodo(inputValue)
  }
})

document.addEventListener("click", (e) => {
  const targetEl = e.target // recebe elemento a qual nos clicarmos
  const parentEl = targetEl.closest("div") // recebe a div mais proxima do elemento
  let todoTitle

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText
  }
  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.add("done") // adiciona a classe done para o elemento

    updateTodoStatusLocalStorage(todoTitle)
  }
  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove() // remove elemento pai e seus filho

    removeTodoLocalStorage(todoTitle)
  }
  if (targetEl.classList.contains("edit-todo")) {
    toggleForms()

    editInput.value = todoTitle
    oldInputValue = todoTitle
  }
})

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault()

  toggleForms()
})

editForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const editInputValue = editInput.value

  if (editInputValue) {
    updateTodo(editInputValue)
  }

  toggleForms()
})

searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value

  console.log(search)

  getSearchTodos(search)
})

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault()

  searchInput.value = ""

  searchInput.dispatchEvent(new Event("keyup"))
})

filterBtn.addEventListener("click", (e) => {
  const filterTodo = e.target.value

  console.log(filterTodo)

  filterTodoTask(filterTodo)
})

// local storage
const getTodosLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || []

  return todos
}

const saveTodoLocalStorage = (todo) => {
  const todos = getTodosLocalStorage() // todos os todos da ls se n tiver nada retorna um arr vazio

  todos.push(todo) /// adiocionar novo todo no arr

  localStorage.setItem("todos", JSON.stringify(todos)) // salvar na tudo na ls
}

const removeTodoLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage()

  const filteredTodos = todos.filter((todo) => todo.text !== todoText)

  localStorage.setItem("todos", JSON.stringify(filteredTodos))
}

const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage()

  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
  )

  localStorage.setItem("todos", JSON.stringify(todos))
}

const uptadeTodoLocalStorage = (todoText, todoNewText) => {
  const todos = getTodosLocalStorage()

  todos.nap((todo) => {
    todo.text === todoText ? (todo.text = todoNewText) : null
  })

  localStorage.setItem("todos", JSON.stringify(todos))
}

loadTodos()
