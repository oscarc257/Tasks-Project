// Get elements by id from form, input and lists. 
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Eventlistner added to handle the submission of form. Preventing the default submission that refreshes page.
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const newTask = todoInput.value;

//   if statement to add new task
  if (newTask === '') {
      alert('Please enter a task!');
      return;
  }
//   clears input after adding new task. 
  todoInput.value = '';
  addTask(newTask);
});

// Function with span element to hold the task test, addding a checkbox inut, and delete button to remove any tasks. 
function addTask(task) {
  const listItem = document.createElement('li');
  const taskText = document.createElement('span');
  taskText.textContent = task;
  listItem.appendChild(taskText);

  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  listItem.appendChild(checkBox);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  listItem.appendChild(deleteButton);

  todoList.appendChild(listItem);

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  listItem.appendChild(editButton);

//   ADDING EVENTLISTNER TO THE CHECKBOX. 
  checkBox.addEventListener('change', function() {
      if (this.checked) {
          taskText.style.textDecoration = 'line-through';
      } else {
          taskText.style.textDecoration = 'none';
      }
  });
 
//   Adding a toggle aspect with the eventlistner to remove task when button is clicked. 
  deleteButton.addEventListener('click', function() {
      todoList.removeChild(listItem);
  });
// Implementing edit button to create new list item and append.
  editButton.addEventListener('click', function() {
      const isEditing = listItem.classList.contains('editing');
 
      if (isEditing) {
         
          taskText.textContent = this.previousSibling.value;
          listItem.classList.remove('editing');
          editButton.textContent = 'Edit';
      } else {
        //  if input is not recognized correctly switches to edit input.
          const input = document.createElement('input');
          input.type = 'text';
          input.value = taskText.textContent;
          listItem.insertBefore(input, taskText);
          listItem.removeChild(taskText);
          listItem.classList.add('editing');
          editButton.textContent = 'Save';
      }
  });

  saveLocalStorage();
}

//Saves to local storage
function saveLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#todo-list li').forEach(task => {
      const taskText = task.querySelector('span').textContent;
      const isCompleted = task.classList.contains('completed');
      tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Tests local storage through adding tasks and ensuring tasks remain. 
document.addEventListener('DOMContentLoaded', function() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
      addTask(task.text);
  });
});