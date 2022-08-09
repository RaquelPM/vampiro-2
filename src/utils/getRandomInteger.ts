export const getRandomInteger = (min: number, max: number) => {
  return Math.floor((max - min) * Math.random() + min);
};
