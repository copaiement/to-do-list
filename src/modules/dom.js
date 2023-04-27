//import functions
import {
  objectStorage,
} from './objs';
import {
  addModalEventListeners,
  removeModalEventListeners,
  addActionEventListeners,
  addEditBtnEventListeners,
} from './listen';

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

function buildSummary(container, taskObj) {
  // create Summary container
  const summary = document.createElement('div');
  container.appendChild(summary);
  summary.classList.add('summary');

  // if task completed (for load in from storage), set complete
  if (taskObj.complete) {
    summary.classList.add('complete');
  }
  // create left icons
  buildLeftIcons(summary);
  // create info
  buildInfo(summary, taskObj);
  // create right icons
  buildRightIcons(summary, taskObj);
  // update CSS classes
  updateClasses(summary, taskObj);
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

export {
  showHideToolbar,
  hidePriorityModal,
  showPriorityModal,
  hideTaskModal,
  hideProjModal,
  showTaskModal,
  showProjModal,
  showEditModal,
  hideEditModal,
  buildProjectList,
  buildProject,
  buildTask,
  buildSummary,
  buildFullDesc,
  buildItem,
  updateClasses,
  buildLeftIcons,
  buildInfo,
  buildRightIcons,
  editItemDOM,
};
