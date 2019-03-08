export default ({
  type,
  amount = 0,
  isChecked = false,
}) => `<input
    type="radio"
    id="filter__${type.toLowerCase()}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? ` checked` : ``}
    ${!amount ? ` disabled` : ``}
  />
  <label for="filter__${type.toLowerCase()}" class="filter__label">
    ${type.toUpperCase()}
    <span class="filter__${type.toLowerCase()}-count">${amount}</span>
  </label>`;
