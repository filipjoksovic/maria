export const getTimeDifference = (start: Date, end: Date): number => {
  console.log(start.getMilliseconds());
  console.log(end.getMilliseconds());
  return Math.abs(start.getMilliseconds() - end.getMilliseconds());
}
