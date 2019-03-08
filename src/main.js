import filtersData from './data/filters';
import tasksData, {filters as taskFilters} from './data/tasks';
import makeFilter from './make-filter';
import makeTask from './make-task';

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

const renderTasks = (tasks) => tasksContainer.insertAdjacentHTML(
    `beforeend`,
    tasks.map(makeTask).join(``)
);

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
