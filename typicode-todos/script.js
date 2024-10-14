const input = document.querySelector('input')
const addButton = document.querySelector('#add-item')
const incompleteTasks = document.querySelector('.incomplete-tasks')
const completeTasks = document.querySelector('.complete-tasks')
const tasks = document.querySelector('.task')
const amountIncomplete = document.querySelector('#amount-incomplete')
const amountCompleted = document.querySelector('#amount-completed')
const APIurl = 'https://jsonplaceholder.typicode.com/todos/'

function addTask(event) {
	event.preventDefault()

	const newTask = {
		title: input.value,
		completed: false,
	}

	fetch(APIurl, {
		method: 'POST',
		body: JSON.stringify(newTask),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.then((data) => incompleteTasks.append(createTaskElement(data)))

	taskCounter()

	input.value = ''
}

function createTaskElement(task) {
	const div = document.createElement('div')
	div.classList.add('task')
	div.setAttribute('data-id', task.id)
	const p = document.createElement('p')
	p.textContent = task.title
	const iconsDiv = document.createElement('div')
	const trashButton = document.createElement('button')
	trashButton.id = 'delete'
	const trashIcon = document.createElement('i')
	trashIcon.classList = 'fa-solid fa-trash'
	trashIcon.id = 'trash'

	if (!task.completed) {
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

function removeTaskFromDOM(task) {
	task.parentElement.parentElement.parentElement.remove()

	taskCounter()
}

function deleteTaskFromDB(taskID) {
	fetch(APIurl + taskID, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

function markAsDone(task) {
	// Remove from list of incomplete tasks
	removeTaskFromDOM(task)

	// Update status in DB
	fetch(
		APIurl +
			task.parentElement.parentElement.parentElement.getAttribute('data-id'),
		{
			method: 'PUT',
			body: JSON.stringify({ completed: true }),
			headers: { 'Content-Type': 'application/json' },
		}
	)

	// Create completed task element
	const div = document.createElement('div')
	div.classList.add('task')
	const p = document.createElement('p')
	p.textContent =
		task.parentElement.parentElement.previousElementSibling.textContent
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

	// Add commpleted task element to DOM
	completeTasks.append(div)

	taskCounter()
}

function taskHandler(event) {
	if (event.target.id === 'trash') {
		removeTaskFromDOM(event.target)
		deleteTaskFromDB(
			event.target.parentElement.parentElement.parentElement.getAttribute(
				'data-id'
			)
		)
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

async function fetchTasks(amount) {
	const response = await fetch(`${APIurl}?_limit=${amount}`)
	const data = await response.json()

	return data
}

async function displayFetchData() {
	const taskList = await fetchTasks(5)

	taskList.forEach((task) => {
		const taskElement = createTaskElement(task)

		if (task.completed) {
			completeTasks.append(taskElement)
		} else {
			incompleteTasks.append(taskElement)
		}
	})

	taskCounter()
}

// Event Listeners
document.addEventListener('DOMContentLoaded', displayFetchData)
addButton.addEventListener('click', addTask)
incompleteTasks.addEventListener('click', taskHandler)
completeTasks.addEventListener('click', taskHandler)
