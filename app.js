// Define UI Vars
var form = document.querySelector('#task-form');
var taskList = document.querySelector('.collection');
var clearBtn = document.querySelector('.clear-task');
var filter = document.querySelector('#filter');
var taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners() {
	// DOM Load event
	document.addEventListener('DOMContentLoaded', getTasks);
	//  Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener("click", removeTask);
	// Clear task event
	clearBtn.addEventListener("click", clearTasks);
	// filter tasks event
	filter.addEventListener("keyup", filterTasks);
}


// Get Tasks from LS
function getTasks() {
	var tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task){
		// Create li element
		var li = document.createElement('li');
		// Add class
		li.className = 'collection-item';
		// create text node and append to li
		li.appendChild(document.createTextNode(task));
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
	});
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

	// Store in Local Storage
	storeTaskInLocalStorage(taskInput.value);

	// Clear input
	taskInput.value = '';


	e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
	var tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
	if(e.target.parentElement.classList.contains('delete-item')) {
		if(confirm('Are you Sure?')) {
			e.target.parentElement.parentElement.remove();

			// Remove from LS
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
	var tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task, index) {
		if(taskItem.textContent === task){
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear Task
function clearTasks() {
	  // taskList.innerHTML  = '';

	// faster method
	   while(taskList.firstChild) {
	   	taskList.removeChild(taskList.firstChild);
	   }

	   // clear from Local Storage
	   clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
	localStorage.clear();
}
// filter Task
function filterTasks(e) {
	var text = e.target.value.toLowerCase();

	 document.querySelectorAll('.collection-item').forEach
	 (function(task){
	 		var item = task.firstChild.textContent;
	 		if(item.toLowerCase().indexOf(text) != -1){
	 			task.style.display = 'block';
	 		} else{
	 			task.style.display = 'none';
	 		}
	 	});
}

