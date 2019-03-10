import Component from '../component';
import makeTemplate from './template';

export default class TaskEdit extends Component {
  constructor(data) {
    super();
    this._data = data;
    this._onSubmit = null;
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get template() {
    return makeTemplate(this._data);
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
