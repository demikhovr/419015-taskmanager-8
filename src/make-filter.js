export default ({
  caption,
  amount = 0,
  isChecked = false,
}) => `<input
    type="radio"
    id="filter__${caption.toLowerCase()}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? ` checked` : ``}
    ${!amount ? ` disabled` : ``}
  />
  <label for="filter__${caption.toLowerCase()}" class="filter__label">
    ${caption.toUpperCase()}
    <span class="filter__${caption.toLowerCase()}-count">${amount}</span>
  </label>`;
