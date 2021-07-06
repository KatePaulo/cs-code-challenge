const defaultData = [
  { task: 'Pay Bills', completed: false, edit: false, id: '1' },
  { task: 'Go Shopping', completed: false, edit: true, id: '2' },
  { task: 'See the Doctor', completed: true, edit: false, id: '3' },
];
function createNewTaskElement({ task, completed, edit, id }) {
  return `<li class='item ${edit ? 'edit' : ''} ${completed ? 'completed' : ''}' data-id='${id}' data-edit='${edit}'>
    <input class='checkbox' type='checkbox' ${completed ? 'checked' : ''} data-action='toggle'>
    <label class='label'>${task}</label>
    <input class='text-input' type='text' value='${task}'>
    <button class='button' data-action='editTask'>${edit ? 'Save' : 'Edit'}</button>
    <button class='button delete' data-action='deleteTask'>Delete</button>
  </li>`;
}
function getTasks() {
  return JSON.parse(localStorage.getItem('todos'));
}

function createTasks(tasks) {
  return tasks.map(createNewTaskElement).join('');
}

function insertTasks(elementId, arr) {
  const container = document.getElementById(elementId);
  container.innerHTML = createTasks(arr);
}

function initTodoList(tasks) {
  insertTasks('incomplete-tasks', tasks.filter(task => !task.completed));
  insertTasks('completed-tasks', tasks.filter(task => task.completed));
  localStorage.setItem('todos', JSON.stringify(tasks));
}

function updateLocalStorageTasks({ action, task, value }) {
  let tasks = getTasks();
  switch (action) {
    case 'add':
      tasks.push(task);
      break;
    case 'delete':
      tasks = tasks.filter(item => item.id !== task.dataset.id);
      break;
    case 'toggle':
      const taskToToggle = tasks.find(item => item.id === task.dataset.id);
      taskToToggle.completed = !taskToToggle.completed;
      break;
    case 'edit':
      const taskToEdit = tasks.find(item => item.id === task.dataset.id);
      taskToEdit.edit = !taskToEdit.edit;
      taskToEdit.task = value;
      break;
    default:
      tasks;
  }
  localStorage.setItem('todos', JSON.stringify(tasks));
}

function add() {
  const taskInput = document.getElementById('new-task');
  const listItemName = taskInput.value;
  if (!listItemName.length) return;

  const listItem = {
    task: listItemName,
    completed: false,
    edit: false,
    id: `${new Date().toJSON()}${listItemName}`,
  };
  updateLocalStorageTasks({ action: 'add', task: listItem });
  const container = document.getElementById('incomplete-tasks');
  container.appendChild(createElement(createNewTaskElement(listItem)));
  taskInput.value = '';
}

function deleteTask({ parentNode }) {
  updateLocalStorageTasks({ action: 'delete', task: parentNode });
  const ul = parentNode.parentNode;
  ul.removeChild(parentNode);
}

function toggle({ parentNode, target }) {
  updateLocalStorageTasks({ action: 'toggle', task: parentNode });

  const ul = parentNode.parentNode;
  ul.removeChild(parentNode);
  parentNode.classList.toggle('completed');
  const container = document.getElementById(
    target.checked ? 'completed-tasks' : 'incomplete-tasks'
  );
  container.appendChild(parentNode);
}

function editTask({ parentNode, target }) {
  const [editInput] = parentNode.getElementsByClassName('text-input');
  const [label] = parentNode.getElementsByClassName('label');

  parentNode.classList.toggle('edit');
  const isEdit = parentNode.dataset.edit === 'false';
  if (!isEdit) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  target.innerText = isEdit ? 'Save' : 'Edit';
  parentNode.dataset.edit = isEdit;
  updateLocalStorageTasks({
    action: 'edit',
    task: parentNode,
    value: editInput.value,
  });
}

function handleActions(event, actions) {
  const action = event.target.dataset.action;
  if (action) {
    actions[action]({
      parentNode: event.target.parentNode,
      target: event.target,
    });
  }
}

function app() {
  const container = document.getElementById('container');
  if (!container) return;
  const tasks = getTasks() || defaultData;

  initTodoList(tasks);
  const actions = {
    add,
    toggle,
    editTask,
    deleteTask,
  };
  container.addEventListener('click', event => handleActions(event, actions));
}

app();