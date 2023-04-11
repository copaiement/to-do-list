// import stylesheet
import './style.css';

// Event Listeners
const addTaskBtns = document.querySelectorAll('.create-task-btn');
const addProjBtns = document.querySelectorAll('.create-proj-btn');



// DOM manipulation
function hideModal(type) {
  const modal = document.querySelector(`.${type}-modal`);
  modal.classList.add('hidden');
}

function showModal(type) {
  const modal = document.querySelector(`.${type}-modal`);
  modal.classList.remove('hidden');
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
  project.id = `${projectObj.projectID}`;

  // create project header div (same structure as task)
  const projectHeader = buildItem(project, projectObj);
  // create left icons
  buildLeftIcons(projectHeader, projectObj);
  // create project header info
  buildInfo(projectHeader, projectObj);
  // create right icons
  buildRightIcons(projectHeader, projectObj);
  // update CSS classes
  updateClass(projectHeader, projectObj);

}

function buildTask(parentProjName, taskObj) {
  // find project container
  const parentProj = document.querySelector(`#${parentProjName}`);
  // create task container
  console.log(parentProj);
  const taskContainer = buildItem(parentProj, taskObj);
  // create left icons
  buildLeftIcons(taskContainer, taskObj);
  // create task info
  buildInfo(taskContainer, taskObj);
  // create right icons
  buildRightIcons(taskContainer, taskObj);
  // update CSS classes
  updateClass(taskContainer, taskObj);
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

function updateClass(container, object) {
  if (object.type === 'project') {
    // set class to "last" for newly added project
  } else {
    // get length of array

    
  }
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

// Input handling
function readForm(type1) {
  // read info from modal form

  // create new object from form information
  let newItem;
  if (type === 'task') {
    newItem = createTaskObj(type, projectID, name, description, dueDate, priority);
  } else {
    newItem = createProjectObj(type, projectID, name, description, dueDate, status, tasks);
  }
  //return object
  return newItem;
}
// Object creation

// create new task or project object
function createTaskObj(type, projectID, name, description, dueDate, priority) {
  return {
    type: type,
    projectID: projectID,
    name: name,
    description: description,
    dueDate: dueDate,
    priority: priority,
  };
}

// create new task or project object
function createProjectObj(type, projectID, name, description, dueDate, status, tasks) {
  return {
    type: type,
    projectID: projectID,
    name: name,
    description: description,
    dueDate: dueDate,
    status: status,
    tasks: [],
  };
}

function createTask() {
  // get info from form
  const task = readForm();
  console.log(task);
  // store task
  objectStorage.storeTask(task);
  // update DOM
  buildTask(task.projectID, task);
}

function createProject() {
  // get info from form
  const project = readForm();
  // store project
  objectStorage.storeProject(project);
  // update DOM
  buildProject(project);
}

// Object Manipulation

// object storage
const objectStorage = (() => {
  // initialize arrays
  let unsortedTasks = [];
  let projectList = [];

  // function to store projects
  function storeProject(project) {
    // add project header to project list
    projectList.push(project);
    console.log('PROJECT LIST');
    console.log(projectList);
    // create new array to hold tasks in project
  }

  // function to store tasks
  function storeTask(task) {
    if (task.projectId === 'default') {
      // if task is not assigned to a project, add to unsortedTasks
      unsortedTasks.push(task);
    } else {
      // find the project in the projectList
      let projectIndex = projectList.findIndex(project => (project.projectID === task.projectID));
      // if project does not exist (typo), add task to default
      if (projectIndex === -1) {
        unsortedTasks.push(task);
      } else {
        projectList[projectIndex].tasks.push(task);
      }
    }
  }

  function getProjectNames() {
    let projectNames = ['default'];
    projectList.forEach(project => projectNames.push(project.name));
    return projectNames;
  }

  return {
    storeProject,
    storeTask,
    getProjectNames,
  };
})();

// testing
function initialize() {
  const taskButton = document.querySelector('.test-task');
  const projButton = document.querySelector('.test-proj');
  taskButton.addEventListener('click', () => {
    testTask();
  });
  projButton.addEventListener('click', () => {
    testProj();
  });
}

function taskData() {
  // read info from modal form
  // testing values
  const type = 'task';
  const projectID = 'TEST';
  const name = 'Test 1';
  const description = 'desc here';
  const dueDate = '6/7';
  const status = '';
  // create new object from form information
  const newItem = createItem(type, projectID, name, description, dueDate, status);

  // return object
  return newItem;
}

function projData() {
  // read info from modal form
  // testing values
  const type = 'project';
  const project = 'TEST';
  const name = 'Test 1';
  const description = 'desc here';
  const dueDate = '6/7';
  const status = '';
  const tasks = [];
  // create new object from form information
  const newItem = createTestItem(type, project, name, description, dueDate, status, tasks);

  // return object
  return newItem;
}

function testTask() {
  // get info from form
  const task = taskData();
  console.log(task);
  // push to addTask
  objectStorage.storeTask(task);
  // update DOM
  buildTask(task.projectID, task);
}

function testProj() {
  // get info from form
  const project = projData();
  console.log(project);
  // push to addTask
  objectStorage.storeProject(project);
  // update DOM
  buildProject(project);
}

function createTestItem(type, projectID, name, description, dueDate, status) {
  return {
    type: type,
    projectID: projectID,
    name: name,
    description: description,
    dueDate: dueDate,
    status: status,
    tasks: [],
  };
}

initialize();
