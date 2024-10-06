const input = document.querySelector('input')
const addButton = document.querySelector('#add-item')
const incompleteTasks = document.querySelector('.incomplete-tasks')
const completeTasks = document.querySelector('.complete-tasks')
const tasks = document.querySelector('.task')


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

  input.value = ''
}

function removeTask(task) {
  task.parentElement.parentElement.parentElement.remove()
}

function taskHandler(event) {
  const target = event.target
  if (event.target.id === 'trash') {
    removeTask(target)
  } else if (event.target.id === 'check') {

  }
}

// Event Listeners
addButton.addEventListener('click', addTask)
incompleteTasks.addEventListener('click', taskHandler)
