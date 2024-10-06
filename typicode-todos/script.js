const input = document.querySelector('input')
const addButton = document.querySelector('#add-item')
const incompleteTasks = document.querySelector('.incomplete-tasks')
const completeTasks = document.querySelector('.complete-tasks')
const tasks = document.querySelector('.task')
const amountIncomplete = document.querySelector('#amount-incomplete')
const amountCompleted = document.querySelector('#amount-completed')


function addTask(event) {
  event.preventDefault()

  // Create task element
  const div = document.createElement('div')
  div.classList.add('task')
  const p = document.createElement('p')
  p.textContent = input.value
  const iconsDiv = document.createElement('div')
  const checkmarkButton = document.createElement('button')
  checkmarkButton.id = 'mark-as-done'
  const trashButton = document.createElement('button')
  trashButton.id = 'delete'
  const checkmarkIcon = document.createElement('i')
  checkmarkIcon.classList = 'fa-solid fa-check'
  checkmarkIcon.id = 'check'
  const trashIcon = document.createElement('i')
  trashIcon.classList = 'fa-solid fa-trash'
  trashIcon.id = 'trash'

  // Place elements
  iconsDiv.append(checkmarkButton)
  iconsDiv.append(trashButton)
  checkmarkButton.append(checkmarkIcon)
  trashButton.append(trashIcon)
  div.append(p)
  div.append(iconsDiv)

  // Add to the DOM
  incompleteTasks.append(div)

  taskCounter()

  input.value = ''
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
