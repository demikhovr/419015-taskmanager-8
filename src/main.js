import filtersData from './data/filters';
import tasksData, {filters as taskFilters} from './data/tasks';
import makeFilter from './make-filter';
import Task from './components/task/task';
import TaskEdit from './components/task-edit/task-edit';

const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);

const clearTasks = () => {
  tasksContainer.innerHTML = ``;
};

const renderFilters = (filters, tasks) => {
  const data = filters.map((filter) => {
    filter.amount = tasks.filter(taskFilters[filter.type]).length;
    return filter;
  });

  return filtersContainer.insertAdjacentHTML(
      `beforeend`,
      data.map(makeFilter).join(``)
  );
};

const renderTasks = (tasks) => tasks.forEach((it) => {
  const task = new Task(it);
  const taskEdit = new TaskEdit(it);
  tasksContainer.appendChild(task.render());

  task.onEdit = () => {
    taskEdit.render();
    tasksContainer.replaceChild(taskEdit.element, task.element);
    task.unrender();
  };

  taskEdit.onSubmit = () => {
    task.render();
    tasksContainer.replaceChild(task.element, taskEdit.element);
    taskEdit.unrender();
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
