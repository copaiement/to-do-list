//import functions
import {
  objectStorage,
} from './objs';
import {
  hidePriorityModal,
  showPriorityModal,
  showEditModal,
  editItemDOM,
  showHideToolbar,
  showTaskModal,
  showProjModal,
} from './dom';
import {
  validateForm,
} from './inputs';

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

  // update project status if project !default
  if (item.projectID !== 'default') {
    updateProjectStatus(item.projectID);
  } else {
    objectStorage.updateProjectPriority('default');
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

export {
  toolbarEventListener,
  submitEventListeners,
  priorityEventListeners,
  addModalEventListeners,
  removeModalEventListeners,
  addActionEventListeners,
  addEditBtnEventListeners,
  getClickInfo,
  priorityOps,
  editOps,
  markTaskComplete,
  updateProjectStatus,
  deleteItem,
  toggleInfo,
};
