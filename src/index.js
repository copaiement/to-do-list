// import stylesheet
import './style.css';

// DOM manipulation

function buildProject(projectObj) {
  // create project div and insert
  const project = document.createElement('div');
  document.querySelector('.todo-container').appendChild(project);
  project.classList.add('project-container');

  // create project header div (same structure as task)
  const projectHeader = buildItem(project, projectObj);
  // create left icons
  buildLeftIcons(projectHeader, projectObj);
  // create project header info
  buildInfo(projectHeader, projectObj);
  // create right icons
  buildRightIcons(projectHeader, projectObj);
  // make project-header only
  projectHeader.classList.add('only');
}

function buildTaks(parentProj, taskObj) {
  // create task container
  const taskContainer = buildItem(parentProj, taskObj);
  // create left icons
  buildLeftIcons(taskContainer, taskObj);
  // create task info
  buildInfo(taskContainer, taskObj);
  // create right icons
  buildRightIcons(taskContainer, taskObj);
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

function buildLeftIcons(parent, object) {
  // create project header icons container, left
  const IconsLeft = document.createElement('div');
  parent.appendChild(projectIconsLeft);
  IconsLeft.classList.add('icons-left');

  // create project header icons, left
  const menuDownIcon = document.createElement('img');
  IconsLeft.appendChild(menuDownIcon);
  menuDownIcon.src = './images/menu-down.svg';
  menuDownIcon.alt = 'menu down icon';
  menuDownIcon.classList.add('hidden');
  const menuUpIcon = document.createElement('img');
  IconsLeft.appendChild(menuUpIcon);
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
  checkIcon.src = './images/check-bold.svg';
  checkIcon.alt = 'check icon';
  const flagIcon = document.createElement('img');
  IconsRight.appendChild(flagIcon);
  flagIcon.src = './images/flag.svg';
  flagIcon.alt = 'flag icon';
  const trashIcon = document.createElement('img');
  IconsRight.appendChild(trashIcon);
  trashIcon.src = './images/delete.svg';
  trashIcon.alt = 'trash icon';
}

// Object creation

// create new task
function createItem(type, project, name, description, dueDate, status) {
  return {
    type: type,
    project: project,
    name: name,
    description: description,
    dueDate: dueDate,
    status: status,
  };
}

// object storage
let unsortedTasks = [];

let projectList = [];

// to make a new project:
// create project, then add to project list. first entry is "task" which
// contains all project information
// next entries in project are the tasks

// add to projectList
function addProject(project) {
  projectList.push(project);
}
