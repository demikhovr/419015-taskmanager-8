import moment from 'moment';

export default ({
  title,
  dueDate,
  tags,
  picture,
  color,
  repeatingDays,
  isFavorite,
  isDone,
}) => {
  const isRepeat = Object.values(repeatingDays).some((day) => day);
  const repeatClass = isRepeat ? `card--repeat` : ``;
  const deadlineClass = Date.now() > dueDate ? `card--deadline` : ``;

  return `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
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

      <div class="card__text">
        ${title}
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <span class="card__date">
              ${moment(dueDate).format(`D MMMM`)}
            </span>
            <span class="card__date">
              ${moment(dueDate).format(`HH:mm A`)}
            </span>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
              ${[...tags].map((tag) => `<span class="card__hashtag-inner">
                <button type="button" class="card__hashtag-name">
                  #${tag}
                </button>
              </span>`).join(``)}
            </div>
          </div>
        </div>

        <span class="card__img-wrap ${picture ? `` : `card__img-wrap--empty`}">
          <img
            src="${picture}"
            alt="task picture"
            class="card__img"
          />
        </span>
      </div>
    </div>
  </article>`;
};
