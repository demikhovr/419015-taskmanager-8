import Component from '../component';
import makeTemplate from './template';

export default class TaskEdit extends Component {
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

    this._onSubmit = null;
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
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
    this._formRef = this._element.querySelector(`.card__form`);
    this._formRef.addEventListener(`submit`, this._onFormSubmit);
  }

  removeListeners() {
    this._formRef.removeEventListener(`submit`, this._onFormSubmit);
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
  }
}
