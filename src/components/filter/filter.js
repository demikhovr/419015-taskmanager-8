import Component from '../component';
import makeTemplate from './template';

export default class Filter extends Component {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return makeTemplate(this._data);
  }
}
