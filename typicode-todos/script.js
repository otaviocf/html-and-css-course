const input = document.querySelector('input')
const addButton = document.querySelector('#add-item')
const incompleteTasks = document.querySelector('.incomplete-tasks')
const completeTasks = document.querySelector('.complete-tasks')
const tasks = document.querySelector('.task')
const amountIncomplete = document.querySelector('#amount-incomplete')
const amountCompleted = document.querySelector('#amount-completed')
const APIurl = 'https://jsonplaceholder.typicode.com/todos'


function addTask(event) {
  event.preventDefault()

  incompleteTasks.append(createTaskElement(input.value, false))

  taskCounter()

  input.value = ''
}

function createTaskElement(taskText, status) {
  const div = document.createElement('div')
  div.classList.add('task')
  const p = document.createElement('p')
  p.textContent = taskText
  const iconsDiv = document.createElement('div')
  const trashButton = document.createElement('button')
  trashButton.id = 'delete'
  const trashIcon = document.createElement('i')
  trashIcon.classList = 'fa-solid fa-trash'
  trashIcon.id = 'trash'

  if (!status) {
    const checkmarkButton = document.createElement('button')
    checkmarkButton.id = 'mark-as-done'
    const checkmarkIcon = document.createElement('i')
    checkmarkIcon.classList = 'fa-solid fa-check'
    checkmarkIcon.id = 'check'

    iconsDiv.append(checkmarkButton)
    checkmarkButton.append(checkmarkIcon)
  }

  // Place elements
  iconsDiv.append(trashButton)
  trashButton.append(trashIcon)
  div.append(p)
  div.append(iconsDiv)

  return div
}

function removeTask(task) {
  task.parentElement.parentElement.parentElement.remove()

  taskCounter()
}

function markAsDone(task) {
  // Remove from list of incomplete tasks
  removeTask(task)

  // Create task element
  const div = document.createElement('div')
  div.classList.add('task')
  const p = document.createElement('p')
  p.textContent = task.parentElement.parentElement.previousElementSibling.textContent
  const iconsDiv = document.createElement('div')
  const trashIcon = document.createElement('i')
  trashIcon.classList = 'fa-solid fa-trash'
  trashIcon.id = 'trash'
  const trashButton = document.createElement('button')
  trashButton.id = 'delete'

  // Place elements
  trashButton.append(trashIcon)
  iconsDiv.append(trashButton)
  div.append(p)
  div.append(iconsDiv)

  // Add to the DOM
  completeTasks.append(div)

  taskCounter()
}

function taskHandler(event) {
  if (event.target.id === 'trash') {
    removeTask(event.target)
  } else if (event.target.id === 'check') {
    markAsDone(event.target)
  }
}

function taskCounter() {
  const numberOfIncompleteTasks = incompleteTasks.children.length
  const numberOfCompletedTasks = completeTasks.children.length

  amountCompleted.textContent = numberOfCompletedTasks
  amountIncomplete.textContent = numberOfIncompleteTasks
}

// Event Listeners
addButton.addEventListener('click', addTask)
incompleteTasks.addEventListener('click', taskHandler)
completeTasks.addEventListener('click', taskHandler)


async function fetchTasks(amount) {
  const response = await fetch(`${APIurl}?_limit=${amount}`)
  const data = await response.json()

  return data
}

async function displayFetchData() {
  const taskList = await fetchTasks(10)

  taskList.forEach(task => {
    const taskElement = createTaskElement(task.title, task.completed)

    if (task.completed) {
      completeTasks.append(taskElement)
    } else {
      incompleteTasks.append(taskElement)
    }
  });

  taskCounter()
}

displayFetchData()