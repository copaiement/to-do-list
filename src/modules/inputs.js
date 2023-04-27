//import functions
import {
  createProject,
  createTask,
  createProjectObj,
  createTaskObj,
} from './objs';
import {
  editOps,
} from './btns';
import {
  hideTaskModal,
  hideProjModal,
  hideEditModal,
} from './dom';

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

export {
  validateForm,
  readEdit,
  readForm,
};
