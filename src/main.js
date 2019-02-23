import makeFilter from './make-filter';
import makeTask from './make-task';

const filtersData = [
  {
    caption: `all`,
    amount: 15,
    isChecked: true,
  },
  {
    caption: `overdue`,
    amount: 0,
    isChecked: false,
  },
  {
    caption: `today`,
    amount: 0,
    isChecked: false,
  },
  {
    caption: `favorites`,
    amount: 7,
    isChecked: false,
  },
  {
    caption: `repeating`,
    amount: 2,
    isChecked: false,
  },
  {
    caption: `tags`,
    amount: 6,
    isChecked: false,
  },
  {
    caption: `archive`,
    amount: 115,
    isChecked: false,
  },
];

const tasksData = [
  {
    color: `black`,
    isEdit: false,
    isMissingDeadline: false,
    isFavorite: true,
    description: `This is example of new task, you can add picture, set date and time, add tags.`,
  },
  {
    color: `pink`,
    isEdit: false,
    isMissingDeadline: false,
    isFavorite: false,
    repeat: true,
    description: `It is example of repeating task. It marks by wave.`,
    tags: [`repeat`, `cinema`, `entertaiment`],
  },
  {
    color: `yellow`,
    isEdit: false,
    isMissingDeadline: false,
    isFavorite: false,
    deadline: true,
    description: `This is card with missing deadline`,
    tags: [`repeat`, `cinema`, `entertaiment`],
  },
  {
    color: `yellow`,
    isEdit: false,
    isMissingDeadline: false,
    isFavorite: true,
    repeat: true,
    description: `Here is a card with filled data`,
    tags: [`repeat`, `cinema`, `entertaiment`],
    deadline: {
      date: `23 September`,
      time: `11:15 PM`,
    },
  },
  {
    color: `blue`,
    isEdit: false,
    isMissingDeadline: false,
    isFavorite: true,
    isArchived: true,
    tags: [`repeat`, `cinema`, `entertaiment`],
  },
  {
    color: `blue`,
    isEdit: false,
    isMissingDeadline: false,
    isFavorite: false,
    tags: [`repeat`, `cinema`, `entertaiment`],
    deadline: {
      date: `23 September`,
      time: `11:15 PM`,
    },
  },
  {
    color: `green`,
    isEdit: false,
    isMissingDeadline: false,
    tags: [`repeat`, `cinema`, `entertaiment`],
    deadline: {
      date: `23 September`,
      time: `11:15 PM`,
    },
  }
];

const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);

const clearTasks = () => {
  tasksContainer.innerHTML = ``;
};


const renderFilters = (filters) => filtersContainer.insertAdjacentHTML(
    `beforeend`,
    filters.map(makeFilter).join(``)
);

const renderTasks = (tasks) => tasksContainer.insertAdjacentHTML(
    `beforeend`,
    tasks.map(makeTask).join(``)
);

filtersContainer.addEventListener(`click`, ({target}) => {
  if (target.name === `filter`) {
    clearTasks();

    switch (target.id) {
      case `filter__all`: {
        renderTasks(tasksData);
        break;
      }
      case `filter__repeating`: {
        renderTasks(tasksData.filter(({repeat}) => repeat));
        break;
      }
      case `filter__tags`: {
        renderTasks(tasksData.filter(({tags}) => tags));
        break;
      }
      case `filter__favorites`: {
        renderTasks(tasksData.filter(({isFavorite}) => isFavorite));
        break;
      }
      case `filter__archive`:
        renderTasks(tasksData.filter(({isArchived}) => isArchived));
    }
  }
});

renderFilters(filtersData);
renderTasks(tasksData);
