import moment from 'moment';
import Component from '../component';
import makeTemplate from './template';

export default class Task extends Component {
  constructor({
    id,
    title,
    dueDate,
    tags,
    picture,
    color,
    repeatingDays,
    isFavorite,
    isDone,
  }) {
    super();
    this._id = id;
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._isFavorite = isFavorite;
    this._isDone = isDone;

    this._onEdit = null;
    this._onAddToFavorites = null;
    this._onAddToArchive = null;
    this._onEditBtnClick = this._onEditBtnClick.bind(this);
    this._onFavorites = this._onFavorites.bind(this);
    this._onArchive = this._onArchive.bind(this);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  set onAddToFavorites(fn) {
    this._onAddToFavorites = fn;
  }

  set onAddToArchive(fn) {
    this._onAddToArchive = fn;
  }

  get template() {
    return makeTemplate(
        this._id,
        this._title,
        this._dueDate,
        this._tags,
        this._picture,
        this._color,
        this._repeatingDays,
        this._isFavorite,
        this._isDone
    );
  }

  createListeners() {
    this._editBtnRef = this._element.querySelector(`.card__btn--edit`);
    this._favoritesBtnRef = this._element.querySelector(`.card__btn--favorites`);
    this._archiveBtnRef = this._element.querySelector(`.card__btn--archive`);

    this._editBtnRef.addEventListener(`click`, this._onEditBtnClick);
    this._favoritesBtnRef.addEventListener(`click`, this._onFavorites);
    this._archiveBtnRef.addEventListener(`click`, this._onArchive);
  }

  removeListeners() {
    this._editBtnRef.removeEventListener(`click`, this._onEditBtnClick);
    this._favoritesBtnRef.removeEventListener(`click`, this._onFavorites);
    this._archiveBtnRef.removeEventListener(`click`, this._onArchive);
  }

  update(data) {
    this._title = data.title;
    this._dueDate = moment(`${data.dueDate} ${data.dueTime}`, `D MMMM HH:mm A`).valueOf(); // temporary, until there's no any backend
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;
  }

  _onEditBtnClick() {
    return typeof this._onEdit === `function` === this._onEdit();
  }

  _onFavorites({target}) {
    this._isFavorite = !this._isFavorite;
    target.classList.toggle(`card__btn--disabled`);
    this._onAddToFavorites(this._id, this._isFavorite);
  }

  _onArchive({target}) {
    this._isDone = !this._isDone;
    target.classList.toggle(`card__btn--disabled`);
    this._onAddToArchive(this._id, this._isDone);
  }
}
