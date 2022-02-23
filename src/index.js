import './style.css';

let tasks = [];
const taskWrapper = document.querySelector('.to-dos');
const newTask = document.querySelector('.new-task');
const addNewTask = document.querySelector('.submit');
const clearAll = document.querySelector('.clear-all');

const addToLocalStorage = () => {
  localStorage.setItem('myTasks', JSON.stringify(tasks));
};

const getFromLocalStorage = () => {
  if (localStorage.getItem('myTasks')) {
    tasks = JSON.parse(localStorage.getItem('myTasks'));
  }
  return tasks;
};

const resetIndex = (tasks) => {
  for (let i = 0; i < tasks.length; i += 1) {
    const indx = i + 1;
    tasks[i].index = indx;
  }
};

const editTask = (desc, index) => {
  tasks[index - 1].description = desc;
  addToLocalStorage();
};

const setState = (tasks, checkbox, index) => {
  const decrease = index - 1;
  if (checkbox.checked) {
    tasks[decrease].checked = true;
  } else {
    tasks[decrease].checked = false;
  }
};

const displayTasks = () => {
  taskWrapper.innerHTML = '';
  const mylocal = getFromLocalStorage();

  mylocal.forEach((tsk) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    if (tsk.checked === true) {
      checkbox.setAttribute('checked', 'checked');
    }
    checkbox.addEventListener('change', (e) => {
      e.preventDefault();
      setState(tasks, e.target, tsk.index);
      addToLocalStorage();
    });

    const rmvTask = (index) => {
      const mylocal = getFromLocalStorage();
      mylocal.splice(index, 1);
      for (let i = index; i < mylocal.length; i += 1) {
        mylocal[i].index -= 1;
      }
      addToLocalStorage();
      displayTasks();
    };

    const taskDesc = document.createElement('input');
    taskDesc.classList.add('todotask');
    taskDesc.value = tsk.description;

    const deleteTask = document.createElement('i');
    taskDesc.addEventListener('change', (e) => {
      e.preventDefault();
      editTask(e.target.value, tsk.index);
      taskDesc.blur();
    });
    deleteTask.classList.add('fas', 'fa-ellipsis-v');
    deleteTask.addEventListener('click', () => {
      rmvTask(tsk.index);
      resetIndex(mylocal);
      addToLocalStorage();
      displayTasks();
    });

    li.append(checkbox, taskDesc, deleteTask);
    taskWrapper.appendChild(li);
  });
};
const ClearcompletedTasks = () => {
  tasks = tasks.filter((item) => item.checked === false);
  resetIndex(tasks);
  addToLocalStorage();
  displayTasks();
};

clearAll.addEventListener('click', () => {
  ClearcompletedTasks();
});

const addToTasks = () => {
  const lengt = tasks.length;
  tasks.push({
    checked: false,
    description: newTask.value,
    index: lengt,
  });
  newTask.value = '';
  addToLocalStorage();
  displayTasks();
};

addNewTask.addEventListener('click', (e) => {
  e.preventDefault();
  addToTasks();
});

document.addEventListener('DOMContentLoaded', () => {
  getFromLocalStorage();
  displayTasks();
});
