import filtersData, {
  DEFAULT_FILTER_TYPE,
  FAVORITES_FILTER,
  ARCHIVE_FILTER,
  filters as taskFilters,
} from './data/filters';
import tasksData from './data/tasks';
import Task from './components/task/task';
import TaskEdit from './components/task-edit/task-edit';
import Filter from './components/filter/filter';

const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);
let currentFilterType = DEFAULT_FILTER_TYPE;

const clearTasks = () => (tasksContainer.innerHTML = ``);
const clearFilters = () => (filtersContainer.innerHTML = ``);

const renderFilters = (filters, tasks) => {
  clearFilters();

  filters.forEach(({type}) => {
    const isChecked = type === currentFilterType;
    const amount = tasks.filter(taskFilters[type]).length;
    const filter = new Filter({type, isChecked, amount});
    filter.onChange = (filterName) => (currentFilterType = filterName);
    filtersContainer.appendChild(filter.render());
  });
};

const updateTasks = (task, tasks, filter) => {
  renderFilters(filtersData, tasks);

  if (currentFilterType === filter) {
    task.destroy();
  }
};

const renderTasks = (data) => {
  clearTasks();

  data.forEach((it) => {
    let taskComponent = new Task(it);
    let taskEditComponent = new TaskEdit(it);
    tasksContainer.appendChild(taskComponent.render());

    taskComponent.onEdit = () => {
      taskEditComponent.render();
      tasksContainer.replaceChild(taskEditComponent.element, taskComponent.element);
      taskComponent.destroy();
    };

    taskComponent.onAddToFavorites = (id, isFavorite) => {
      const tasks = tasksData.map((task) => {
        if (task.id === id) {
          task.isFavorite = isFavorite;
        }

        return task;
      });

      updateTasks(taskComponent, tasks, FAVORITES_FILTER);
    };

    taskComponent.onAddToArchive = (id, isDone) => {
      const tasks = tasksData.map((task) => {
        if (task.id === id) {
          task.isDone = isDone;
        }

        return task;
      });

      updateTasks(taskComponent, tasks, ARCHIVE_FILTER);
    };

    taskEditComponent.onSubmit = (newTask) => {
      Object.keys(newTask).forEach((prop) => (taskComponent[prop] = newTask[prop]));
      taskComponent.update(taskComponent);
      taskComponent.render();
      tasksContainer.replaceChild(taskComponent.element, taskEditComponent.element);
      taskEditComponent.destroy();
    };

    taskEditComponent.onDelete = (taskId) => {
      const tasks = tasksData.filter(({id}) => id !== taskId);
      taskEditComponent.destroy();
      taskComponent = null;
      taskEditComponent = null;
      renderFilters(filtersData, tasks);
    };
  });
};

filtersContainer.addEventListener(`click`, ({target}) => {
  if (target.name === `filter`) {
    const filterName = target.id.replace(/filter__/, ``);
    const filter = taskFilters[filterName];
    renderTasks(tasksData.filter(filter));
  }
});

renderFilters(filtersData, tasksData);
renderTasks(tasksData);
