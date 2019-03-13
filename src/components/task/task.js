import Component from '../component';
import makeTemplate from './template';

export default class Task extends Component {
  constructor({
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
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._isFavorite = isFavorite;
    this._isDone = isDone;

    this._onEdit = null;
    this._onEditBtnClick = this._onEditBtnClick.bind(this);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return makeTemplate(
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
    this._editBtnRef.addEventListener(`click`, this._onEditBtnClick);
  }

  removeListeners() {
    this._editBtnRef.removeEventListener(`click`, this._onEditBtnClick);
  }

  _onEditBtnClick() {
    return typeof this._onEdit === `function` === this._onEdit();
  }
}
