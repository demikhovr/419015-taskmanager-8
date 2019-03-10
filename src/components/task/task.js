import {createElement} from '../../utils/util';
import makeTemplate from './template';

export default class Task {
  constructor(data) {
    this._data = data;
    this._element = null;
    this._onEdit = null;
    this._onEditBtnClick = this._onEditBtnClick.bind(this);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get element() {
    return this._element;
  }

  get template() {
    return makeTemplate(this._data);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  bind() {
    this._editBtn = this._element.querySelector(`.card__btn--edit`);
    this._editBtn.addEventListener(`click`, this._onEditBtnClick);
  }

  unbind() {
    this._editBtn.removeEventListener(`click`, this._onEditBtnClick);
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

  _onEditBtnClick() {
    return typeof this._onEdit === `function` === this._onEdit();
  }
}
