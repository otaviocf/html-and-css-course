const itemForm = document.querySelector('#item-form')
const itemInput = document.querySelector('#item-input')
const itemList = document.querySelector('#item-list')
const clearButton = document.querySelector('#clear')
const filterInput = document.querySelector('#filter')
const formButton = document.querySelector('.btn')
let isEditMode = false

const displayItems = () => {
  const itemsFromStorage = getItemsFromLocalStorage()

  itemsFromStorage.forEach((item) => addItemToDOM(item))

  checkUI()
}

const onAddItemSubmit = (event) => {
  event.preventDefault()
  const newItem = itemInput.value
  
  // Validate Input
  if (newItem === '') {
    alert('Insira um item')
    return
  }

  // Chack for edit mode
  if (isEditMode) {
    const itemToEdit = document.querySelector('.editing')
    removeItemFromLocalStorage(itemToEdit.textContent)
    itemToEdit.classList.remove('editing')
    itemToEdit.remove()
    isEditMode = false
  } else {
    if (checkIfItemExists(newItem)) {
      alert('Este item já está na lista')
      return
    }
  }

  checkUI()
  // Create and store item
  addItemToDOM(newItem)
  addItemToLocalStorage(newItem)

  checkUI()

  itemInput.value = ''
}

const addItemToDOM = (item) => {
   // Create and add item
   const li = document.createElement('li')
   li.appendChild(document.createTextNode(item))
 
   const button = createButton('remove-item btn-link text-red')
   li.appendChild(button)
 
   // Add li to the DOM
   itemList.appendChild(li)
}

const addItemToLocalStorage = (item) => {
  const itemsFromStorage = getItemsFromLocalStorage()

  // Add new item to array
  itemsFromStorage.push(item)

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

const getItemsFromLocalStorage = () => {
  let itemsFromStorage

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = []
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
  }

  return itemsFromStorage
}

const removeItemFromLocalStorage = (item) => {
  let itemsFromStorage = getItemsFromLocalStorage()
  
  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item)

  // Reset to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
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

const onClickItem = (event) => {
  if (event.target.parentElement.classList.contains('remove-item')) {
    removeItem(event.target.parentElement.parentElement)
  } else {
    setItemToEdit(event.target)
  }
}

const setItemToEdit = (item) => {
  isEditMode = true

  itemList.querySelectorAll('li').forEach((item) => item.style.opacity = 1)

  item.style.opacity = 0.6
  item.classList.add('editing')
  formButton.firstElementChild.classList = 'fa-solid fa-pen'
  formButton.firstElementChild.nextSibling.textContent = ' Update Item'
  formButton.style.backgroundColor = '#228b22'
  itemInput.value = item.textContent
}

// Remove item
const removeItem = (item) => {
  if (confirm('Tem certeza?')) {
    // Remove item from DOM
    item.remove()

    // Remove item from local storage
    removeItemFromLocalStorage(item.textContent)

    checkUI()
  }

  checkUI()
}

// Clear shopping list
const clearList = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }

  // Clear from local storage
  localStorage.clear()

  checkUI()
}

// Filter items
const filterItems = () => {
  const query = filterInput.value

  document.querySelectorAll('li').forEach((item) => {
    const itemText = item.textContent.toUpperCase()

    if (itemText.includes(query.toUpperCase())) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
}

// Prevent duplicate entries
const checkIfItemExists = (item) => {
  const itemsFromStorage = getItemsFromLocalStorage()

  if (itemsFromStorage.includes(item)) {
    return true
  } else {
    return false
  }
}

const checkUI = () => {
  itemInput.value = ''

  if (document.querySelectorAll('li').length === 0) {
    filterInput.style.display = 'none'
    clearButton.style.display = 'none'
  } else {
    filterInput.style.display = 'block'
    clearButton.style.display = 'block'
  }

  formButton.firstElementChild.classList = 'fa-solid fa-plus'
  formButton.firstElementChild.nextSibling.textContent = ' Add Item'
  formButton.style.backgroundColor = '#333'
  isEditMode = false
}

// Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit)
itemList.addEventListener('click', onClickItem)
clearButton.addEventListener('click', clearList)
filterInput.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayItems)

checkUI()