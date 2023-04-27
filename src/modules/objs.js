// import functions
import {
  toolbarEventListener,
  submitEventListeners,
  priorityEventListeners,
  addModalEventListeners,
  updateProjectStatus,
} from './btns';
import {
  buildProject,
  buildTask,
} from './dom';
import {
  readForm,
} from './inputs';

// initialization
const initialize = (() => {
  // initialize object storage
  function loadFromStorage() {
    objectStorage.initializeProjectList();
  }

  // build current page from stored projectList
  function buildFromStorage(projectList) {
    // remove hidden message
    document.querySelector('.empty-msg').classList.add('hidden');
    // fist entry is default container
    objectStorage.updateStatus(projectList[0].projectID);
    projectList[0].tasks.forEach(task => buildTask(task));

    // build each project and tasks
    for (let i = 1; i < projectList.length; i += 1) {
      buildProject(projectList[i]);
      // update status
      updateProjectStatus(projectList[i].projectID);
      // build tasks
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

// object storage
const objectStorage = (() => {
  // initialize arrays
  let projectList = [];

  // check if there is a projectList in local storage
  function initializeProjectList() {
    if (storageAvailable('localStorage') && localStorage.getItem('projectList') !== null) {
      projectList = JSON.parse(localStorage.getItem('projectList'));
      // if saved project list is not empty, build from storage
      if (projectList.length > 1 || projectList[0].tasks.length > 0) {
        initialize.buildFromStorage(projectList);
      }
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

export {
  objectStorage,
  createProject,
  createTask,
  createProjectObj,
  createTaskObj,
  initialize,
 };
