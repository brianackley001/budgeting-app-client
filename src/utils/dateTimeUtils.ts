const datediff = (savedDateString) => {
  const savedDate = new Date(savedDateString).getTime();
  const currentDate = new Date().getTime();

  // get total seconds between the times
  var delta = Math.abs(savedDate - currentDate) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  var seconds = delta % 60; // in theory the modulus is not required

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

export const getElapsedTime = (savedDateString: string): string => {
  const elapsedTime = datediff(savedDateString);

  let message = elapsedTime.days > 0 ? `${elapsedTime.days} days` : "";
  message +=
    message === "" && elapsedTime.hours > 0 ? `${elapsedTime.hours} hours` : "";
  message +=
    message === "" && elapsedTime.hours > 0 ? `${elapsedTime.hours} hours` : "";
  message +=
    message === "" && elapsedTime.minutes > 0 ? `${elapsedTime.minutes} minutes` : "";
  message +=
    message === "" && elapsedTime.seconds > 0 ? `${elapsedTime.seconds} seconds` : "";

  return` Updated ${message} ago`;
}; // Path: src/utils/dateTimeUtils.ts
