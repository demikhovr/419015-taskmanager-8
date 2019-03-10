import {createElement} from '../../utils/util';
import makeTemplate from './template';

export default class TaskEdit {
  constructor(data) {
    this.data = data;
    this._element = null;
    this._onSubmit = null;
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get element() {
    return this._element;
  }

  get template() {
    return makeTemplate(this.data);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  bind() {
    this._form = this._element.querySelector(`.card__form`);
    this._form.addEventListener(`submit`, this._onFormSubmit);
  }

  unbind() {
    this._form.removeEventListener(`submit`, this._onFormSubmit);
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
  }
}
