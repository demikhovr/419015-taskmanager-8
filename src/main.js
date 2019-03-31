import flatpickr from 'flatpickr';
import moment from 'moment';
import Chart from 'chart.js';
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
import {
  statisticPeriodConfig,
  daysChartConfig,
  tagsChartConfig,
  colorsChartConfig,
} from './data/data';

const controlBtnsWrapper = document.querySelector(`.control__btn-wrap`);
const boardContainer = document.querySelector(`.board`);
const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);
const statisticContainer = document.querySelector(`.statistic`);
const statisticPeriodInput = statisticContainer.querySelector(`.statistic__period-input`);
const daysCtx = document.querySelector(`.statistic__days`);
const tagsCtx = document.querySelector(`.statistic__tags`);
const colorsCtx = document.querySelector(`.statistic__colors`);
let daysChart = null;
let tagsChart = null;
let colorsChart = null;
let currentFilterType = DEFAULT_FILTER_TYPE;

const initDaysChart = () => {
  if (daysChart) {
    daysChart.destroy();
  }

  daysChart = new Chart(daysCtx, daysChartConfig);
};

const initTagsChart = () => {
  if (tagsChart) {
    tagsChart.destroy();
  }

  tagsChart = new Chart(tagsCtx, tagsChartConfig);
};

const initColorsChart = () => {
  if (colorsChart) {
    colorsChart.destroy();
  }

  colorsChart = new Chart(colorsCtx, colorsChartConfig);
};

const showTasks = () => {
  boardContainer.classList.remove(`visually-hidden`);
  statisticContainer.classList.add(`visually-hidden`);
};

const initCharts = () => {
  initDaysChart();
  initTagsChart();
  initColorsChart();
};

const updateCharts = () => {
  daysChart.update();
  tagsChart.update();
  colorsChart.update();
};

statisticPeriodConfig.onClose = (selectedDates) => {
  const [start, end] = selectedDates;
  const startUnix = moment(start).valueOf();
  const endUnix = moment(end).valueOf();
  const data = tasksData.filter(({dueDate}) => startUnix < dueDate && dueDate < endUnix);
  updateCharts(data);
};

const showStatistic = () => {
  boardContainer.classList.add(`visually-hidden`);
  statisticContainer.classList.remove(`visually-hidden`);
  flatpickr(statisticPeriodInput, statisticPeriodConfig);
  initCharts();
};

const controlsMapper = {
  'control__task': showTasks,
  'control__new-task': showTasks,
  'control__statistic': showStatistic,
};

const onControlBtnChange = ({target}) => {
  const {id} = target;

  if (controlsMapper[id]) {
    controlsMapper[id]();
  }
};

const clearTasks = () => (tasksContainer.innerHTML = ``);
const clearFilters = () => (filtersContainer.innerHTML = ``);

const renderFilters = (filters, tasks) => {
  clearFilters();

  filters.forEach(({type}) => {
    const isChecked = type === currentFilterType;
    const amount = tasks.filter(taskFilters[type]).length;
    const filter = new Filter({type, isChecked, amount});
    filter.onFilter = (filterName) => (currentFilterType = filterName);
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
      const index = tasksData.findIndex((task) => task.id === id);
      tasksData[index] = {
        ...tasksData[index],
        isFavorite,
      };

      updateTasks(taskComponent, tasksData, FAVORITES_FILTER);
    };

    taskComponent.onAddToArchive = (id, isDone) => {
      const index = tasksData.findIndex((task) => task.id === id);
      tasksData[index] = {
        ...tasksData[index],
        isDone,
      };

      updateTasks(taskComponent, tasksData, ARCHIVE_FILTER);
    };

    taskEditComponent.onSubmit = (task) => {
      Object.keys(task).forEach((prop) => (taskComponent[prop] = task[prop]));
      taskComponent.update(taskComponent);
      taskComponent.render();
      tasksContainer.replaceChild(taskComponent.element, taskEditComponent.element);
      taskEditComponent.destroy();
    };

    taskEditComponent.onDelete = (id) => {
      const index = tasksData.findIndex((task) => task.id === id);
      tasksData.splice(index, 1);
      taskEditComponent.destroy();
      taskComponent = null;
      taskEditComponent = null;
      renderFilters(filtersData, tasksData);
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
controlBtnsWrapper.addEventListener(`change`, onControlBtnChange);
