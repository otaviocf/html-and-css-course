const itemForm = document.querySelector('#item-form')
const itemInput = document.querySelector('#item-input')
const itemList = document.querySelector('#item-list')
const clearButton = document.querySelector('#clear')

const addItem = (event) => {
  event.preventDefault()
  const newItem = itemInput.value
  
  // Validate Input
  if (newItem === '') {
    alert('Insira um item')
    return
  }

  // Create and add item
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(newItem))

  const button = createButton('remove-item btn-link text-red')
  li.appendChild(button)

  itemList.appendChild(li)
  itemInput.value = ''
}

const createButton = (classes) => {
  const button = document.createElement('button')
  button.className = classes
  const icon = createIcon('fa-solid fa-xmark')
  button.appendChild(icon)
  return button
}

const createIcon = (classes) => {
  const icon = document.createElement('i')
  icon.className = classes
  return icon
}

// Remove item
const removeItem = (event) => {
  if (event.target.parentElement.classList.contains('remove-item')) {
    event.target.parentElement.parentElement.remove()
  }
}

// Clear shopping list
const clearList = (event) => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }
}

// Event Listeners
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
clearButton.addEventListener('click', clearList)