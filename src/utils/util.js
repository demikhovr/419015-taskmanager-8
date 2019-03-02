export const getRandomNumber = (max = 1, min = 0, accuracy = 1) => {
  const randomNumber = Math.random() * (max - min + 1) + (min - 0.5);
  return Math.round(randomNumber * accuracy) / accuracy;
};

export const getRandomArrayItems = (array, maxAmount) => {
  const randomItems = [];
  const amount = getRandomNumber(maxAmount);

  while (randomItems.length < amount) {
    const item = array[getRandomNumber(array.length - 1)];

    if (!randomItems.includes(item)) {
      randomItems.push(item);
    }
  }

  return randomItems;
};
