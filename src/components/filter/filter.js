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
  }

  get template() {
    return makeTemplate(
        this.type,
        this.amount,
        this.isChecked
    );
  }
}
