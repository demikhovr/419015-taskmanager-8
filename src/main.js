import filtersData from './data/filters';
import tasksData, {filters as taskFilters} from './data/tasks';
import Task from './components/task/task';
import TaskEdit from './components/task-edit/task-edit';
import Filter from './components/filter/filter';

const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);

const clearTasks = () => {
  tasksContainer.innerHTML = ``;
};

const renderFilters = (filters, tasks) => {
  filters.forEach(({type, isChecked}) => {
    const amount = tasks.filter(taskFilters[type]).length;
    const filter = new Filter({type, isChecked, amount});
    filtersContainer.appendChild(filter.render());
  });
};

const renderTasks = (tasks) => tasks.forEach((it) => {
  const task = new Task(it);
  const taskEdit = new TaskEdit(it);
  tasksContainer.appendChild(task.render());

  task.onEdit = () => {
    taskEdit.render();
    tasksContainer.replaceChild(taskEdit.element, task.element);
    task.destroy();
  };

  taskEdit.onSubmit = () => {
    task.render();
    tasksContainer.replaceChild(task.element, taskEdit.element);
    taskEdit.destroy();
  };
});

filtersContainer.addEventListener(`click`, ({target}) => {
  if (target.name === `filter`) {
    clearTasks();
    const filterName = target.id.replace(/filter__/, ``);
    const filter = taskFilters[filterName];
    renderTasks(tasksData.filter(filter));
  }
});

renderFilters(filtersData, tasksData);
renderTasks(tasksData);
