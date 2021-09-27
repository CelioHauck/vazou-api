export const differenceMinutes = (newDate: Date, oldDate: Date) => {
  const minutes = (newDate.getTime() - oldDate.getTime()) / 1000 / 60;
  return Math.abs(Math.round(minutes));
};
