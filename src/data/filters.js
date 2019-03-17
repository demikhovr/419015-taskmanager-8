import moment from 'moment';

const DIFF_GRANULARITY = `day`;
export const DEFAULT_FILTER_TYPE = `all`;
export const FAVORITES_FILTER = `favorites`;
export const ARCHIVE_FILTER = `archive`;
export const filters = {
  all: (task) => task,
  overdue: ({dueDate}) => dueDate <= Date.now(),
  today: ({dueDate}) => moment(dueDate).isSame(moment(), DIFF_GRANULARITY),
  repeating: ({repeatingDays}) => Object.keys(repeatingDays).filter((day) => repeatingDays[day]).length,
  tags: ({tags}) => [...tags].length,
  favorites: ({isFavorite}) => isFavorite,
  archive: ({isDone}) => isDone,
};
export default [
  {
    type: `all`,
  },
  {
    type: `overdue`,
  },
  {
    type: `today`,
  },
  {
    type: `favorites`,
  },
  {
    type: `repeating`,
  },
  {
    type: `tags`,
  },
  {
    type: `archive`,
  },
];
