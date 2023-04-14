// import stylesheet
import './style.css';

// initialize
addModalEventListeners();
submitEventListeners();

// Add/remove Event Listeners
function submitEventListeners() {
  const submitBtn = document.querySelectorAll('.submit-btn');
  submitBtn.forEach(btn => btn.addEventListener('click', validateForm));
}

function addModalEventListeners() {
  const addTaskBtns = document.querySelectorAll('.create-task-btn');
  const addProjBtns = document.querySelectorAll('.create-proj-btn');

  addTaskBtns.forEach(btn => btn.addEventListener('click', showTaskModal));
  addProjBtns.forEach(btn => btn.addEventListener('click', showProjModal));
}

function removeModalEventListeners() {
  const addTaskBtns = document.querySelectorAll('.create-task-btn');
  const addProjBtns = document.querySelectorAll('.create-proj-btn');

  addTaskBtns.forEach(btn => btn.removeEventListener('click', showTaskModal));
  addProjBtns.forEach(btn => btn.removeEventListener('click', showProjModal));
}

function addActionEventListeners() {
  const deleteBtns = document.querySelectorAll('.delete');
  const checkBtns = document.querySelectorAll('.check');
  const flagBtns = document.querySelectorAll('.flag');
  const menuUpBtns = document.querySelectorAll('.menu-up');
  const menuDownBtns = document.querySelectorAll('.menu-down');

  deleteBtns.forEach(btn => btn.addEventListener('click', deleteItem));
  checkBtns.forEach(btn => btn.addEventListener('click', markComplete));
  flagBtns.forEach(btn => btn.addEventListener('click', changePriority));
}

// Button functions
function changePriority(e) {
  const container = e.target.parentNode.parentNode;
  // make new priority modal and get info from it
}

function markComplete(e) {
  const container = e.target.parentNode.parentNode;
  // TASKS ONLY
  // Change to class .complete
  container.classList.add('.complete'); 
}

function deleteItem(e) {
  const container = e.target.parentNode.parentNode;
  const strArr = container.id.split('-');
  const item = strArr[0];
  const type = strArr[1];
  //deleteFromDOM(container);
  if (type === 'task') {
    objectStorage.deleteTask(container.parentNode.id, item);
    container.remove();
  } else {
    objectStorage.deleteProject(item);
    container.parentNode.remove();
  }

  // check if deleting made tasklist empty
  if (objectStorage.checkIfEmpty()) {
    document.querySelector('.empty-msg').classList.remove('hidden');
  }
}


// DOM manipulation
function hideTaskModal() {
  const modal = document.querySelector('.task-modal');
  modal.classList.add('hidden');
  // add modal event listeners back in
  addModalEventListeners();
  
}

function hideProjModal() {
  const modal = document.querySelector('.project-modal');
  modal.classList.add('hidden');
  // add modal event listeners back in
  addModalEventListeners();
}

function showTaskModal() {
  document.querySelector('.empty-msg').classList.add('hidden');
  buildProjectList();
  const modal = document.querySelector('.task-modal');
  modal.classList.remove('hidden');
  removeModalEventListeners();
}

function showProjModal() {
  document.querySelector('.empty-msg').classList.add('hidden');
  const modal = document.querySelector('.project-modal');
  modal.classList.remove('hidden');
  removeModalEventListeners();
}

function buildProjectList() {
  let projNamesArray = objectStorage.getProjectNames();
  const selectProj = document.querySelector('#task-project-input');
  // remove current project list
  while (selectProj.firstChild) {
    selectProj.removeChild(selectProj.firstChild);
  }
  // add new project list
  projNamesArray.forEach(projectName => {
    let option = document.createElement('option');
    selectProj.appendChild(option);
    option.value = `${projectName}`;
    option.textContent = `${projectName}`;
  });
}

function buildProject(projectObj) {
  // create project div and insert
  const project = document.createElement('div');
  document.querySelector('.todo-container').appendChild(project);
  project.classList.add('project-container');
  project.id = `${projectObj.projectID}-project-container`;

  // create project header div (same structure as task)
  const projectHeader = buildItem(project, projectObj);
  projectHeader.id = `${projectObj.projectID}-project-header`;
  buildCommon(projectHeader, projectObj);
}

function buildTask(taskObj) {
  // get project ID from name
  const parentID = taskObj.projectID;
  // find project container
  const parentProj = document.querySelector(`#${parentID}-project-container`);
  // create task container
  const taskContainer = buildItem(parentProj, taskObj);
  // add task id
  taskContainer.id = `${taskObj.taskID}-task-container`;
  buildCommon(taskContainer, taskObj);
}

function buildCommon(container, object) {
  // create left icons
  buildLeftIcons(container, object);
  // create info
  buildInfo(container, object);
  // create right icons
  buildRightIcons(container, object);
  // update CSS classes
  updateClasses();
  // add button event listeners
  addActionEventListeners();
}

function buildItem(parent, object) {
  const item = document.createElement('div');
  parent.appendChild(item);

  if (object.type === 'project') {
    item.classList.add('project-header');
  } else {
    item.classList.add('task-container');
  }
  return item;
}

// after add, sort, or delete, update classes to add .only and .last
function updateClasses() {
  const projectInfo = objectStorage.getProjectInfo();
  console.log(projectInfo);

}

function buildLeftIcons(parent, object) {
  // create project header icons container, left
  const IconsLeft = document.createElement('div');
  parent.appendChild(IconsLeft);
  IconsLeft.classList.add('icons-left');
  // create project header icons, left
  const menuDownIcon = document.createElement('img');
  IconsLeft.appendChild(menuDownIcon);
  menuDownIcon.src = './images/menu-down.svg';
  menuDownIcon.alt = 'menu down icon';
  menuDownIcon.classList.add('menu-down');
  menuDownIcon.classList.add('hidden');
  const menuUpIcon = document.createElement('img');
  IconsLeft.appendChild(menuUpIcon);
  menuUpIcon.classList.add('menu-up');
  menuUpIcon.src = './images/menu-up.svg';
  menuUpIcon.alt = 'menu up icon';
}

function buildInfo(parent, object) {
  const name = document.createElement('div');
  parent.appendChild(name);
  name.classList.add('name');
  name.textContent = object.name;

  const desc = document.createElement('div');
  parent.appendChild(desc);
  desc.classList.add('desc');
  desc.textContent = object.description;

  const due = document.createElement('div');
  parent.appendChild(due);
  due.classList.add('due');
  due.textContent = object.dueDate;

  const status = document.createElement('div');
  parent.appendChild(status);
  status.classList.add('status');
  status.textContent = object.status;

  // hide either desc or status depending on object type
  if (object.type === 'project') {
    desc.classList.add('hidden');
  } else {
    status.classList.add('hidden');
  }
}

function buildRightIcons(parent, object) {
  // create project header icons container, right
  const IconsRight = document.createElement('div');
  parent.appendChild(IconsRight);
  IconsRight.classList.add('icons-right');
  // create project header icons, right
  const checkIcon = document.createElement('img');
  IconsRight.appendChild(checkIcon);
  checkIcon.classList.add('check');
  checkIcon.src = './images/check-bold.svg';
  checkIcon.alt = 'check icon';
  const flagIcon = document.createElement('img');
  IconsRight.appendChild(flagIcon);
  flagIcon.classList.add('flag');
  flagIcon.src = './images/flag.svg';
  flagIcon.alt = 'flag icon';
  const trashIcon = document.createElement('img');
  IconsRight.appendChild(trashIcon);
  trashIcon.classList.add('delete');
  trashIcon.src = './images/delete.svg';
  trashIcon.alt = 'trash icon';
}

// Input handling

function validateForm(e) {
  const type = e.target.id;
  const form1 = document.querySelector(`#${type}-name-input`).reportValidity();
  if (form1 && type === 'task') {
    e.preventDefault();
    hideTaskModal();
    createTask();
  } else if (form1 && type === 'project') {
    e.preventDefault();
    hideProjModal();
    createProject();
  }
}
function readForm(type) {
  // create new object from form information
  let newItem;
  if (type === 'task') {
    const projectID = document.querySelector('#task-project-input').value;
    const name = document.querySelector('#task-name-input').value;
    const description = document.querySelector('#task-desc-input').value;
    const dueDate = document.querySelector('#task-date-input').value;
    const priority = document.querySelector('#task-priority-input').value;
    newItem = createTaskObj(type, projectID, name, description, dueDate, priority);
  } else {
    const name = document.querySelector('#project-name-input').value;
    const description = document.querySelector('#project-desc-input').value;
    const dueDate = document.querySelector('#project-date-input').value;
    const priority = document.querySelector('#project-priority-input').value;
    newItem = createProjectObj(type, name, description, dueDate, priority);
  }
  //return object
  return newItem;
}
// Object creation

// create new task or project object
function createTaskObj(type, projectID, name, description, dueDate, priority) {
  return {
    type,
    taskID: name.toLowerCase().replace(/\s+/g, ''),
    projectID: projectID.toLowerCase().replace(/\s+/g, ''),
    name,
    description,
    dueDate,
    priority,
  };
}

// create new task or project object
function createProjectObj(type, name, description, dueDate, priority) {
  const status = '0/0';
  return {
    type,
    projectID: name.toLowerCase().replace(/\s+/g, ''),
    name,
    description,
    dueDate,
    status: status,
    priority,
    tasks: [],
  };
}

function createTask() {
  // get info from form
  const task = readForm('task');
  // store task
  objectStorage.storeTask(task);
  // update DOM
  buildTask(task);
}

function createProject() {
  // get info from form
  const project = readForm('project');
  // store project
  objectStorage.storeProject(project);
  // update DOM
  buildProject(project);
}

// Object Manipulation

// object storage
const objectStorage = (() => {
  // initialize arrays
  let projectList = [{ type: 'project', projectID: 'default', name: 'Default', tasks: [] }];

  // function to store projects
  function storeProject(project) {
    // add project header to project list
    projectList.push(project);
  }

  // function to store tasks
  function storeTask(task) {
    // find the project in the projectList
    let projectIndex = projectList.findIndex(project => (project.projectID === task.projectID));
    projectList[projectIndex].tasks.push(task);
  }

  function getProjectNames() {
    let projectNames = [];
    projectList.forEach(project => projectNames.push(project.name));
    return projectNames;
  }

  function getProjectInfo() {
    let projectInfo = [];
    const removeDefault = projectList.slice(1);
    removeDefault.forEach(project => {
      projectInfo.push(project.projectID);
      projectInfo.push(project.tasks.length);
    });
    return projectInfo;
  }

  function deleteProject(id) {
    let projectIndex = projectList.findIndex(project => (project.projectID === id));
    projectList.splice(projectIndex, 1);
  }

  function deleteTask(project, id) {
    const parentArr = project.split('-');
    const parentProj = parentArr[0];
    let projectIndex = projectList.findIndex(project => (project.projectID === parentProj));
    let taskIndex = projectList[projectIndex].tasks.findIndex(task => (task.taskID === id));
    projectList[projectIndex].tasks.splice(taskIndex, 1);
  }

  function checkIfEmpty() {
    console.log(projectList);
    if (projectList.length === 1 && projectList[0].tasks.length === 0) {
      return true;
    }
    return false;
  }

  return {
    storeProject,
    storeTask,
    getProjectNames,
    getProjectInfo,
    deleteProject,
    deleteTask,
    checkIfEmpty,
  };
})();
