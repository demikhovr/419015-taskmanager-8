import Component from '../component';
import makeTemplate from './template';

export default class Filter extends Component {
  constructor({
    type,
    amount,
    isChecked,
  }) {
    super();
    this.type = type;
    this.amount = amount;
    this.isChecked = isChecked;
    this.onFilter = null;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return makeTemplate(
        this.type,
        this.amount,
        this.isChecked
    );
  }

  createListeners() {
    this._element.addEventListener(`change`, this._onFilterChange);
  }

  removeListeners() {
    this._element.removeEventListener(`change`, this._onFilterChange);
  }

  _onFilterChange({target}) {
    const filter = target.id.replace(/filter__/, ``);

    if (typeof this._onFilter === `function`) {
      this._onFilter(filter);
    }
  }
}
