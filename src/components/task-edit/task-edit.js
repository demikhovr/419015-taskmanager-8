import Component from '../component';
import makeTemplate from './template';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {
  dateConfig,
  timeConfig,
  imageTypes,
} from '../../data/data';
import moment from 'moment';

export default class TaskEdit extends Component {
  constructor({
    id,
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
    this._id = id;
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._isFavorite = isFavorite;
    this._isDone = isDone;

    this._state.isDate = Boolean(this._dueDate);
    this._state.isRepeated = Object.values(repeatingDays).some((day) => day);

    this._onSubmit = null;
    this._onDelete = null;
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onFormChange = this._onFormChange.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
    this._onImageUpdate = this._onImageUpdate.bind(this);
    this._onFavorites = this._onFavorites.bind(this);
    this._onArchive = this._onArchive.bind(this);
    this._onInputHashTag = this._onInputHashTag.bind(this);
    this._onDeleteTask = this._onDeleteTask.bind(this);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get template() {
    return makeTemplate(
        this._id,
        this._title,
        this._dueDate,
        this._tags,
        this._picture,
        this._color,
        this._repeatingDays,
        this._isFavorite,
        this._isDone,
        this._state.isDate,
        this._state.isRepeated
    );
  }

  createListeners() {
    this._formRef = this._element.querySelector(`.card__form`);
    this._dateDeadlineToggleRef = this._element.querySelector(`.card__date-deadline-toggle`);
    this._repeatToggleRef = this._element.querySelector(`.card__repeat-toggle`);
    this._imgInputRef = this._element.querySelector(`.card__img-input`);
    this._imgRef = this._element.querySelector(`.card__img`);
    this._dateRef = this._element.querySelector(`.card__date`);
    this._timeRef = this._element.querySelector(`.card__time`);
    this._favoritesBtnRef = this._element.querySelector(`.card__btn--favorites`);
    this._archiveBtnRef = this._element.querySelector(`.card__btn--archive`);
    this._hashTagInputRef = this._element.querySelector(`.card__hashtag-input`);
    this._deleteBtnRef = this._element.querySelector(`.card__delete`);

    this._formRef.addEventListener(`submit`, this._onFormSubmit);
    this._formRef.addEventListener(`change`, this._onFormChange);
    this._dateDeadlineToggleRef.addEventListener(`click`, this._onChangeDate);
    this._repeatToggleRef.addEventListener(`click`, this._onChangeRepeated);
    this._imgInputRef.addEventListener(`change`, this._onImageUpdate);
    this._favoritesBtnRef.addEventListener(`click`, this._onFavorites);
    this._archiveBtnRef.addEventListener(`click`, this._onArchive);
    this._hashTagInputRef.addEventListener(`input`, this._onInputHashTag);
    this._deleteBtnRef.addEventListener(`click`, this._onDeleteTask);

    if (this._state.isDate) {
      flatpickr(this._dateRef, dateConfig);
      flatpickr(this._timeRef, timeConfig);
    }
  }

  removeListeners() {
    this._formRef.removeEventListener(`submit`, this._onFormSubmit);
    this._formRef.removeEventListener(`change`, this._onFormChange);
    this._dateDeadlineToggleRef.removeEventListener(`click`, this._onChangeDate);
    this._repeatToggleRef.removeEventListener(`click`, this._onChangeRepeated);
    this._imgInputRef.removeEventListener(`change`, this._onImageUpdate);
    this._favoritesBtnRef.removeEventListener(`click`, this._onFavorites);
    this._archiveBtnRef.removeEventListener(`click`, this._onArchive);
    this._hashTagInputRef.removeEventListener(`input`, this._onInputHashTag);
    this._deleteBtnRef.removeEventListener(`click`, this._onDeleteTask);
  }

  update(data) {
    this._title = data.title;
    this._dueDate = data.dueDate ? moment(`${data.dueDate} ${data.dueTime}`, `D MMMM HH:mm A`).valueOf() : null;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;
  }

  _processForm(formData) {
    const entry = {
      id: this._id,
      title: ``,
      color: ``,
      tags: new Set(),
      picture: ``,
      dueDate: ``,
      repeatingDays: {
        mo: false,
        tu: false,
        we: false,
        th: false,
        fr: false,
        sa: false,
        su: false,
      },
      isFavorite: this._isFavorite,
      isDone: this._isDone,
    };

    const taskEditMapper = this.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  _onFormSubmit(evt) {
    evt.preventDefault();

    const formData = new FormData(this._formRef);
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  _onFormChange({target}) {
    const formData = new FormData(this._formRef);
    const newData = this._processForm(formData);
    this.update(newData);

    if (target.name === `color`) {
      this._partialUpdate();
    }
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this._partialUpdate();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this._partialUpdate();
  }

  _onImageUpdate({target}) {
    const [imgFile] = target.files;

    if (!imgFile || !TaskEdit.checkImageType(imgFile.name)) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.addEventListener(`load`, () => {
      this._picture = fileReader.result;
      this._imgRef.src = fileReader.result;
    });

    fileReader.readAsDataURL(imgFile);
  }

  _onFavorites({target}) {
    this._isFavorite = !this._isFavorite;
    target.classList.toggle(`card__btn--disabled`);
  }

  _onArchive({target}) {
    this._isDone = !this._isDone;
    target.classList.toggle(`card__btn--disabled`);
  }

  _partialUpdate() {
    this.removeListeners();
    const oldElement = this._element;
    oldElement.parentNode.replaceChild(this.render(), oldElement);
  }

  _onInputHashTag({target}) {
    const {value} = target;
    const HASH_TAG_MIN_LENGTH = 3;

    if (value.trim().length <= HASH_TAG_MIN_LENGTH) {
      return;
    }

    const HASH_TAG_SEPARATORS = [`,`, ` `];
    const lastSymbol = value.slice(-1);

    if (HASH_TAG_SEPARATORS.includes(lastSymbol)) {
      this._tags.add(value.slice(0, -1).trim());
      this._partialUpdate();
      this._hashTagInputRef.focus();
    }
  }

  _onDeleteTask() {
    if (typeof this._onDelete === `function`) {
      this._onDelete(this._id);
    }
  }

  createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => (target.title = value),
      color: (value) => (target.color = value),
      repeat: (value) => (target.repeatingDays[value] = true),
      img: () => (target.picture = this._picture),
      date: (value) => (target.dueDate = value),
      time: (value) => (target.dueTime = value),
    };
  }

  static checkImageType(fileName) {
    return imageTypes.some((type) => fileName.endsWith(type));
  }
}
