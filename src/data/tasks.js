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

export const colorList = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

export const Color = {
  black: `card--black`,
  yellow: `card--yellow`,
  blue: `card--blue`,
  green: `card--green`,
  pink: `card--pink`,
};

const getDueDate = () => {
  const randomNumber = getRandomNumber();
  const week = getRandomNumber(MAX_DAYS_AMOUNT) * HOURS * MINUTES * SECONDS * MILLISECONDS;
  return Date.now() + (randomNumber ? -week : week);
};

const getTask = (item, id) => ({
  id,
  title: titleList[getRandomNumber(titleList.length - 1)],
  dueDate: getRandomNumber() < 0.5 ? getDueDate() : null,
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

export default new Array(TASKS_AMOUNT)
  .fill(null)
  .map(getTask);
