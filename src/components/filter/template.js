export default (
    type,
    amount = 0,
    isChecked = false
) => `<span class="filter__item">
  <input
    type="radio"
    id="filter__${type.toLowerCase()}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? `checked` : ``}
    ${!amount ? `disabled` : ``}
  />
  <label for="filter__${type.toLowerCase()}" class="filter__label">
    ${type.toUpperCase()}
    <span class="filter__${type.toLowerCase()}-count">${amount}</span>
  </label>
</span>`;
