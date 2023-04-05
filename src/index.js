// import stylesheet
import './style.css';

// DOM manipulation
function domManipulate() {

}

function buildProject() {
  
  // create project div and insert
  const project = document.createElement('div');
  document.querySelector('.todo-container').appendChild(project);
  project.classList.add('project-container');

  // create project header div
  const projectHeader = document.createElement('div');
  project.appendChild(projectHeader);
  projectHeader.classList.add('project-header');

  // create left icons

  // create project header info

  // create right icons

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

  const desc = document.createElement('div');
  parent.appendChild(desc);
  desc.classList.add('desc');

  const due = document.createElement('div');
  parent.appendChild(due);
  due.classList.add('due');

  const status = document.createElement('div');
  parent.appendChild(status);
  status.classList.add('status');

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

// 