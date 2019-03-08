import moment from 'moment';
import {
  getRandomArrayItems,
  getRandomNumber,
} from '../utils/util';

const TASKS_AMOUNT = 7;
const MAX_DAYS_AMOUNT = 7;
const HOURS = 24;
const MINUTES = 60;
const SECONDS = 60;
const MILLISECONDS = 1000;
const MAX_TAGS_AMOUNT = 3;
const DIFF_GRANULARITY = `day`;

const titleList = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const tagList = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
];

const colorList = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

const getDueDate = () => {
  const randomNumber = getRandomNumber();
  const week = getRandomNumber(MAX_DAYS_AMOUNT) * HOURS * MINUTES * SECONDS * MILLISECONDS;
  return Date.now() + (randomNumber ? -week : week);
};

const getTask = () => ({
  title: titleList[getRandomNumber(titleList.length - 1)],
  dueDate: getDueDate(),
  tags: new Set(getRandomArrayItems(tagList, MAX_TAGS_AMOUNT)),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: colorList[getRandomNumber(colorList.length - 1)],
  repeatingDays: {
    mo: false,
    tu: false,
    we: false,
    th: Boolean(getRandomNumber()),
    fr: false,
    sa: false,
    su: false,
  },
  isFavorite: Boolean(getRandomNumber()),
  isDone: Boolean(getRandomNumber()),
});

export const filters = {
  all: (task) => task,
  overdue: ({dueDate}) => dueDate <= Date.now(),
  today: ({dueDate}) => moment(dueDate).isSame(moment(), DIFF_GRANULARITY),
  repeating: ({repeatingDays}) => Object.keys(repeatingDays).filter((day) => repeatingDays[day]).length,
  tags: ({tags}) => [...tags].length,
  favorites: ({isFavorite}) => isFavorite,
  archive: ({isDone}) => isDone,
};

export default new Array(TASKS_AMOUNT)
  .fill(null)
  .map(getTask);
