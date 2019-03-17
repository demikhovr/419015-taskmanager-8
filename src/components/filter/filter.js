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
    this.onChange = null;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  set onChange(fn) {
    this._onChange = fn;
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
    this._onChange(filter);
  }
}
