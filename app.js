// Define UI Vars
var form = document.querySelector('#task-form');
var taskList = document.querySelector('.collection');
var clearBin = document.querySelector('.clear-tasks');
var filter = document.querySelector('#filter');
var taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners() {
	//  Add task event
	form.addEventListener('submit', addTask);
}

// Add  Task
function addTask(e) {
	if(taskInput.value === ''){
		alert('Add a task');
	}


	// Create li element
	var li = document.createElement('li');
	// Add class
	li.className = 'collection-item';
	// create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// Create new link element
	var link = document.createElement('a');
	// Add class
	link.className = 'delete-item secondary-content';
	// Add icon html
	link.innerHTML = '<i class="fa fa-remove"></i>';
	// Append the link to li
	li.appendChild(link);

	// Append li to ul
	taskList.appendChild(li);

	// Clear input
	taskInput.value = '';


	e.preventDefault();
}