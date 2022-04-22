export const numberWithCommas = (num: number) => {
  return Math.floor(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
