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
  const menuToggleBtns = document.querySelectorAll('.menu-toggle');

  deleteBtns.forEach(btn => btn.addEventListener('click', deleteItem));
  checkBtns.forEach(btn => btn.addEventListener('click', markTaskComplete));
  flagBtns.forEach(btn => btn.addEventListener('click', priorityOps.storeItem));
  menuToggleBtns.forEach(btn => btn.addEventListener('click', toggleInfo));
}

function addEditBtnEventListeners() {
  const editBtn = document.querySelectorAll('.edit-btn');
  editBtn.forEach(btn => btn.addEventListener('click', editOps.getEditInfo));
  const submitEdit = document.querySelectorAll('#submit-edit');
  submitEdit.forEach(btn => btn.addEventListener('click', submitEdit));
}

// Button functions
function getClickInfo(e) {
  const container = e.target.parentNode.parentNode.parentNode;
  const header = e.target.parentNode.parentNode;
  const strArr = container.id.split('-');
  const projectArr = container.parentNode.id.split('-');
  const item = {
    projectID: projectArr[0],
    id: strArr[0],
    type: strArr[1],
    container,
    header,
  };
  return item;
}

// edit info button
const editOps = (() => {
  let item;

  function getEditInfo(e) {
    const container = e.target.parentNode.parentNode.parentNode;
    const strArr = container.id.split('-');
    const projectArr = container.parentNode.id.split('-');
    item = {
      projectID: projectArr[0],
      id: strArr[0],
      type: strArr[1],
      container,
    };
    showEditModal();
  }

  function saveEdit(editInfo) {
    // update DOM
    editItemDOM(item, editInfo);
    // update Project Storage
    objectStorage.updateInfo(item, editInfo);
  }

  return {
    getEditInfo,
    saveEdit,
  };
})();

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
      itemInfo.header.classList.remove(`task-${lastPri}`);
      itemInfo.header.classList.add(`task-${priorityID}`);
    } else {
      const lastPri = objectStorage.updateProjectPriority(itemInfo.id, priorityID);
      itemInfo.header.classList.remove(`project-${lastPri}`);
      itemInfo.header.classList.add(`project-${priorityID}`);
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
    item.header.classList.add('complete');
  } else {
    item.header.classList.remove('complete');
  }

  // update status if project !default
  if (item.projectID !== 'default') {
    updateProjectStatus(item.projectID);
  }
}

function updateProjectStatus(projectID) {
  // update project status upon project completion
  const projectHeader = document.querySelector(`#${projectID}-project-header`).firstChild;
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
  if (item.type === 'task' && item.projectID !== 'default') {
    objectStorage.deleteTask(item.container.parentNode.id, item.id);
    item.container.remove();
    updateProjectStatus(item.projectID);
  } else if (item.type === 'task') {
    objectStorage.deleteTask(item.container.parentNode.id, item.id);
    item.container.remove();
  } else {
    objectStorage.deleteProject(item.id);
    item.container.parentNode.remove();
  }

  // check if deleting made tasklist empty
  if (objectStorage.checkIfEmpty()) {
    document.querySelector('.empty-msg').classList.remove('hidden');
  }
}

// arrow button toggles info pane
function toggleInfo(e) {
  const item = getClickInfo(e);
  // show/hide info pane
  item.container.querySelector('.description').classList.toggle('hidden');
  // update button
  const summary = item.container.querySelector('.summary');
  const leftIcons = summary.querySelector('.icons-left');
  leftIcons.querySelector('#menu-up').classList.toggle('hidden');
  leftIcons.querySelector('#menu-down').classList.toggle('hidden');
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

function showEditModal() {
  document.querySelector('.edit-modal').classList.remove('hidden');
  removeModalEventListeners();
}

function hideEditModal() {
  document.querySelector('.edit-modal').classList.add('hidden');
  addModalEventListeners();
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
  buildSummary(projectHeader, projectObj);
  buildFullDesc(projectHeader, projectObj);
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
  buildSummary(taskContainer, taskObj);
  buildFullDesc(taskContainer, taskObj);
}

function buildSummary(container, object) {
  // create Summary container
  const summary = document.createElement('div');
  container.appendChild(summary);
  summary.classList.add('summary');
  // create left icons
  buildLeftIcons(summary);
  // create info
  buildInfo(summary, object);
  // create right icons
  buildRightIcons(summary, object);
  // update CSS classes
  updateClasses(summary, object);
  // add button event listeners
  addActionEventListeners();
}

function buildFullDesc(container, object) {
  // create description container
  const descContainer = document.createElement('div');
  container.appendChild(descContainer);
  descContainer.classList.add('description');
  descContainer.classList.add('hidden');

  const descContainerLeft = document.createElement('div');
  descContainer.appendChild(descContainerLeft);
  descContainerLeft.classList.add('desc-left');

  const descContainerRight = document.createElement('div');
  descContainer.appendChild(descContainerRight);
  descContainerRight.classList.add('desc-right');

  const cap = object.type.charAt(0).toUpperCase() + object.type.slice(1);

  const name = document.createElement('div');
  descContainerLeft.appendChild(name);
  name.classList.add('property');
  name.textContent = `${cap} Name:`;
  const nameText = document.createElement('div');
  descContainerLeft.appendChild(nameText);
  nameText.classList.add('value');
  nameText.id = 'desc-name';
  nameText.textContent = object.name;

  const desc = document.createElement('div');
  descContainerLeft.appendChild(desc);
  desc.classList.add('property');
  desc.textContent = 'Description:';
  const descText = document.createElement('div');
  descContainerLeft.appendChild(descText);
  descText.classList.add('value');
  descText.id = 'desc-desc';
  descText.textContent = object.description;

  const due = document.createElement('div');
  descContainerLeft.appendChild(due);
  due.classList.add('property');
  due.textContent = 'Due Date:';
  const dueText = document.createElement('div');
  descContainerLeft.appendChild(dueText);
  dueText.classList.add('value');
  dueText.id = 'desc-date';
  dueText.textContent = object.dueDate;

  const editBtn = document.createElement('button');
  descContainerRight.appendChild(editBtn);
  editBtn.classList.add('edit-btn');
  editBtn.textContent = 'Edit Details';

  // add event listeners
  addEditBtnEventListeners();
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
  const menuDownIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  IconsLeft.appendChild(menuDownIcon);
  menuDownIcon.classList.add('menu-toggle');
  menuDownIcon.id = 'menu-down';
  menuDownIcon.classList.add('hidden');
  menuDownIcon.setAttribute('viewBox', '0 0 24 24');
  const menuDownPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  menuDownIcon.appendChild(menuDownPath);
  menuDownPath.setAttribute('d', 'M7 10L12 15L17 10H7Z');

  const menuUpIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  IconsLeft.appendChild(menuUpIcon);
  menuUpIcon.classList.add('menu-toggle');
  menuUpIcon.id = 'menu-up';
  menuUpIcon.setAttribute('viewBox', '0 0 24 24');
  const menuUpPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  menuUpIcon.appendChild(menuUpPath);
  menuUpPath.setAttribute('d', 'M7 15L12 10L17 15H7Z');
}

function buildInfo(parent, object) {
  const name = document.createElement('div');
  parent.appendChild(name);
  name.classList.add('name');
  name.id = 'head-name';
  name.textContent = object.name;

  const due = document.createElement('div');
  parent.appendChild(due);
  due.classList.add('due');
  due.id = 'head-date';
  due.textContent = object.dueDate;

  if (object.type === 'project') {
    const status = document.createElement('div');
    parent.appendChild(status);
    status.classList.add('status');
    status.textContent = object.status;
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
    const checkIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    IconsRight.appendChild(checkIcon);
    checkIcon.classList.add('check');
    checkIcon.setAttribute('viewBox', '0 0 24 24');
    const checkIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    checkIcon.appendChild(checkIconPath);
    checkIconPath.setAttribute('d', 'M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z');
  }
  const flagIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  IconsRight.appendChild(flagIcon);
  flagIcon.classList.add('flag');
  flagIcon.setAttribute('viewBox', '0 0 24 24');
  const flagIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  flagIcon.appendChild(flagIconPath);
  flagIconPath.setAttribute('d', 'M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z');

  const trashIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  IconsRight.appendChild(trashIcon);
  trashIcon.classList.add('delete');
  trashIcon.setAttribute('viewBox', '0 0 24 24');
  const trashIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  trashIcon.appendChild(trashIconPath);
  trashIconPath.setAttribute('d', 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z');
}

function editItemDOM(ogItem, newItem) {
  // update text
  ogItem.container.querySelector('#head-name').textContent = newItem.newName;
  ogItem.container.querySelector('#desc-name').textContent = newItem.newName;
  ogItem.container.querySelector('#desc-desc').textContent = newItem.newDesc;
  ogItem.container.querySelector('#head-date').textContent = newItem.newDue;
  ogItem.container.querySelector('#desc-date').textContent = newItem.newDue;

  // update classes
  // create new ID
  const id = newItem.newName.toLowerCase().replace(/\s+/g, '');
  const container = document.querySelector(`#${ogItem.id}-${ogItem.type}-container`);
  container.id = `${id}-${ogItem.type}-container`;
  if (ogItem.type === 'project') {
    const header = document.querySelector(`#${ogItem.id}-${ogItem.type}-header`);
    header.id = `${id}-${ogItem.type}-header`;
  }
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
  } else if (form1 && type === 'edit') {
    e.preventDefault();
    hideEditModal();
    const itemEdit = readEdit();
    editOps.saveEdit(itemEdit);
  }
}

function readEdit() {
  const nameInput = document.querySelector('#edit-name-input').value;
  const descInput = document.querySelector('#edit-desc-input').value;
  const dueInput = document.querySelector('#edit-date-input').value;
  const itemEdit = {
    newName: nameInput,
    newDesc: descInput,
    newDue: dueInput,
  };
  return itemEdit;
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
  let projectList = [];

  // check if there is a projectList in local storage
  function initializeProjectList() {
    if (storageAvailable('localStorage') && localStorage.getItem('projectList') !== null) {
      projectList = JSON.parse(localStorage.getItem('projectList'));
      initialize.buildFromStorage(projectList);
    } else {
      projectList = [{
        type: 'project', projectID: 'default', name: 'Default', tasks: [],
      }];
    }
  }

  // test if storage is available in browser
  function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException
        // everything except Firefox
        && (e.code === 22
        // Firefox
        || e.code === 1014
        // test name field too, because code might not be present
        // everything except Firefox
        || e.name === 'QuotaExceededError'
        // Firefox
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
        // acknowledge QuotaExceededError only if there's something already stored
        && storage
        && storage.length !== 0
      );
    }
  }

  function saveProjectList(projectList) {
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }
  // function to store projects
  function storeProject(project) {
    // add project header to project list
    projectList.push(project);
    saveProjectList(projectList);
  }

  // function to store tasks
  function storeTask(task) {
    // find the project in the projectList
    let projectIndex = projectList.findIndex(project => (project.projectID === task.projectID));
    projectList[projectIndex].tasks.push(task);
    saveProjectList(projectList);
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
    saveProjectList(projectList);
  }

  function deleteTask(project, id) {
    const parentArr = project.split('-');
    const parentProj = parentArr[0];
    let projectIndex = projectList.findIndex(project => (project.projectID === parentProj));
    let taskIndex = projectList[projectIndex].tasks.findIndex(task => (task.taskID === id));
    projectList[projectIndex].tasks.splice(taskIndex, 1);
    saveProjectList(projectList);
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
    saveProjectList(projectList);
    return lastPriority;
  }

  function updateProjectPriority(projectID, updateValue) {
    const index = getProjectIndex(projectID);
    const lastPriority = projectList[index].priority;
    projectList[index].priority = updateValue;
    saveProjectList(projectList);
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
    saveProjectList(projectList);
    return {
      statusVal,
      status,
    };
  }

  function updateInfo(oldInfo, newInfo) {
    if (oldInfo.type === 'project') {
      const index = getProjectIndex(oldInfo.id);
      projectList[index].name = newInfo.newName;
      projectList[index].description = newInfo.newDesc;
      projectList[index].dueDate = newInfo.newDue;
      projectList[index].projectID = newInfo.newName.toLowerCase().replace(/\s+/g, '');
    } else {
      const index = getTaskIndex(oldInfo.projectID, oldInfo.id);
      const task = projectList[index.projectIndex].tasks[index.taskIndex];
      task.name = newInfo.newName;
      task.description = newInfo.newDesc;
      task.dueDate = newInfo.newDue;
      task.taskID = newInfo.newName.toLowerCase().replace(/\s+/g, '');
    }
    saveProjectList(projectList);
  }

  return {
    initializeProjectList,
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
    updateInfo,
  };
})();

// initialization
const initialize = (() => {
  // initialize object storage
  function loadFromStorage() {
    objectStorage.initializeProjectList();
  }

  // build current page from stored projectList
  function buildFromStorage(projectList) {
    console.log(projectList);

    // fist entry is default container
    projectList[0].tasks.forEach(task => buildTask(task));

    // build each project and tasks
    for (let i = 1; i < projectList.length; i += 1) {
      buildProject(projectList[i]);
      projectList[i].tasks.forEach(task => buildTask(task));
    }
  }

  // initialize event listeners
  addModalEventListeners();
  submitEventListeners();
  priorityEventListeners();
  toolbarEventListener();

  return {
    loadFromStorage,
    buildFromStorage,
  };
})();

initialize.loadFromStorage();


