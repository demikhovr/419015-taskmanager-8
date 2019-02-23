/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

const makeFilter = ({
  caption,
  amount = 0,
  isChecked = false,
}) => `<input
    type="radio"
    id="filter__${caption.toLowerCase()}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? ` checked` : ``}
    ${!amount ? ` disabled` : ``}
  />
  <label for="filter__${caption.toLowerCase()}" class="filter__label">
    ${caption.toUpperCase()}
    <span class="filter__${caption.toLowerCase()}-count">${amount}</span>
  </label>`;

const makeTask = ({
  color,
  isEdit,
  isMissingDeadline,
  isFavorite,
  repeat,
  description = ``,
  tags = [],
  deadline = {},
}) => {
  const editClass = isEdit ? `card--edit` : ``;
  const repeatClass = repeat ? `card--repeat` : ``;
  const deadlineClass = isMissingDeadline ? `card--deadline` : ``;
  const favoriteClass = isFavorite ? `` : `card__btn--disabled`;
  const hasDeadline = Object.keys(deadline).length ? `` : `disabled`;
  const hashTags = tags.map((tag) => `<span class="card__hashtag-inner">
        <input
          type="hidden"
          name="hashtag"
          value="repeat"
          class="card__hashtag-hidden-input"
        />
        <button type="button" class="card__hashtag-name">
          #${tag}
        </button>
        <button type="button" class="card__hashtag-delete">
          delete
        </button>
      </span>`).join(``);

  return `<article class="card ${editClass} card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${favoriteClass}"
            >
              favorites
            </button>
          </div>
    
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
    
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>
    
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">no</span>
                </button>
    
                <fieldset class="card__date-deadline" ${hasDeadline}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="23 September"
                      name="date"
                      value="${deadline.date}"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="11:15 PM"
                      name="time"
                      value="${deadline.time}"
                    />
                  </label>
                </fieldset>
    
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">no</span>
                </button>
    
                <fieldset class="card__repeat-days" ${hasDeadline}>
                  <div class="card__repeat-days-inner">
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-mo-5"
                      name="repeat"
                      value="${deadline.date}"
                    />
                    <label class="card__repeat-day" for="repeat-mo-5"
                      >mo</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-tu-5"
                      name="repeat"
                      value="tu"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-tu-5"
                      >tu</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-we-5"
                      name="repeat"
                      value="we"
                    />
                    <label class="card__repeat-day" for="repeat-we-5"
                      >we</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-th-5"
                      name="repeat"
                      value="th"
                    />
                    <label class="card__repeat-day" for="repeat-th-5"
                      >th</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-fr-5"
                      name="repeat"
                      value="fr"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-fr-5"
                      >fr</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      name="repeat"
                      value="sa"
                      id="repeat-sa-5"
                    />
                    <label class="card__repeat-day" for="repeat-sa-5"
                      >sa</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-su-5"
                      name="repeat"
                      value="su"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-su-5"
                      >su</label
                    >
                  </div>
                </fieldset>
              </div>
              
    
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${hashTags}
                </div>
    
                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>
    
            <label class="card__img-wrap card__img-wrap--empty">
              <input
                type="file"
                class="card__img-input visually-hidden"
                name="img"
              />
              <img
                src="img/add-photo.svg"
                alt="task picture"
                class="card__img"
              />
            </label>
    
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input
                  type="radio"
                  id="color-black-5"
                  class="card__color-input card__color-input--black visually-hidden"
                  name="color"
                  value="black"
                />
                <label
                  for="color-black-5"
                  class="card__color card__color--black"
                  >black</label
                >
                <input
                  type="radio"
                  id="color-yellow-5"
                  class="card__color-input card__color-input--yellow visually-hidden"
                  name="color"
                  value="yellow"
                />
                <label
                  for="color-yellow-5"
                  class="card__color card__color--yellow"
                  >yellow</label
                >
                <input
                  type="radio"
                  id="color-blue-5"
                  class="card__color-input card__color-input--blue visually-hidden"
                  name="color"
                  value="blue"
                />
                <label
                  for="color-blue-5"
                  class="card__color card__color--blue"
                  >blue</label
                >
                <input
                  type="radio"
                  id="color-green-5"
                  class="card__color-input card__color-input--green visually-hidden"
                  name="color"
                  value="green"
                  checked
                />
                <label
                  for="color-green-5"
                  class="card__color card__color--green"
                  >green</label
                >
                <input
                  type="radio"
                  id="color-pink-5"
                  class="card__color-input card__color-input--pink visually-hidden"
                  name="color"
                  value="pink"
                />
                <label
                  for="color-pink-5"
                  class="card__color card__color--pink"
                  >pink</label
                >
              </div>
            </div>
          </div>
    
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`;
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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map