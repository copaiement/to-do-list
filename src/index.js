// to do list:
// get sorting to work
// update status on task add
// update status on task delete

// import stylesheet
import './style.css';

// import functions

// Add/remove Event Listeners
function toolbarEventListener() {
  const toolbarBtn = document.querySelector('.toggle-menu');
  toolbarBtn.addEventListener('click', showHideToolbar);
}
function submitEventListeners() {
  const submitBtn = document.querySelectorAll('.submit-btn');
  submitBtn.forEach(btn => btn.addEventListener('click', validateForm));
}

function priorityEventListeners() {
  const addPriorityBtns = document.querySelectorAll('.priority-btn');
  addPriorityBtns.forEach(btn => btn.addEventListener('click', priorityOps.storePriority));
}

function addModalEventListeners() {
  console.log('testing modals');
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
  checkBtns.forEach(btn => btn.addEventListener('click', markTaskComplete));
  flagBtns.forEach(btn => btn.addEventListener('click', priorityOps.storeItem));
}

// Button functions
function getClickInfo(e) {
  const container = e.target.parentNode.parentNode;
  const strArr = container.id.split('-');
  const projectArr = container.parentNode.id.split('-');
  const item = {
    projectID: projectArr[0],
    id: strArr[0],
    type: strArr[1],
    container,
  };
  return item;
}

// priority function object
const priorityOps = (() => {
  let itemInfo;
  let priorityID;

  function storeItem(e) {
    itemInfo = getClickInfo(e);
    showPriorityModal(itemInfo);
  }

  function storePriority(e) {
    priorityID = e.target.id;
    hidePriorityModal();
    changePriority();
  }

  function changePriority() {
    if (itemInfo.type === 'task') {
      let infoArr = itemInfo.container.parentNode.id.split('-');
      const lastPri = objectStorage.updateTaskPriority(infoArr[0], itemInfo.id, priorityID);
      itemInfo.container.classList.remove(`task-${lastPri}`);
      itemInfo.container.classList.add(`task-${priorityID}`);
    } else {
      const lastPri = objectStorage.updateProjectPriority(itemInfo.id, priorityID);
      itemInfo.container.classList.remove(`project-${lastPri}`);
      itemInfo.container.classList.add(`project-${priorityID}`);
    }
  }
  return {
    storeItem,
    storePriority,
  };
})();

function markTaskComplete(e) {
  const item = getClickInfo(e);
  const completeStatus = objectStorage.getCompleteStatus(item.projectID, item.id);
  if (completeStatus) {
    item.container.classList.add('complete');
  } else {
    item.container.classList.remove('complete');
  }

  // update status if project !default
  if (item.projectID !== 'default') {
    updateProjectStatus(item.projectID);
  }
}

function updateProjectStatus(projectID) {
  // update project status upon project completion
  const projectHeader = document.querySelector(`#${projectID}-project-header`);
  const statusText = projectHeader.querySelector('.status');
  const statusVal = objectStorage.updateStatus(projectID);
  statusText.textContent = statusVal.statusVal;
  if (statusVal.status) {
    projectHeader.classList.add('complete');
  } else {
    projectHeader.classList.remove('complete');
  }
}

function deleteItem(e) {
  const item = getClickInfo(e);
  if (item.type === 'task') {
    objectStorage.deleteTask(item.container.parentNode.id, item.id);
    item.container.remove();
    updateProjectStatus(item.projectID);
  } else {
    objectStorage.deleteProject(item.id);
    item.container.parentNode.remove();
  }

  // check if deleting made tasklist empty
  if (objectStorage.checkIfEmpty()) {
    document.querySelector('.empty-msg').classList.remove('hidden');
  }
}

// DOM manipulation
function showHideToolbar() {
  const toolbar = document.querySelector('.toolbar');
  toolbar.classList.toggle('hidden');
}

function hidePriorityModal() {
  const modal = document.querySelector('.priority-modal');
  modal.classList.add('hidden');
  addModalEventListeners();
}

function showPriorityModal(item) {
  // show priority modal
  const modal = document.querySelector('.priority-modal');
  const modalText = document.querySelector('.priority-modal-text');
  modal.classList.remove('hidden');
  modalText.textContent = `Select ${item.type} priority:`;
  removeModalEventListeners();
}

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
  buildLeftIcons(container);
  // create info
  buildInfo(container, object);
  // create right icons
  buildRightIcons(container, object);
  // update CSS classes
  updateClasses(container, object);
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

// after add, sort, or delete, update classes
function updateClasses(container, object) {
  // set priority class
  container.classList.add(`${object.type}-${object.priority}`);

}

function buildLeftIcons(parent) {
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
  // check icon only for tasks
  if (object.type === 'task') {
    const checkIcon = document.createElement('img');
    IconsRight.appendChild(checkIcon);
    checkIcon.classList.add('check');
    checkIcon.src = './images/check-bold.svg';
    checkIcon.alt = 'check icon';
  }
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
  } else if (type === 'project') {
    const name = document.querySelector('#project-name-input').value;
    const description = document.querySelector('#project-desc-input').value;
    const dueDate = document.querySelector('#project-date-input').value;
    const priority = document.querySelector('#project-priority-input').value;
    newItem = createProjectObj(type, name, description, dueDate, priority);
  } else {
    newItem = document.querySelector('#priority-input').value;
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
    complete: false,
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
    status,
    priority,
    tasks: [],
    complete: false,
  };
}

function createTask() {
  // get info from form
  const task = readForm('task');
  // store task
  objectStorage.storeTask(task);
  // update DOM
  buildTask(task);
  // update status if project !default
  if (task.projectID !== 'default') {
    updateProjectStatus(task.projectID);
  }
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
    if (projectList.length === 1 && projectList[0].tasks.length === 0) {
      return true;
    }
    return false;
  }

  function getProjectIndex(projectID) {
    // gives just projectIndex value
    const projectIndex = projectList.findIndex(project => (project.projectID === projectID));
    return projectIndex;
  }

  function getTaskIndex(projectID, taskID) {
    // gives both projectIndex and TaskIndex
    const projectIndex = getProjectIndex(projectID);
    const taskIndex = projectList[projectIndex].tasks.findIndex(task => (task.taskID === taskID));
    return {
      projectIndex,
      taskIndex,
    }
  }

  function updateTaskPriority(projectID, taskID, updateValue) {
    const index = getTaskIndex(projectID, taskID);
    const lastPriority = projectList[index.projectIndex].tasks[index.taskIndex].priority;
    projectList[index.projectIndex].tasks[index.taskIndex].priority = updateValue;
    return lastPriority;
  }

  function updateProjectPriority(projectID, updateValue) {
    const index = getProjectIndex(projectID);
    const lastPriority = projectList[index].priority;
    projectList[index].priority = updateValue;
    return lastPriority;
  }

  function getCompleteStatus(projectID, taskID) {
    const index = getTaskIndex(projectID, taskID);
    const completeStatus = projectList[index.projectIndex].tasks[index.taskIndex].complete;
    if (completeStatus) {
      projectList[index.projectIndex].tasks[index.taskIndex].complete = false;
    } else {
      projectList[index.projectIndex].tasks[index.taskIndex].complete = true;
    }
    return projectList[index.projectIndex].tasks[index.taskIndex].complete;
  }

  function updateStatus(projectID) {
    const index = getProjectIndex(projectID);
    const taskList = projectList[index].tasks;
    const taskCount = taskList.length;
    const completeCount = taskList.filter(task => task.complete === true).length;
    if (taskCount === completeCount && taskCount !== 0) {
      projectList[index].complete = true;
    } else {
      projectList[index].complete = false;
    }
    const status = projectList[index].complete;
    const statusVal = `${completeCount}/${taskCount}`;
    return {
      statusVal,
      status,
    };
  }

  return {
    storeProject,
    storeTask,
    getProjectNames,
    getProjectInfo,
    deleteProject,
    deleteTask,
    checkIfEmpty,
    updateTaskPriority,
    updateProjectPriority,
    getCompleteStatus,
    updateStatus,
  };
})();

// initialize
addModalEventListeners();
submitEventListeners();
priorityEventListeners();
toolbarEventListener();
