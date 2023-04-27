//import functions
import {
  priorityOps,
  editOps,
  markTaskComplete,
  deleteItem,
  toggleInfo,
} from './btns';
import {
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

export {
  toolbarEventListener,
  submitEventListeners,
  priorityEventListeners,
  addModalEventListeners,
  removeModalEventListeners,
  addActionEventListeners,
  addEditBtnEventListeners,
};
