import Component from '../component';
import makeTemplate from './template';

export default class Task extends Component {
  constructor(data) {
    super();
    this._data = data;
    this._onEdit = null;
    this._onEditBtnClick = this._onEditBtnClick.bind(this);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return makeTemplate(this._data);
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
