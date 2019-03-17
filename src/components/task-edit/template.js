import moment from 'moment';
import {
  Color,
  colorList,
} from '../../data/tasks';

const getHashTagsTemplate = (tags) => tags
  .map((tag) => `<span class="card__hashtag-inner">
    <input
      type="hidden"
      name="hashtag"
      value="${tag}"
      class="card__hashtag-hidden-input"
    />
    <button type="button" class="card__hashtag-name">
      #${tag}
    </button>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>`).join(``);

const getRepeatingDaysTemplate = (repeatingDays) => Object.keys(repeatingDays)
  .map((day, index) => `<input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-mo-${index + 1}"
    name="repeat"
    value="${day}"
    ${repeatingDays[day] && `checked`}
  />
  <label class="card__repeat-day" for="repeat-mo-${index + 1}"
    >${day}</label
  >`).join(``);

const getColorsTemplate = (id, currentColor) => colorList.map((color) => `<input
    type="radio"
    id="color-${color}-${id}"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${currentColor === color && `checked`}
  />
  <label
    for="color-${color}-${id}"
    class="card__color card__color--${color}"
  >
    ${color}
  </label>`).join(``);

export default (
    id,
    title,
    dueDate,
    tags,
    picture,
    color,
    repeatingDays,
    isFavorite,
    isDone,
    isDate,
    isRepeated
) => {
  const repeatClass = isRepeated ? `card--repeat` : ``;

  return `<article class="card card--edit ${Color[color]} ${repeatClass}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive ${isDone ? `` : `card__btn--disabled`}">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites ${isFavorite ? `` : `card__btn--disabled`}"
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
            >${title}</textarea>
          </label>
        </div>
  
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${isDate ? `yes` : `no`}</span>
              </button>
  
              <fieldset class="card__date-deadline" ${!isDate && `disabled`}>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder="23 September"
                    name="date"
                    value="${dueDate ? moment(dueDate).format(`D MMMM`) : ``}"
                  />
                </label>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__time"
                    type="text"
                    placeholder="11:15 PM"
                    name="time"
                    value="${dueDate ? moment(dueDate).format(`HH:mm A`) : ``}"
                  />
                </label>
              </fieldset>
  
              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${isRepeated ? `yes` : `no`}</span>
              </button>
  
              <fieldset class="card__repeat-days" ${!isRepeated && `disabled`}>
                <div class="card__repeat-days-inner">
                  ${getRepeatingDaysTemplate(repeatingDays)}
                </div>
              </fieldset>
            </div>
            
  
            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${getHashTagsTemplate([...tags])}
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
  
          <label class="card__img-wrap ${picture ? `` : `card__img-wrap--empty`}">
            <input
              type="file"
              class="card__img-input visually-hidden"
              name="img"
            />
            <img
              src="${picture}"
              alt="task picture"
              class="card__img"
            />
          </label>
  
          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${getColorsTemplate(id, color)}
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
