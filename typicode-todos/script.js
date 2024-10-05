const input = document.querySelector('input')
const addButton = document.querySelector('#add-item')
const incompleteTasks = document.querySelector('.incomplete-tasks')
const completeTasks = document.querySelector('.complete-tasks')


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
  const trashIcon = document.createElement('i')
  trashIcon.classList = 'fa-solid fa-trash'

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


// Event Listeners
addButton.addEventListener('click', addTask)